// The uniform variable is set up in the javascript code and the same for all vertices
uniform vec3 lightPosition;
varying vec4 calvector;
varying vec3 matNormal;

void main() {
	/* HINT: WORK WITH lightPosition HERE! */

    matNormal = normalize( normalMatrix * normal);
    calvector = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 1.0, 0.0 );
    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position+lightPosition, 1.0);
}
