import ToolBase from '../tool.base';
import { marker } from 'leaflet';
/** 定位工具类 */
export class ToolLocate extends ToolBase {
    constructor() {
        //#region 私有属性
        super(...arguments);
        //#endregion
        //#region 公有属性
        this.zoomToLocationWhenDone = false;
        this.zoomLevel = 17;
        this.zoomDuration = 3;
        //#endregion
    }
    //#endregion
    //#region 保护方法
    /** 重写：工具执行过程触发事件 */
    onExecuting_(e) {
        super.onExecuting_(e);
        navigator.geolocation.getCurrentPosition(evt => {
            if (this.zoomToLocationWhenDone) {
                const { longitude, latitude } = evt.coords;
                this.locationPoint && this.webMap_.map.removeLayer(this.locationPoint);
                this.locationPoint = marker([latitude, longitude]);
                this.locationPoint.addTo(this.webMap_.map);
                this.webMap_.map.flyTo([latitude, longitude], this.zoomLevel, { duration: this.zoomDuration });
            }
            this.fire('done', {
                success: true,
                result: evt
            });
        }, evt => {
            this.fire('done', {
                success: false,
                error: evt
            });
        }, { enableHighAccuracy: true });
    }
    onDone_(e) {
        super.onDone_(e);
        // console
    }
}
export default ToolLocate;
