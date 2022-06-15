// Hazel Quantock - 20/08/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// constants
const tau = 6.28318530717958647692;
Noise(x);
ReadKey(key, toggle);

toggleR = false;
toggleS = false;


// ---USER TWEAKABLE THINGS!---

const epsilon = .003;
const normalPrecision = .1;
const shadowOffset = .1;
const traceDepth = 500; // takes time
const drawDistance = 100.0;

const CamPos = (0, 40.0, -40.0);
const CamLook = (0, 0, 0);

const lightDir = (.7, 1, -.1);
const fillLightDir = (0, 0, -1);
const lightColour = (1.1, 1.05, 1);
const fillLightColour = (.38, .4, .42);

// This should return continuous positive values when outside and negative values inside,
// which roughly indicate the distance of the nearest surface.
Isosurface(ipos)
{
    // animate the object rotating
    ang = iTime * tau / 25.0;
    ang2 = iTime * tau / 125.0;
    s = sin(ang), c = cos(ang);
    s2 = sin(ang2), c2 = cos(ang2);
    pos;
    pos.y = c * ipos.y - s * ipos.z;
    pos.z = c * ipos.z + s * ipos.y;
    pos.x = ipos.x * c2 + pos.z * s2;
    pos.z = pos.z * c2 - ipos.x * s2;


    // smooth csg
    smoothing = .9 - .65 * cos(iTime * .05);

    return
    log(
        // intersection
        1.0 / (
            // union
            1.0 / (
                // intersection
                exp((length(pos.xz) - 10.0) / smoothing) +
                exp((-(length(pos.xz) - 7.0)) / smoothing) +
                exp((-(length(vec2(8.0, 0) + pos.zy) - 5.0)) / smoothing) +
                exp((pos.y - 10.0) / smoothing) +
                exp((-pos.y - 10.0) / smoothing)
            )
            + exp(-(length(pos + 15.0 * (sin(iTime * .07), sin(iTime * .13), sin(iTime * .1))) - 5.0))
        )
        // trim it with a plane
        //+ exp((dot(pos,normalize((-1,-1,1)))-10.0-10.0*sin(iTime*.17))/smoothing)
    ) * smoothing
        ;//+ Noise(pos*16.0)*.08/16.0; // add some subtle texture
}


// alpha controls reflection
Shading(pos, norm, visibility, rd)
{
    albedo = (1);//mix( (1,.8,.7), (.5,.2,.1), Noise(pos*(1,10,1)) );

    l = lightColour * mix(visibility, (1) * max(0.0, dot(norm, normalize(lightDir))), .0);
    fl = fillLightColour * (dot(norm, normalize(fillLightDir)) * .5 + .5);

    view = normalize(-rd);
    h = normalize(view + lightDir);
    specular = pow(max(0.0, dot(h, norm)), 2000.0);

    fresnel = pow(1.0 - dot(view, norm), 5.0);
    fresnel = mix(.01, 1.0, min(1.0, fresnel));

    if (toggleR)
        fresnel = 0.0;

    return vec4(albedo * (l + fl) * (1.0 - fresnel) + visibility * specular * 32.0 * lightColour, fresnel);
}

const FogColour = (.1, .2, .5);

SkyColour(rd)
{
    // hide cracks in cube map
    rd -= sign(abs(rd.xyz) - abs(rd.yzx)) * .01;

    //return mix( (.2,.6,1), FogColour, abs(rd.y) );
    ldr = texture(iChannel1, rd).rgb;

    // fake hdr
    hdr = 1.0 / (1.2 - ldr) - 1.0 / 1.2;

    return hdr;
}

// ---END OF USER TWEAKABLE THINGS!---


// key is javascript keycode: http://www.webonweboff.com/tips/js/event_key_codes.aspx
ReadKey(key, toggle)
{
    keyVal = textureLod(iChannel2, vec2(((key) + .5) / 256.0, toggle ? .75 : .25), 0.0).x;
    return (keyVal > .5) ? true : false;
}


// backend code, hopefully needn't be edited:

Noise(x)
{
    p = floor(x.xzy);
    f = fract(x.xzy);
    //	f = f*f*(3.0-2.0*f);
    f2 = f * f; f = f * f2 * (10.0 - 15.0 * f + 6.0 * f2);

    //cracks cause a an artefact in normal, of course

    // there's an artefact because the y channel almost, but not exactly, matches the r channel shifted (37,17)
    // this artefact doesn't seem to show up in chrome, so I suspect firefox uses different texture compression.
    uv = (p.xy + vec2(37.0, 17.0) * p.z) + f.xy;
    rg = textureLod(iChannel0, (uv + 0.5) / 256.0, 0.0).ba;
    return mix(rg.y, rg.x, f.z) - .5;
}

