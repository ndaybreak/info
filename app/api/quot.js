// 创建ProtoBuf
let ProtoBuf = dcodeIO.ProtoBuf
let protoFile = ProtoBuf.loadProtoFile('resource/QuotModule.proto')
let BizType = protoFile.build('BizType')
let Header = protoFile.build('Header')
let header = new Header()
let TargetPair = protoFile.build('TargetPair')
let targetPair = new TargetPair()
let Request = protoFile.build('Request')
let request = new Request()
let Content = protoFile.build('Content')
let content = new Content()
let QuotMessage = protoFile.build('QuotMessage')
let quotMessage = new QuotMessage()

quotMessage.header = header
quotMessage.content = content
content.request = request

function createWebSocket(options) {
  let promise = new Promise(function(resolve, reject) {
    websocket && websocket.close()
    let websocket = options.websocket = new WebSocket('ws://192.168.60.199:19999/quot')
    websocket.binaryType = 'arraybuffer'
    // 连接成功建立的回调方法
    websocket.onopen = function() {
      options.isConnected = true
      resolve()
    }
    // 连接关闭的回调方法
    websocket.onerror = function(error) {
      console.log(error)
    }
    // 连接关闭的回调方法
    websocket.onclose = function() {
      console.log('连接关闭')
    }
  })
  return promise
}


let mcqObj = {
  websocket: null,
  isConnected: false
}
// 根据主币CODE实时行情订阅
export function getMarketCoinQuot(para, callback) {
  if (mcqObj.isConnected) {
    run()
  } else {
    createWebSocket(mcqObj).then(function() {
      run()
    })
  }
  function run() {
    let code = para.code
    header.bizType = BizType.RealTimeQuotByMainCoinCodeSubBiz // 1
    let Business = protoFile.build('RealTimeQuotByMainCoinCodeReq') // 2
    let business = new Business()
    business.mainCoinCode = code // 3
    request.realTimeQuotByMainCoinCodeReq = business // 4

    mcqObj.websocket.send(quotMessage.toArrayBuffer())
    // 接收到消息的回调方法
    mcqObj.websocket.onmessage = function(res) {
      // console.log(QuotMessage.decode(res.data))
      let data = QuotMessage.decode(res.data).content.response.realTimeQuotResp.realTimeQuots
      callback && callback(data)
    }
  }
}

let tpqObj = {
    websocket: null,
    isConnected: false
}
// 根据标的对列表实时行情请求
export function getTargetPairsQuot(para, callback) {
    if (tpqObj.isConnected) {
        run()
    } else {
        createWebSocket(tpqObj).then(function() {
            run()
        })
    }
    function run() {
        header.bizType = BizType.RealTimeQuotByTargetPairsSubBiz // 1
        let Business = protoFile.build('RealTimeQuotByTargetPairsReq') // 2
        let business = new Business()
        business.targetPairs = para.targetPairs // 3
        request.realTimeQuotByTargetPairsReq = business // 4

        tpqObj.websocket.send(quotMessage.toArrayBuffer())
        // 接收到消息的回调方法
        tpqObj.websocket.onmessage = function(res) {
            let data = QuotMessage.decode(res.data).content.response.realTimeQuotResp.realTimeQuots
            callback && callback(data)
        }
    }
}
