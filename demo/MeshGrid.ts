/** @license
 * Copyright 2023 Google LLC.
 * Copyright 2023 João Paquim
 * SPDX-License-Identifier: Apache-2.0
 */

import type { glsl, Params } from '@/swissgl';

export default class MeshGrid {
  static Tags = ['2d'];

  frame(glsl: glsl, { time }: Params & { time: number }) {
    glsl({
      time,
      Grid: [5, 5],
      Mesh: [4, 4],
      Aspect: 'fit',
      VP: `
varying vec3 color = hash(ID);
vec2 pos = vec2(ID) + 0.5 + XY*(0.5-0.5/vec2(Mesh+1));
pos += sin(UV*TAU+time).yx*0.1*(sin(time*0.5));
VPos = vec4(2.0*pos/vec2(Grid)-1.0, 0.0, 1.0);`,
      FP: `mix(color, vec3(1.0), wireframe()*0.5),1`,
    });
  }
}