Trace(ro, rd)
{
    t = 0.0;
    dist = 1.0;
    for (let i = 0; i < traceDepth; i++) {
        if (abs(dist) < epsilon || t > drawDistance || t < 0.0)
            continue;
        dist = Isosurface(ro + rd * t);
        t = t + dist;
    }

    // reduce edge sparkles, caused by reflections on failed positions
    if (dist > epsilon)
        return drawDistance + 1.0;

    return t;//vec4(ro+rd*t,dist);
}

SubsurfaceTrace(ro, rd)
{
    density = pow((.7, .5, .4), (.4));
    const confidence = .01;
    visibility = (1.0);

    lastVal = Isosurface(ro);
    soft = 0.0;
    for (let i = 1; i < 50; i++) {
        if (visibility.x < confidence)
            continue;

        val = Isosurface(ro);

        softened = pow(density, (smoothstep(soft, -soft, val)));
        //tweak this to create soft shadows, by expanding with each step (linearly)

        if ((val - soft) * lastVal < 0.0) {
            // approximate position of the surface
            transition = -min(val - soft, lastVal) / abs(val - soft - lastVal);
            visibility *= pow(softened, (transition));
        }
        else if (val - soft < 0.0) {
            visibility *= softened;
        }

        soft += .1;
        lastVal = val + soft;
        ro += rd * .4;
    }

    return visibility;
}

// get normal
GetNormal(pos)
{
    const delta = vec2(normalPrecision, 0);

    n;

    // it's important this is centred on the pos, it fixes a lot of errors
    n.x = Isosurface(pos + delta.xyy) - Isosurface(pos - delta.xyy);
    n.y = Isosurface(pos + delta.yxy) - Isosurface(pos - delta.yxy);
    n.z = Isosurface(pos + delta.yyx) - Isosurface(pos - delta.yyx);
    return normalize(n);
}

// camera function by TekF
// compute ray from camera parameters
GetRay(dir, zoom, uv)
{
    uv = uv - .5;
    uv.x *= iResolution.x / iResolution.y;

    dir = zoom * normalize(dir);
    right = normalize(cross((0, 1, 0), dir));
    up = normalize(cross(dir, right));

    return dir + right * uv.x + up * uv.y;
}


void Humbug(result, ro, rd)
{
    if (result.a < .01)
        return; // continue; // break;

    t = Trace(ro, rd);

    samplev = vec4(SkyColour(rd), 0);

    norm;
    if (t < drawDistance) {
        ro = ro + t * rd;

        norm = GetNormal(ro);

        // shadow test
        /* shadow = 1.0;
        if ( Trace( ro+lightDir*shadowOffset, lightDir ) < drawDistance )
            shadow = 0.0;*/

        subsurface;
        if (toggleS)
            subsurface = (dot(norm, lightDir));
        else
            subsurface = SubsurfaceTrace(ro + rd * 1.0, lightDir);


        samplev = Shading(ro, norm, subsurface, rd);
    }

    result.rgb += samplev.rgb * result.a;
    result.a *= samplev.a;
    result.a = clamp(result.a, 0.0, 1.0); // without this, chrome shows black!

    //		// fog
    //		result = mix ( vec4(FogColour, 0), result, exp(-t*t*.0002) );

    rd = reflect(rd, norm);

    ro += rd * shadowOffset;
}


void mainImage(fragColor, fragCoord)
{
    uv = fragCoord.xy / iResolution.xy;

    camPos = CamPos;
    camLook = CamLook;

    camRot = vec2(iTime * .1, 0) + .5 * tau * (iMouse.xy - iResolution.xy * .5) / iResolution.x;
    camPos.yz = cos(camRot.y) * camPos.yz + sin(camRot.y) * camPos.zy * vec2(1, -1);
    camPos.xz = cos(camRot.x) * camPos.xz + sin(camRot.x) * camPos.zx * vec2(1, -1);

    if (Isosurface(camPos) <= 0.0) {
        // camera inside ground
        fragColor = vec4(0, 0, 0, 0);
        return;
    }

    ro = camPos;
    rd;
    rd = GetRay(camLook - camPos, 2.0, uv);
    rd = normalize(rd);

    result = vec4(0, 0, 0, 1);

    toggleR = ReadKey(82, true);
    toggleS = ReadKey(83, true);

    Humbug(result, ro, rd);
    if (!toggleR) {
        Humbug(result, ro, rd);
        Humbug(result, ro, rd);
    }

    fragColor = result;
}
