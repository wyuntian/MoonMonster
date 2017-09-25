// Create shared variable for the vertex and fragment shaders
varying vec3 interpolatedNormal;
varying float angle;
uniform vec3 lightPosition;
varying vec3 globalForPoistion;
varying float closeDistance;


/* HINT: YOU WILL NEED MORE SHARED/UNIFORM VARIABLES TO COLOR ACCORDING TO COS(ANGLE) */

void main() {
    // Set shared variable to vertex normal

    interpolatedNormal = normal;

    globalForPoistion = (modelMatrix * vec4(position, 1.0)).xyz;

    closeDistance = distance(globalForPoistion, lightPosition);


    angle = dot(normalize(lightPosition-globalForPoistion), -normalize(normal));//position need to be global
    // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
