import grpc from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main-aces.js";
import { sync } from "../../generated/sync/sync.js";
let client;
beforeAll(async () => {
    await serverUp;
    client = new sync.IndexSynchroClient(target, grpc.credentials.createInsecure());
});
afterAll(() => {
    server.forceShutdown();
});
test("monitor ledger sync status", (done) => {
    client.MonitorLedgerSyncStatus(new sync.Null(), function (err, response) {
        done();
        expect(err).toBeNull();
        expect(response?.status).toEqual("syncing");
        expect(response?.progress).toEqual(85);
        expect(response?.errors.length).toEqual(0);
    });
});
