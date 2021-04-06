import Observer from '@xizher/observer';
import { baseUtils } from '@xizher/js-utils';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
/** WebMap类 */
export class WebMap extends Observer {
    //#endregion
    //#region 构造函数
    constructor(targetDiv, options = {}) {
        super();
        /** 配置项 */
        this._options = {
            center: [0, 0],
            zoom: 1,
            attributionControl: false,
            zoomControl: false,
        };
        this._targetDiv = targetDiv;
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region getter
    get targetDiv() {
        return this._targetDiv;
    }
    get map() {
        return this._map;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        const map = new LeafletMap(this._targetDiv, this._options);
        this._map = Object.assign(map, { $owner: this });
        return this;
    }
    //#endregion
    //#region 公有方法
    /**
     * 挂载插件
     * @param plugin WebMap插件对象
     */
    use(plugin) {
        this[plugin.pluginName] = plugin;
        return this;
    }
    /**
     * 挂载WebMap
     */
    mount() {
        this._init();
        for (const prop in this) {
            if (this[prop]['pluginName']) {
                // eslint-disable-next-line
                // @ts-ignore
                this[prop].installPlugin(this);
            }
        }
        this._map.whenReady(() => this.fire('loaded'));
        return this;
    }
}
export default WebMap;
