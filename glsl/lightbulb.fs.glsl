varying vec3 matNormal;
varying vec4 calvector;
void main() {
	// Set constant color
	vec4 v = vec4( matNormal, 0.0 );
	float intensity = pow( 0.7 - dot( v, calvector ), 4.0 );
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0)*intensity;
}