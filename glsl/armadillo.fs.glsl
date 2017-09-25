// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader

varying float angle;
varying float closeDistance;

#ifdef GL_ES
precision mediump float;
#endif

varying vec3 interpolatedNormal;

/* HINT: YOU WILL NEED MORE SHARED/UNIFORM VARIABLES TO COLOR ACCORDING TO COS(ANGLE) */
uniform float u_time;

void main() {
  // Set final rendered color according to the surface normal


  	float arma_color = 0.0;
      	arma_color += sin(  cos( u_time / 15.0 ) * 80.0 ) + cos(  cos( u_time / 15.0 ) * 10.0 );
      	arma_color += sin(  sin( u_time / 10.0 ) * 40.0 ) + cos(  sin( u_time / 25.0 ) * 40.0 );
      	arma_color += sin(  sin( u_time / 5.0 ) * 10.0 ) + sin(  sin( u_time / 35.0 ) * 80.0 );
      	arma_color *= sin( u_time / 10.0 ) * 0.5;

  	//gl_FragColor = vec4( vec3( a_color, a_color * 0.5, sin( a_color + u_time / 3.0 ) * 0.75 )+normalize(interpolatedNormal), 1.0);

  	  if(closeDistance<4.0){

  	  gl_FragColor = vec4( vec3( arma_color+angle, arma_color * 0.5+angle, sin( arma_color + u_time / 3.0 ) * 0.75+angle )+normalize(interpolatedNormal)*0.3, 0.4);

        }else{

      gl_FragColor = vec4( vec3( arma_color+angle*0.5, arma_color * 0.5+angle*0.5, sin( arma_color + u_time / 3.0 ) * 0.75+angle*0.5 )+normalize(interpolatedNormal), 1.0);
      //gl_FragColor = vec4(angle,angle,angle, 1.0); // REPLACE ME
      }

  	//gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);

}
