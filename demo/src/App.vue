<template>
  <div class="wrapper h-100">
    <div class="container">
      <section class="header">
        <h2 class="header">A dead simple, input formatting for Vue.js</h2>
      </section>

      <section class="examples">

        <div class="row">
          <div class="six columns">
            <label for="time-and-date-ex">Date and Time</label>
          </div>
          <div class="six columns">
            <input class="u-full-width" id="time-and-date-ex" type="text" placeholder="27/10/2016 23:15"
                   v-mask="'##/##/#### ##:##'"
                   v-model="models.timeAndDate"
            />
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <label for="time-ex">Time with seconds </label>
          </div>
          <div class="six columns">
            <input class="u-full-width" id="time-ex" type="text" placeholder="11:23:15"
                   v-mask="'##:##:##'"
                   v-model="models.timeWithSeconds"
            />
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <label for="credit-cart-ex">Credit card number</label>
          </div>
          <div class="six columns">
            <input class="u-full-width" id="credit-cart-ex" type="text" placeholder="4444 4444 4444 4444"
                   v-mask="'#### #### #### ####'"
                   v-model="models.cardNumber"
            />
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <label for="credit-cart-ex">Phone number</label>
          </div>
          <div class="six columns">
            <input class="u-full-width" id="phone-number-ex" type="text" placeholder="(999) 999-9999"
                   v-mask="'(###) ###-####'"
                   v-model="models.phoneNumber"
            />
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <label for="credit-cart-ex">US Phone Number</label>
          </div>
          <div class="six columns">
            <input class="u-full-width" id="us-phone-number-ex" type="text" placeholder="+1(999)-999-9999"
                   v-mask="'+1(###)-###-####'"
                   v-model="models.usPhoneNumber"
            />
          </div>
        </div>

      </section>

      <section class="special-examples">
        <h4 class="header">Dynamic mask change supported</h4>
        <div class="row">
          <div class="six columns">
            <label>
              <input type="radio" id="cpf-example" value="###.###.###/###" v-model="dynamicMask">
              <span class="label-body">###.###.###/###</span>
            </label>

            <label>
              <input type="radio" id="cnpj-example" value="###.###.#####/###-#" v-model="dynamicMask">
              <span class="label-body">###.###.#####/###-#</span>
            </label>
          </div>
          <div class="six columns">
            <input
              type="text" class="u-full-width"
              v-mask="dynamicMask"
              :placeholder="dynamicMask"
              v-model="models.dynamicMask"
            />
          </div>
        </div>
      </section>

      <section class="footer">
        <a href="https://github.com/probil/v-mask/tree/vue-2.0" class="button button-primary">Github</a>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Demo',
    data() {
      return {
        dynamicMask: '###.###.###/###',
        models: {
          timeAndDate    : '',
          timeWithSeconds: '',
          cardNumber     : '',
          phoneNumber    : '',
          dynamicMask    : '',
          usPhoneNumber  : ''
        }
      }
    }
  }
</script>
