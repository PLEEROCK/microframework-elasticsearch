# ElasticSearch module for Microframework

Adds integration between [elastic search](https://github.com/elastic/elasticsearch-js) and 
[microframework](https://github.com/pleerock/microframework).

## Usage

1. Install module:

    `npm install --save microframework-elasticsearch`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {ElasticSearchModule} from "microframework-elasticsearch/ElasticSearchModule";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new ElasticSearchModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running.'))
            .catch(error => console.error('Error: ', error));
    ```

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    you may need to `require("es6-shim");` in your app.

4. Now you can use [elastic search](https://github.com/elastic/elasticsearch-js) module in your microframework.

## Todos

* cover with tests
* more configuration
* add more docs