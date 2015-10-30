import {Module, ModuleInitOptions} from "microframework/Module";
import {ElasticSearchModuleConfig} from "./ElasticSearchModuleConfig";
import {ElasticSearchExports} from "./ElasticSearchExports";

/**
 * Express module integration with microframework.
 */
export class ElasticSearchModule implements Module {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: ElasticSearchModuleConfig;
    private _client: any;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return 'ElasticSearchModule';
    }

    getConfigurationName(): string {
        return 'elasticsearch';
    }

    isConfigurationRequired(): boolean {
        return true;
    }

    getModuleExports(): ElasticSearchExports {
        return {
            client: this.client
        };
    }

    init(options: ModuleInitOptions, configuration: ElasticSearchModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        this.setupConnection();
        return this.ping();
    }

    onShutdown(): Promise<any> {
        if (this._client)
            this._client.close();
        return Promise.resolve();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Gets elastic search client instance.
     */
    get client(): any {
        return this._client;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private setupConnection() {
        let options: any = {
            host: this.configuration.host
        };
        if (this.configuration.log)
            options.log = this.configuration.log;

        let elasticsearch = require('elasticsearch');
        this._client = new elasticsearch.Client(options);
    }

    private ping() {
        return new Promise((ok, fail) => {
            this._client.ping((error: any) => {
                if (error) {
                    fail('elasticsearch cluster is down!');
                } else {
                    ok();
                }
            });
        });
    }

}