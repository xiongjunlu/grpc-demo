const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
 
const PROTO_PATH = __dirname + '/protos/test.proto'
const testProto = protoLoader.loadSync(PROTO_PATH)

var testService = grpc.loadPackageDefinition(testProto).testPackage;
 
const client = new testService.testService('0.0.0.0:3001', grpc.credentials.createInsecure());
 
client.ping({param: 'param'}, function(err, response) {
    console.log('ping -> :', response.message);
});