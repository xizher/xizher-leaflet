import ToolBase, { IToolBaseEvent, OnDoneParams, OnExecutingParams } from '../tool.base'
import { Marker, marker } from 'leaflet'

/** 定位工具类 */
export class ToolLocate extends ToolBase<IToolBaseEvent<GeolocationPosition>> {

  //#region 私有属性



  //#endregion

  //#region 公有属性

  public zoomToLocationWhenDone = false

  public zoomLevel = 17

  public zoomDuration = 3

  public locationPoint: Marker

  //#endregion

  //#region 保护方法

  /** 重写：工具执行过程触发事件 */
  protected onExecuting_ (e: OnExecutingParams<this>) : void {
    super.onExecuting_(e)
    navigator.geolocation.getCurrentPosition(
      evt => {
        if (this.zoomToLocationWhenDone) {
          const { longitude, latitude } = evt.coords
          this.locationPoint && this.webMap_.map.removeLayer(this.locationPoint)
          this.locationPoint = marker([latitude, longitude])
          this.locationPoint.addTo(this.webMap_.map)
          this.webMap_.map.flyTo([latitude, longitude], this.zoomLevel, { duration: this.zoomDuration })
        }
        this.fire('done', {
          success: true,
          result: evt
        })
      },
      evt => {
        this.fire('done', {
          success: false,
          error: evt
        })
      }, { enableHighAccuracy: true }
    )
  }

  protected onDone_ (e: OnDoneParams<this>) : void {
    super.onDone_(e)
    // console
  }

  //#endregion

}

export default ToolLocate
