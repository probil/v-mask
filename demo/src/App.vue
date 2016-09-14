<template>
  <div id="app">
    <h1>v-mask examples</h1>
    <label>
      ##/##/#### ##:##
      <input type="text" v-mask="'##/##/#### ##:##'">
    </label>
    <br>
    <label>
      ##:##:##
      <input type="text" v-mask="'##:##:##'">
    </label>
  </div>
</template>
