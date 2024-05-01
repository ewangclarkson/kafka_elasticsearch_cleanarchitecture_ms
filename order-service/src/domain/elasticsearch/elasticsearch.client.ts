import Client from "@elastic/elasticsearch/lib/client";
import config from "config";

export const elasticClient = new Client({
    node: config.get("elasticSearch.host"),
    auth: {
        apiKey: config.get("elasticSearch.apiKey")
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
});

