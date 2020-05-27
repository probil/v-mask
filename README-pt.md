# :abcd: Vue input mask
[![npm](https://img.shields.io/npm/v/v-mask.svg)](https://www.npmjs.com/package/v-mask)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/v-mask)
[![npm](https://img.shields.io/npm/dm/v-mask.svg)](https://www.npmjs.com/package/v-mask)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/probil/v-mask/master/LICENSE)
[![Vue2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/v-mask/badge?style=rounded)](https://www.jsdelivr.com/package/npm/v-mask)
[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

> Biblioteca enxuta baseado no [text-mask-core](https://github.com/text-mask/text-mask/tree/master/core) (~5kb) apenas diretiva. sem dependências.

<div align="center">
  <h3>
    <a href="https://github.com/probil/v-mask/blob/master/README.md">English</a>
    <span> | </span>
    <strong>
      <a href="https://github.com/probil/v-mask/blob/master/README-pt.md">Português</a>
    </strong>
  </h3>
</div>

## :art: Playground na Web

- https://codesandbox.io/s/m3q1m5yp9x ( playground interativo com webpack e ESM)
- https://jsfiddle.net/probil/c6fjjzn6/ ( playground interativo simples com UMD)
- https://v-mask-demo.netlify.com/ ( Demo v-mask )


## :heavy_check_mark: Navegadores suportados

|![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![iOS Safari](https://raw.github.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png) | ![Android WebView](https://raw.github.com/alrra/browser-logos/master/src/android-webview-beta/android-webview-beta_48x48.png) | ![Android WebView](https://raw.github.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png)
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 74+ :heavy_check_mark: | 66+ :heavy_check_mark:  | 12+ :heavy_check_mark: | 46+ :heavy_check_mark: | 17+ :heavy_check_mark: | 11+ :heavy_check_mark: | 12+ :heavy_check_mark: | 67+ :heavy_check_mark: | 8.2+ :heavy_check_mark:

Suportamos apenas navegadores com estatísticas de uso global superiores a 1%, última versão 2 de cada navegador, mas não navegadores inativos. A biblioteca pode funcionar em navegadores antigos, mas não garantimos isso. Você pode precisar de polyfills adicionais para fazê-lo funcionar.


## :cd: Intalação

Esta versão requer o Vue 2.X. Se você está utilizando o Vue 1.X [clique aqui](https://github.com/probil/v-mask/tree/vue-1.x).

```sh
npm install v-mask
```

## Inicialização

### ES2015 (Webpack/Rollup/Browserify/etc)

```javascript
import Vue from 'vue'

// usar o plugin
import VueMask from 'v-mask'
Vue.use(VueMask);

// usar a diretiva
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

// usar apenas o filtro
import { VueMaskFilter } from 'v-mask'
Vue.filter('VMask', VueMaskFilter)
```

### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/v-mask/dist/v-mask.min.js"></script>
<script>
// usar o plugin
Vue.use(VueMask.VueMaskPlugin);

// usar a diretiva
Vue.directive('mask', VueMask.VueMaskDirective);
</script>
```

## :rocket: Utilizando

```html
<input type="text" v-mask="'####-##'" v-model="myInputModel">
<!-- OU -->
<input type="text" v-mask="nameOfVariableWithMask" v-model="myInputModel">
```
**Notice:** `v-model` é necessário a partir da versão `v1.1.0`, porque acabam [existindo](https://github.com/probil/v-mask/issues/16) [muitos](https://github.com/probil/v-mask/issues/30) [bugs](https://github.com/probil/v-mask/issues/29)
com ouvintes de eventos HTMLElement e sincronização dos mesmos com o Vue.

Não há razão para suportar o uso dessa lib para uso sem o modelo `v-model`, mas abra a porta para uso em [inputs personalizados](http://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events).

### Utilizando o filtro
```html
<span>{{ '9999999999' | VMask('(###) ###-####') }}</span>
```

## :gear: Configurações

Lista de simbolos reservados para máscara:

| Value | Format                               |
|-------|--------------------------------------|
| #     | Números (0-9)                        |
| A     | Caractere de qualquer case (a-z,A-Z) |
| N     | Caractere ou Números                 |
| X     | Qualquer símbolo                     |
| ?     | Opcional (próximo caractere)         |

## :syringe: Tests

[Jest](https://github.com/facebook/jest) é usado para fazer os testes-unitários

Testes unitários podem ser executados utilizando o seguinte comando:

```bash
npm test
```

[TestCafe](https://github.com/DevExpress/testcafe) é usando para fazer testes E2E.

E2E-tests podem ser executados utilizando o seguinte comando:

```bash
npm test:e2e
```

## :anchor: Versionamento Semântico

Este plugin segue [semantic versioning](http://semver.org/).

## :newspaper: Changelog

Estamos usando [GitHub Releases](https://github.com/probil/v-mask/releases).

## :beers: Contribuições


Estamos muito felizes em ver contribuições em potencial, então não hesite. Se você tiver alguma sugestão, ideia ou problema, sinta-se à vontade para adicionar um novo [issue](https://github.com/probil/v-mask/issues), mas primeiro verifique se a sua pergunta não repete as anteriores.

Aviso: Você deve fazer suas alterações apenas na pasta `src`, não tente editar arquivos do `dist`, pois ele foi compilado a partir do `src` a partir do babel e não deve ser alterado manualmente.

## :lock: Licença

Consulte o arquivo [LICENSE](LICENSE) para obter os direitos e limitações da licença (MIT).
