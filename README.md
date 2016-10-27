Vue input mask
==============

Simple input mask lib for vue.js based on [PureMask.js](https://github.com/romulobrasil/PureMask.js)

## Installation

This version requires Vue 1.X. If you are looking for Vue 2.X, [check it here](https://github.com/probil/v-mask/tree/vue-2.0).

  `npm install v-mask@v0.1`

## Usage

    import Vue from 'vue
    import VueMask from 'v-mask'

    /** Activate vue.js plugins **/
    Vue.use(VueMask);

Now you are ready to use it in the code!

    <input type="text" v-mask format="####-##">
    <!-- OR -->
    <input type="text" v-mask format="##/##/#### ##:##" >

## Format description

List of supported placeholders:

| Value | Format                       |
|-------|------------------------------|
| #     | Number (0-9)                 |
| A     | Letter in any case (a-z,A-Z) |
| N     | Number or letter             |
| X     | Any symbol                   |

## Tests

In TODO

## Contributing

PR is welcome!
