import {INetworkAdapter, NetworkAdapterFetchResults} from "./INetworkAdapter";

export interface WebsiteAliveResult {
    success: boolean;
    status: string;
}

export const isWebsiteAlive = async (
    network: INetworkAdapter
): Promise<WebsiteAliveResult> => {
    let netResult: NetworkAdapterFetchResults;
    try {
        netResult = await network.fetchUrlText("http://example.com");
        if (!netResult.ok) {
            throw netResult.text;
        }
        const text = netResult.text;
        return processNetSuccess(text);
    } catch (err) {
        throw processNetFail(err);
    }
};

const processNetSuccess = (text): WebsiteAliveResult => {
    const included = text.includes("illustrative");
    if (included) {
        return {success: true, status: "ok"};
    }
    return {success: false, status: "missing text"};
};

const processNetFail = (err): WebsiteAliveResult => {
    return {success: false, status: err};
};
