const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
 
const PROTO_PATH = __dirname + '/protos/test.proto' // proto文件地址
const testProto = protoLoader.loadSync(PROTO_PATH) // 加载proto文件
const packageObject = grpc.loadPackageDefinition(testProto, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});


let ping = (call, callback) => {
  console.log(call)
  callback(null, {message: 'Pong'})
}
 
const server = new grpc.Server();
server.addService(packageObject.testPackage.testService.service, {ping: ping})

server.bindAsync('0.0.0.0:3001', grpc.ServerCredentials.createInsecure(), function (result) {
  server.start()
})
