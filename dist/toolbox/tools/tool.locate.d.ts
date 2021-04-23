import ToolBase, { IToolBaseEvent, OnDoneParams, OnExecutingParams } from '../tool.base';
import { Marker } from 'leaflet';
/** 定位工具类 */
export declare class ToolLocate extends ToolBase<IToolBaseEvent<GeolocationPosition>> {
    zoomToLocationWhenDone: boolean;
    zoomLevel: number;
    zoomDuration: number;
    locationPoint: Marker;
    /** 重写：工具执行过程触发事件 */
    protected onExecuting_(e: OnExecutingParams<this>): void;
    protected onDone_(e: OnDoneParams<this>): void;
}
export default ToolLocate;
