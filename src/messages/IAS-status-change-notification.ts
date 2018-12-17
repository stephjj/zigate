import { ZGMessage, ZGMessageCode } from '../message'
import debug from '../debug'

export interface IASStatusChangeNotificationPayload {
  sequenceNumber: number
  srcAddress: string
  srcEndpoint: number
  clusterId: number
  
  zonestatus: number
  extendedstatus: number
  zoneid: number
  delay: number
}


const fromBuffer = (payload: Buffer): IASStatusChangeNotificationPayload => {
  const msgPayload = {
    sequenceNumber: payload.readUInt8(0),
    srcAddress: payload.readUInt16BE(1).toString(16),
    srcEndpoint: payload.readUInt8(3),
    clusterId: payload.readUInt16BE(4),
	
    zonestatus: payload.readUInt16BE(6),
    extendedstatus: payload.readUInt8(8),
    zoneid: payload.readUInt8(9),
    delay: payload.readUInt16BE(10)
  }


  return {
    ...msgPayload,
  
  }
}

export class ZGIASStatusChangeNotificationMessage implements ZGMessage {
  code: ZGMessageCode
  label = 'IAS-status-change-notification'
  payload: IASStatusChangeNotificationPayload
  payloadBuffer: Buffer

  constructor(code: ZGMessageCode, payload: Buffer) {
    this.code = code
    this.payloadBuffer = payload
    this.payload = fromBuffer(payload)
    debug(`message:${this.getLabel()}`)(this.payload)
  }

  getCode(): ZGMessageCode {
    return this.code
  }

  getLabel(): string {
    return this.label
  }

  getPayload(): IASStatusChangeNotificationPayload {
    return this.payload
  }
}
