module akra {
    enum ELogLevel {
        NONE,
        LOG,
        INFORMATION,
        WARNING,
        ERROR,
        CRITICAL,
        ALL,
    }
    interface ILogRoutineFunc {
        (pEntity: ILoggerEntity): void;
    }
    interface ISourceLocation {
        file: string;
        line: number;
    }
    interface ILoggerEntity {
        code: number;
        location: ISourceLocation;
        message?: string;
        info: any;
    }
    interface ILogger {
        init(): bool;
        setLogLevel(eLevel: ELogLevel): void;
        getLogLevel(): ELogLevel;
        registerCode(eCode: number, sMessage?: string): bool;
        setUnknownCode(eCode: number, sMessage: string): void;
        registerCodeFamily(eCodeMin: number, eCodeMax: number, sFamilyName?: string): bool;
        getFamilyName(eCode: number): string;
        setCodeFamilyRoutine(eCodeFromFamily: number, fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): bool;
        setCodeFamilyRoutine(sFamilyName: string, fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): bool;
        setLogRoutine(fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): void;
        setSourceLocation(sFile: string, iLine: number): void;
        setSourceLocation(pLocation: ISourceLocation): void;
        log(...pArgs: any[]);
        info(pEntity: ILoggerEntity): void;
        info(eCode: number, ...pArgs: any[]): void;
        info(...pArgs: any[]): void;
        warning(pEntity: ILoggerEntity): void;
        warning(eCode: number, ...pArgs: any[]): void;
        warning(...pArgs: any[]): void;
        error(pEntity: ILoggerEntity): void;
        error(eCode: number, ...pArgs: any[]): void;
        error(...pArgs: any[]): void;
        criticalError(pEntity: ILoggerEntity): void;
        criticalError(eCode: number, ...pArgs: any[]): void;
        criticalError(...pArgs: any[]): void;
        assert(bCondition: bool, pEntity: ILoggerEntity): void;
        assert(bCondition: bool, eCode: number, ...pArgs: any[]): void;
        assert(bCondition: bool, ...pArgs: any[]): void;
    }
}
module akra {
    var DEBUG: bool;
    var logger: ILogger;
    var typeOf: (x: any) => string;
    /** @inline */
    var isDef: (x: any) => bool;
    /** @inline */
    var isEmpty: (x: any) => bool;
    /** @inline */
    var isDefAndNotNull: (x: any) => bool;
    /** @inline */
    var isNull: (x: any) => bool;
    /** @inline */
    var isBoolean: (x: any) => bool;
    /** @inline */
    var isString: (x: any) => bool;
    /** @inline */
    var isNumber: (x: any) => bool;
    /** @inline */
    var isFloat: (x: any) => bool;
    /** @inline */
    var isInt: (x: any) => bool;
    /** @inline */
    var isFunction: (x: any) => bool;
    /** @inline */
    var isObject: (x: any) => bool;
    var isArrayBuffer: (x: any) => bool;
    var isTypedArray: (x: any) => bool;
    var isBlob: (x: any) => bool;
    /** @inline */
    var isArray: (x: any) => bool;
    interface Pair {
        first: any;
        second: any;
    }
    function genArray(pType: any, nSize: number): any[];
    /**@const*/ 
    var INVALID_INDEX: number;
    /**@const*/ 
    var MIN_INT32: number;
    /**@const*/ 
    var MAX_INT32: number;
    /**@const*/ 
    var MIN_INT16: number;
    /**@const*/ 
    var MAX_INT16: number;
    /**@const*/ 
    var MIN_INT8: number;
    /**@const*/ 
    var MAX_INT8: number;
    /**@const*/ 
    var MIN_UINT32: number;
    /**@const*/ 
    var MAX_UINT32: number;
    /**@const*/ 
    var MIN_UINT16: number;
    /**@const*/ 
    var MAX_UINT16: number;
    /**@const*/ 
    var MIN_UINT8: number;
    /**@const*/ 
    var MAX_UINT8: number;
    /**@const*/ 
    var SIZE_FLOAT64: number;
    /**@const*/ 
    var SIZE_REAL64: number;
    /**@const*/ 
    var SIZE_FLOAT32: number;
    /**@const*/ 
    var SIZE_REAL32: number;
    /**@const*/ 
    var SIZE_INT32: number;
    /**@const*/ 
    var SIZE_UINT32: number;
    /**@const*/ 
    var SIZE_INT16: number;
    /**@const*/ 
    var SIZE_UINT16: number;
    /**@const*/ 
    var SIZE_INT8: number;
    /**@const*/ 
    var SIZE_UINT8: number;
    /**@const*/ 
    var SIZE_BYTE: number;
    /**@const*/ 
    var SIZE_UBYTE: number;
    /**@const*/ 
    var MAX_FLOAT64: number;
    /**@const*/ 
    var MIN_FLOAT64: number;
    /**@const*/ 
    var TINY_FLOAT64: number;
    /**@const*/ 
    var MAX_FLOAT32: number;
    /**@const*/ 
    var MIN_FLOAT32: number;
    /**@const*/ 
    var TINY_FLOAT32: number;
    /**@const*/ 
    var DEFAULT_MATERIAL_NAME: string;
    enum EDataTypes {
        BYTE,
        UNSIGNED_BYTE,
        SHORT,
        UNSIGNED_SHORT,
        INT,
        UNSIGNED_INT,
        FLOAT,
    }
    enum EDataTypeSizes {
        BYTES_PER_BYTE,
        BYTES_PER_UNSIGNED_BYTE,
        BYTES_PER_UBYTE,
        BYTES_PER_SHORT,
        BYTES_PER_UNSIGNED_SHORT,
        BYTES_PER_USHORT,
        BYTES_PER_INT,
        BYTES_PER_UNSIGNED_INT,
        BYTES_PER_UINT,
        BYTES_PER_FLOAT,
    }
    interface StringMap {
        [index: string]: string;
        [index: number]: string;
    }
    interface IntMap {
        [index: string]: number;
        [index: number]: number;
    }
    interface UintMap {
        [index: string]: number;
        [index: number]: number;
    }
    interface FloatMap {
        [index: string]: number;
        [index: number]: number;
    }
    interface BoolMap {
        [index: string]: bool;
        [index: number]: bool;
    }
    interface BoolDMap {
        [index: string]: BoolMap;
        [index: number]: BoolMap;
    }
    interface StringDMap {
        [index: string]: StringMap;
        [index: number]: StringMap;
    }
    function getTypeSize(eType: EDataTypes): number;
    var sid;
    function now(): number;
    /**@inline*/ 
    function memcpy(pDst: ArrayBuffer, iDstOffset: number, pSrc: ArrayBuffer, iSrcOffset: number, nLength: number): void;
}
function utf8_encode(argString: string): string;
function utf8_decode(str_data: string): string;
interface String {
    toUTF8(): string;
    fromUTF8(): string;
    replaceAt(n: number, s: string);
}
interface Array {
    last: any;
    first: any;
    el(i: number): any;
    clear(): any[];
    swap(i: number, j: number): any[];
    insert(elements: any[]): any[];
    find(pElement: any): bool;
}
interface Number {
    toHex(length: number): string;
    printBinary(isPretty?: bool);
}
module akra.libs {
}
module akra.bf {
    /**
    * Сдвиг единицы на @a x позиций влево.
    * @inline
    */
    var flag: (x: number) => number;
    /**
    * Проверка того что у @a value бит под номером @a bit равен единице.
    * @inline
    */
    var testBit: (value: number, bit: number) => bool;
    /**
    * Проверка того что у @a value равны единице все биты,
    * которые равны единице у @a set.
    * @inline
    */
    var testAll: (value: number, set: number) => bool;
    /**
    * Проверка того что у @a value равны единице хотя бы какие то из битов,
    * которые равны единице у @a set.
    * @inline
    */
    var testAny: (value: number, set: number) => bool;
    /**
    * Выставляет бит под номером @a bit у числа @a value равным единице
    * @inline
    */
    var setBit: (value: number, bit: number, setting: bool) => number;
    /**
    *
    * @inline
    */
    var clearBit: (value: number, bit: number) => number;
    /**
    * Выставляет бит под номером @a bit у числа @a value равным нулю
    * @inline
    */
    var setAll;
    /**
    * Выставляет все биты у числа @a value равными единице,
    * которые равны единице у числа @a set
    * @inline
    */
    var clearAll: (value: number, set: number) => number;
    /**
    * Выставляет все биты у числа @a value равными нулю,
    * которые равны единице у числа @a set
    * @inline
    */
    var equal: (value: number, src: number) => void;
    /**
    * Прирасваивает числу @a value число @a src
    * @inline
    */
    var isEqual: (value: number, src: number) => bool;
    /**
    * Если число @a value равно числу @a src возвращается true
    * @inline
    */
    var isNotEqaul: (value: number, src: number) => bool;
    /**
    * Прирасваивает числу @a value число @a src
    * @inline
    */
    var set: (value: number, src: number) => void;
    /**
    * Обнуляет число @a value
    * @inline
    */
    var clear: (value: number) => void;
    /**
    * Выставляет все биты у числа @a value равными единице,
    * которые равны единице у числа @a src
    * @inline
    */
    var setFlags: (value: number, src: number) => number;
    /**
    * Выставляет все биты у числа @a value равными нулю,
    * которые равны единице у числа @a src
    * @inline
    */
    var clearFlags: (value: number, src: number) => number;
    /**
    * Проверяет равно ли число @a value нулю. Если равно возвращает true.
    * Если не равно возвращает false.
    * @inline
    */
    var isEmpty: (value: number) => bool;
    /**
    * Возвращает общее количество бит числа @a value.
    * На самом деле возвращает всегда 32.
    * @inline
    */
    var totalBits: (value: number) => number;
    /**
    * Возвращает общее количество ненулевых бит числа @a value.
    * @inline
    */
    var totalSet: (value: number) => number;
    /**@inline*/ 
    function fixedToFixed(value: number, n: number, p: number): number;
    /**@inline*/ 
    function floatToFixed(value: number, bits: number): number;
    /**@inline*/ 
    function fixedToFloat(value: number, bits: number): number;
    /**@inline*/ 
    function intWrite(pDest: Uint8Array, n: number, value: number): void;
    /**@inline*/ 
    function intRead(pSrc: Uint8Array, n: number): number;
    function floatToHalfI(i: number): number;
    /**@inline*/ 
    function floatToHalf(f: number): number;
    /**@inline*/ 
    function halfToFloat(y: number): number;
    /**@inline*/ 
    function halfToFloatI(y: number): number;
}
module akra.util {
    interface ILogRoutineMap {
        [eLogLevel: number]: ILogRoutineFunc;
    }
    interface ICodeFamily {
        familyName: string;
        codeMin: number;
        codeMax: number;
    }
    interface ICodeFamilyMap {
        [familyName: string]: ICodeFamily;
    }
    interface ICodeInfo {
        code: number;
        message: string;
        familyName: string;
    }
    interface ICodeInfoMap {
        [code: number]: ICodeInfo;
    }
    interface ICodeFamilyRoutineDMap {
        [familyName: string]: ILogRoutineMap;
    }
    class Logger implements ILogger {
        private _eLogLevel;
        private _pGeneralRoutineMap;
        private _pCurrentSourceLocation;
        private _pLastLogEntity;
        private _pCodeFamilyList;
        private _pCodeFamilyMap;
        private _pCodeInfoMap;
        private _pCodeFamilyRoutineDMap;
        private _nFamilyGenerator;
        private static _sDefaultFamilyName;
        private _eUnknownCode;
        private _sUnknownMessage;
        constructor();
        public init(): bool;
        public setLogLevel(eLevel: ELogLevel): void;
        public getLogLevel(): ELogLevel;
        public registerCode(eCode: number, sMessage?: string): bool;
        public setUnknownCode(eCode: number, sMessage: string): void;
        public registerCodeFamily(eCodeMin: number, eCodeMax: number, sFamilyName?: string): bool;
        public getFamilyName(eCode): string;
        public setCodeFamilyRoutine(eCodeFromFamily: number, fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): bool;
        public setCodeFamilyRoutine(sFamilyName: string, fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): bool;
        public setLogRoutine(fnLogRoutine: ILogRoutineFunc, eLevel: ELogLevel): void;
        public setSourceLocation(sFile: string, iLine: number): void;
        public setSourceLocation(pLocation: ISourceLocation): void;
        public log(...pArgs: any[]): void;
        public info(pEntity: ILoggerEntity): void;
        public info(eCode: number, ...pArgs: any[]): void;
        public info(...pArgs: any[]): void;
        public warning(pEntity: ILoggerEntity): void;
        public warning(eCode: number, ...pArgs: any[]): void;
        public warning(...pArgs: any[]): void;
        public error(pEntity: ILoggerEntity): void;
        public error(eCode: number, ...pArgs: any[]): void;
        public error(...pArgs: any[]): void;
        public criticalError(pEntity: ILoggerEntity): void;
        public criticalError(eCode: number, ...pArgs: any[]): void;
        public criticalError(...pArgs: any[]): void;
        public assert(bCondition: bool, pEntity: ILoggerEntity): void;
        public assert(bCondition: bool, eCode: number, ...pArgs: any[]): void;
        public assert(bCondition: bool, ...pArgs: any[]): void;
        private generateFamilyName();
        private isValidCodeInterval(eCodeMin, eCodeMax);
        /**@inline*/ 
        private isUsedFamilyName(sFamilyName);
        /**@inline*/ 
        private isUsedCode(eCode);
        private isLogEntity(pObj);
        /**@inline*/ 
        private isLogCode(eCode);
        private prepareLogEntity(pEntity);
        private getCodeRoutineFunc(eCode, eLevel);
    }
}
module akra.util {
    var logger: ILogger;
}
module akra {
}
module akra {
    interface ISceneManager {
    }
    interface IParticleManager {
    }
    interface IResourcePoolManager {
    }
    interface IRenderer {
    }
    interface IUtilTimer {
    }
    interface IMesh {
    }
    interface IRenderDataCollection {
    }
    interface IBufferMap {
    }
    interface IAnimationController {
    }
    interface ISkeleton {
    }
    interface IScene3d {
    }
    interface IDependens {
    }
    interface IAFXComposer {
    }
    interface IGamepadMap {
    }
    interface IEngineOptions {
        depsRoot?: string;
        deps?: IDependens;
        gamepads?: bool;
    }
    interface IEngine extends IEventProvider {
        time: number;
        elapsedTime: number;
        getScene(): IScene3d;
        getSceneManager(): ISceneManager;
        getParticleManager(): IParticleManager;
        getResourceManager(): IResourcePoolManager;
        getRenderer(): IRenderer;
        getComposer(): IAFXComposer;
        pause(): bool;
        play(): bool;
        /** Render one frame. */
        renderFrame(): bool;
        /** Start exucution(rendering loop). */
        exec(): void;
        /** Определяет, находитсяли Engine в цикле рендеринга */
        isActive(): bool;
        getTimer(): IUtilTimer;
        enableGamepads(): bool;
        getGamepads(): IGamepadMap;
        createMesh(sName?: string, eOptions?: number, pDataBuffer?: IRenderDataCollection): IMesh;
        createRenderDataCollection(iOptions?: number): IRenderDataCollection;
        createBufferMap(): IBufferMap;
        createAnimationController(iOptions?: number): IAnimationController;
    }
    var createEngine: () => IEngine;
}
module akra {
    interface IManager {
        initialize(): bool;
        destroy(): void;
    }
}
module akra {
    interface IUnique {
        getGuid(): number;
    }
}
module akra {
    interface IEventTable {
    }
    enum EEventTypes {
        BROADCAST,
        UNICAST,
    }
    interface IEventProvider extends IUnique {
        getEventTable(): IEventTable;
        connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        _syncTable(pFrom: IEventProvider): void;
    }
}
module akra {
    enum ESceneTypes {
        TYPE_3D,
        TYPE_2D,
    }
    interface IScene extends IEventProvider {
        type: ESceneTypes;
        getManager(): ISceneManager;
    }
}
module akra {
    interface IEngine {
    }
    interface IScene3d {
    }
    interface IScene2d {
    }
    interface IUI {
    }
    interface ISceneManager extends IManager {
        createScene3D(): IScene3d;
        createUI(): IUI;
        getEngine(): IEngine;
        getScene3D(iScene?: number): IScene3d;
        getScene2D(iScene?: number): IScene2d;
        getScene(iScene?: number, eType?: ESceneTypes): IScene;
        update(): void;
        notifyUpdateScene(): void;
        notifyPreUpdateScene(): void;
    }
}
module akra {
    interface IParticleManager extends IManager {
    }
}
module akra {
    interface IEngine {
    }
    interface IResourceCode {
    }
    interface IResourcePool {
    }
    interface IResourceWatcherFunc {
    }
    interface IResourcePoolItem {
    }
    interface IRenderMethod {
    }
    interface ITexture {
    }
    interface IVertexBuffer {
    }
    interface IModel {
    }
    interface ISurfaceMaterial {
    }
    interface IEffect {
    }
    interface IShaderProgram {
    }
    /** Семейства ресурсов */
    enum EResourceFamilies {
        VIDEO_RESOURCE,
        AUDIO_RESOURCE,
        GAME_RESOURCE,
        TOTAL_RESOURCE_FAMILIES,
    }
    /** Члены семейства видео ресурсов */
    enum EVideoResources {
        TEXTURE_RESOURCE,
        VIDEOBUFFER_RESOURCE,
        VERTEXBUFFER_RESOURCE,
        INDEXBUFFER_RESOURCE,
        EFFECT_RESOURCE,
        RENDERMETHOD_RESOURCE,
        MODEL_RESOURCE,
        EFFECTFILEDATA_RESOURCE,
        IMAGE_RESOURCE,
        SURFACEMATERIAL_RESOURCE,
        SHADERPROGRAM_RESOURCE,
        COMPONENT_RESOURCE,
        EFFECTDATA_RESOURCE,
        TOTAL_VIDEO_RESOURCES,
    }
    enum EAudioResources {
        TOTAL_AUDIO_RESOURCES,
    }
    enum EGameResources {
        TOTAL_GAME_RESOURCES,
    }
    /** Конструктор класса, занимается очисткой списков пулов по семействам ресурсвов и краты пулов по коду ресурсов */
    interface IResourcePoolManager extends IManager {
        texturePool: IResourcePool;
        surfaceMaterialPool: IResourcePool;
        vertexBufferPool: IResourcePool;
        videoBufferPool: IResourcePool;
        indexBufferPool: IResourcePool;
        textureBufferPool: IResourcePool;
        renderMethodPool: IResourcePool;
        colladaPool: IResourcePool;
        imagePool: IResourcePool;
        shaderProgramPool: IResourcePool;
        effectPool: IResourcePool;
        componentPool: IResourcePool;
        effectDataPool: IResourcePool;
        renderBufferPool: IResourcePool;
        /** Регистрируется пул ресурсов опредленного типа в менеджере русурсов */
        registerResourcePool(pCode: IResourceCode, pPool: IResourcePool): void;
        /** Удаляет пул ресурсов опредленного типа в менеджере русурсов */
        unregisterResourcePool(pCode: IResourceCode): IResourcePool;
        /** Удаление ресурсов определенного семества */
        destroyResourceFamily(eFamily: EResourceFamilies): void;
        restoreResourceFamily(eFamily: EResourceFamilies): void;
        disableResourceFamily(eFamily: EResourceFamilies): void;
        cleanResourceFamily(eFamily: EResourceFamilies): void;
        destroyResourceType(pCode: IResourceCode): void;
        restoreResourceType(pCode: IResourceCode): void;
        disableResourceType(pCode: IResourceCode): void;
        cleanResourceType(pCode: IResourceCode): void;
        /** Возвращает пул ресурса опредленного типа по его коду */
        findResourcePool(pCode: IResourceCode): IResourcePool;
        /**
        * Возвращает хендл конкретного ресурса по его имени из конкретного пула опредленного типа
        **/
        findResourceHandle(pCode: IResourceCode, sName: string): number;
        /** Возвращает конкретный ресурс по его имени из конкретного пула опредленного типа */
        findResource(pCode: IResourceCode, sName: string): IResourcePoolItem;
        findResource(pCode: IResourceCode, iHandle: number): IResourcePoolItem;
        monitorInitResources(fnMonitor: IResourceWatcherFunc): void;
        setLoadedAllRoutine(fnCallback: Function): void;
        /** Удаление всех ресурсов */
        destroyAll(): void;
        restoreAll(): void;
        disableAll(): void;
        clean(): void;
        createDeviceResources(): bool;
        destroyDeviceResources(): bool;
        restoreDeviceResources(): bool;
        disableDeviceResources(): bool;
        getEngine(): IEngine;
        createRenderMethod(sResourceName: string): IRenderMethod;
        createTexture(sResourceName: string): ITexture;
        createSurfaceMaterial(sResourceName: string): ISurfaceMaterial;
        createEffect(sResourceName: string): IEffect;
        createVertexBuffer(sResourceName: string): IVertexBuffer;
        createVideoBuffer(sResourceName: string): IVertexBuffer;
        createIndexBuffer(sResourceName: string): IIndexBuffer;
        createShaderProgram(sResourceName: string): IShaderProgram;
        createModel(sResourceName: string): IModel;
        createImg(sResourceName: string): IImg;
        loadModel(sFilename: string, pOptions?: any): IModel;
        loadImage(sFilename: string): IImg;
    }
}
module akra {
    interface IRenderEntry {
    }
    interface IRenderQueue {
        execute(): void;
        push(pEntry: IRenderEntry): void;
        createEntry(): IRenderEntry;
        releaseEntry(pEntry: IRenderEntry): void;
    }
}
module akra {
    enum ECompareFunction {
        ALWAYS_FAIL,
        ALWAYS_PASS,
        LESS,
        LESS_EQUAL,
        EQUAL,
        NOT_EQUAL,
        GREATER_EQUAL,
        GREATER,
    }
    enum ECullingMode {
        NONE,
        CLOCKWISE,
        ANTICLOCKWISE,
    }
    enum EFrameBufferTypes {
        COLOR,
        DEPTH,
        STENCIL,
    }
    interface IViewportState {
        cullingMode: ECullingMode;
        depthTest: bool;
        depthWrite: bool;
        depthFunction: ECompareFunction;
        clearColor: IColor;
        clearDepth: number;
        clearBuffers: number;
    }
}
module akra {
    interface IAFXComponent {
    }
    interface IAFXEffect {
    }
    interface IRenderableObject {
    }
    interface IRenderSnapshot {
    }
    interface ISceneObject {
    }
    interface IBufferMap {
    }
    interface IShaderProgram {
    }
    interface ISurfaceMaterial {
    }
    interface IVertexData {
    }
    interface IVertexBuffer {
    }
    interface ITexture {
    }
    interface IIndexBuffer {
    }
    interface IRenderResource {
    }
    interface IRenderEntry {
    }
    interface IViewport {
    }
    interface IColor {
    }
    interface IEngine {
    }
    interface IRenderTarget {
    }
    interface ICanvas3d {
    }
    enum EPrimitiveTypes {
        POINTLIST,
        LINELIST,
        LINELOOP,
        LINESTRIP,
        TRIANGLELIST,
        TRIANGLESTRIP,
        TRIANGLEFAN,
    }
    enum ERenderCapabilitiesCategory {
        C_COMMON,
        C_COMMON_2,
        C_WEBGL,
        COUNT,
    }
    enum ERenderCapabilities {
        AUTOMIPMAP,
        BLENDING,
        ANISOTROPY,
        DOT3,
        CUBEMAPPING,
        HWSTENCIL,
        VBO,
        VERTEX_PROGRAM,
        FRAGMENT_PROGRAM,
        SCISSOR_TEST,
        TWO_SIDED_STENCIL,
        STENCIL_WRAP,
        HWOCCLUSION,
        USER_CLIP_PLANES,
        VERTEX_FORMAT_UBYTE4,
        INFINITE_FAR_PLANE,
        HWRENDER_TO_TEXTURE,
        TEXTURE_FLOAT,
        NON_POWER_OF_2_TEXTURES,
        TEXTURE_3D,
        POINT_SPRITES,
        POINT_EXTENDED_PARAMETERS,
        VERTEX_TEXTURE_FETCH,
        MIPMAP_LOD_BIAS,
        GEOMETRY_PROGRAM,
        HWRENDER_TO_VERTEX_BUFFER,
        TEXTURE_COMPRESSION,
        TEXTURE_COMPRESSION_DXT,
        TEXTURE_COMPRESSION_VTC,
        TEXTURE_COMPRESSION_PVRTC,
        FIXED_FUNCTION,
        MRT_DIFFERENT_BIT_DEPTHS,
        ALPHA_TO_COVERAGE,
        ADVANCED_BLEND_OPERATIONS,
        RTT_SEPARATE_DEPTHBUFFER,
        RTT_MAIN_DEPTHBUFFER_ATTACHABLE,
        RTT_DEPTHBUFFER_RESOLUTION_LESSEQUAL,
        VERTEX_BUFFER_INSTANCE_DATA,
        CAN_GET_COMPILED_SHADER_BUFFER,
        GL1_5_NOVBO,
        FBO,
        FBO_ARB,
        FBO_ATI,
        PBUFFER,
        GL1_5_NOHWOCCLUSION,
        POINT_EXTENDED_PARAMETERS_ARB,
        POINT_EXTENDED_PARAMETERS_EXT,
        SEPARATE_SHADER_OBJECTS,
    }
    enum EAttachmentTypes {
        COLOR_ATTACHMENT0,
        DEPTH_ATTACHMENT,
        STENCIL_ATTACHMENT,
        DEPTH_STENCIL_ATTACHMENT,
    }
    interface IRenderer extends IEventProvider {
        getEngine(): IEngine;
        debug(bValue?: bool, useApiTrace?: bool): bool;
        isDebug(): bool;
        isValid(): bool;
        getError();
        clearFrameBuffer(iBuffer: number, cColor: IColor, fDepth: number, iStencil: number): void;
        _beginRender(): void;
        _renderEntry(pEntry: IRenderEntry): void;
        _endRender(): void;
        _disableAllTextureUnits(): void;
        _disableTextureUnitsFrom(iUnit: number): void;
        _initRenderTargets(): void;
        _updateAllRenderTargets(): void;
        _setViewport(pViewport: IViewport): void;
        _setViewportForRender(pViewport: IViewport): void;
        _getViewport(): IViewport;
        _setRenderTarget(pTarget: IRenderTarget): void;
        _setCullingMode(eMode: ECullingMode): void;
        _setDepthBufferParams(bDepthTest: bool, bDepthWrite: bool, eDepthFunction: ECompareFunction, fClearDepth?: number): void;
        hasCapability(eCapability: ERenderCapabilities): bool;
        attachRenderTarget(pTarget: IRenderTarget): bool;
        detachRenderTarget(pTarget: IRenderTarget): bool;
        destroyRenderTarget(pTarget: IRenderTarget): void;
        getActiveProgram(): IShaderProgram;
        getDefaultCanvas(): ICanvas3d;
        createEntry(): IRenderEntry;
        releaseEntry(pEntry: IRenderEntry): void;
        pushEntry(pEntry: IRenderEntry): void;
        executeQueue(): void;
    }
}
module akra {
    enum EUtilTimerCommands {
        TIMER_RESET,
        TIMER_START,
        TIMER_STOP,
        TIMER_ADVANCE,
        TIMER_GET_ABSOLUTE_TIME,
        TIMER_GET_APP_TIME,
        TIMER_GET_ELAPSED_TIME,
    }
    interface IUtilTimer {
        absoluteTime: number;
        appTime: number;
        elapsedTime: number;
        start(): bool;
        stop(): bool;
        reset(): bool;
        execCommand(e: EUtilTimerCommands): number;
    }
}
module akra {
    interface ISceneNode {
    }
    interface ICamera {
    }
    interface ILightParameters {
        ambient: IColor;
        diffuse: IColor;
        specular: IColor;
        attenuation: IVec3;
    }
    enum ELightTypes {
        UNKNOWN,
        PROJECT,
        OMNI,
    }
    interface ILightPoint extends ISceneNode {
        params: ILightParameters;
        enabled: bool;
        lightType: ELightTypes;
        isShadowCaster: bool;
        create(isShadowCaster?: bool, iMaxShadowResolution?: number): bool;
        _prepareForLighting(pCamera: ICamera): bool;
        _calculateShadows(): void;
    }
}
module akra {
    interface ISceneNode {
    }
    interface ISceneModel {
    }
    interface ISceneObject {
    }
    interface ICamera {
    }
    interface ISprite {
    }
    interface IJoint {
    }
    interface IText3d {
    }
    interface IDisplayList {
    }
    interface IViewport {
    }
    interface IShadowCaster {
    }
    interface ITerrainSection {
    }
    interface ITerrainSectionROAM {
    }
    interface IModel {
    }
    interface ITerrain {
    }
    interface ITerrainROAM {
    }
    interface IModelEntry {
    }
    interface IScene3d extends IScene {
        totalDL: number;
        getRootNode(): ISceneNode;
        recursivePreUpdate(): void;
        updateCamera(): bool;
        updateScene(): bool;
        recursiveUpdate(): void;
        isUpdated(): bool;
        createObject(sName?: string): ISceneObject;
        createNode(sName?: string): ISceneNode;
        createModel(sName?: string): ISceneModel;
        createCamera(sName?: string): ICamera;
        createLightPoint(eType?: ELightTypes, isShadowCaster?: bool, iMaxShadowResolution?: number, sName?: string): ILightPoint;
        createSprite(sName?: string): ISprite;
        createJoint(sName?: string): IJoint;
        createText3d(sName?: string): IText3d;
        createTerrain(sName?: string): ITerrain;
        createTerrainROAM(sName?: string): ITerrainROAM;
        createTerrainSection(sName?: string): ITerrainSection;
        createTerrainSectionROAM(sName?: string): ITerrainSectionROAM;
        _createModelEntry(pModel: IModel): IModelEntry;
        _createShadowCaster(pLightPoint: ILightPoint, iFace?: number, sName?: string): IShadowCaster;
        getDisplayList(index: number): IDisplayList;
        getDisplayListByName(csName: string): number;
        addDisplayList(pList: IDisplayList): number;
        delDisplayList(index: number): bool;
        nodeAttachment(pNode: ISceneNode): void;
        nodeDetachment(pNode: ISceneNode): void;
        displayListAdded(pList: IDisplayList, index: number): void;
        displayListRemoved(pList: IDisplayList, index: number): void;
        beforeUpdate(): void;
        postUpdate(): void;
        preUpdate(): void;
        _render(pCamera: ICamera, pViewport: IViewport): void;
    }
}
module akra {
    enum ENodeCreateMode {
        k_Default,
        k_Necessary,
        k_Not,
    }
    enum EParserCode {
        k_Pause,
        k_Ok,
        k_Error,
    }
    enum EParserType {
        k_LR0,
        k_LR1,
        k_LALR,
    }
    enum EParseMode {
        k_AllNode,
        k_Negate,
        k_Add,
        k_Optimize,
        k_DebugMode,
    }
    enum ETokenType {
        k_NumericLiteral,
        k_CommentLiteral,
        k_StringLiteral,
        k_PunctuatorLiteral,
        k_WhitespaceLiteral,
        k_IdentifierLiteral,
        k_KeywordLiteral,
        k_Unknown,
        k_End,
    }
    interface IToken {
        value: string;
        start: number;
        end: number;
        line: number;
        name?: string;
        type?: ETokenType;
    }
    interface IRule {
        left: string;
        right: string[];
        index: number;
    }
    interface IFinishFunc {
        (eCode: EParserCode, sFileName: string): void;
    }
    enum EOperationType {
        k_Error,
        k_Shift,
        k_Reduce,
        k_Success,
        k_Pause,
        k_Ok,
    }
    interface IRuleFunction {
        (): EOperationType;
    }
    interface IParseNode {
        children: IParseNode[];
        parent: IParseNode;
        name: string;
        value: string;
        isAnalyzed: bool;
        position: number;
        start?: number;
        end?: number;
        line?: number;
    }
    interface IParseTree {
        setRoot(): void;
        setOptimizeMode(isOptimize: bool): void;
        addNode(pNode: IParseNode): void;
        reduceByRule(pRule: IRule, eCreate: ENodeCreateMode);
        toString(): string;
        clone(): IParseTree;
        getNodes(): IParseNode[];
        getLastNode(): IParseNode;
        root: IParseNode;
    }
    interface ILexer {
        addPunctuator(sValue: string, sName?: string): string;
        addKeyword(sValue: string, sName: string): string;
        getTerminalValueByName(sName: string): string;
        init(sSource: string): void;
        getNextToken(): IToken;
        _getIndex(): number;
        _setSource(sSource: string): void;
        _setIndex(iIndex: number): void;
    }
    interface IParserState {
        source: string;
        index: number;
        fileName: string;
        tree: IParseTree;
        types: BoolMap;
        stack: number[];
        token: IToken;
        fnCallback: IFinishFunc;
        caller: any;
    }
    interface IParser {
        isTypeId(sValue: string): bool;
        returnCode(pNode: IParseNode): string;
        init(sGrammar: string, eMode?: EParseMode, eType?: EParserType): bool;
        parse(sSource: string, fnFinishCallback?: IFinishFunc, pCaller?: any): EParserCode;
        setParseFileName(sFileName: string): void;
        getParseFileName(): string;
        pause(): EParserCode;
        resume(): EParserCode;
        getSyntaxTree(): IParseTree;
        printStates(isPrintOnlyBase?: bool): void;
        printState(iStateIndex: number, isPrintOnlyBase?: bool): void;
        getGrammarSymbols(): StringMap;
        _saveState(): IParserState;
        _loadState(pState: IParserState): void;
    }
}
module akra {
    interface IReferenceCounter {
        /**
        * Текущее количесвто ссылок  на объект
        **/
        referenceCount(): number;
        /** Предупреждает если объект еще используется */
        destructor(): void;
        /**
        * Добаволение ссылки  на объект, увеличивает внутренний счетчки на 1,
        * проверяет не достигнуто ли максимальное количесвто
        **/
        addRef(): number;
        /**
        * Уведомление об удалении ссылки  на объект, уменьшает внутренний счетчки на 1,
        * проверяет есть ли ее объекты
        **/
        release(): number;
        /**
        * Данная функция нужна чтобы обеспечить наследникам ее возможность,
        * само количестdо ссылок не копируется
        */
        eq(pSrc: IReferenceCounter): IReferenceCounter;
    }
}
module akra {
    interface IEngine {
    }
    interface IResourceWatcherFunc {
    }
    interface IResourceNotifyRoutineFunc {
    }
    interface IResourceCode {
    }
    interface IResourcePool {
    }
    interface IResourcePoolManager {
    }
    /**
    * Отражает состояние ресурса
    **/
    enum EResourceItemEvents {
        CREATED,
        LOADED,
        DISABLED,
        ALTERED,
        TOTALRESOURCEFLAGS,
    }
    interface IResourcePoolItem extends IReferenceCounter, IEventProvider {
        /** resource code */
        resourceCode: IResourceCode;
        /** resource pool */
        resourcePool: IResourcePool;
        /** resource handle */
        resourceHandle: number;
        /** resource flags */
        resourceFlags: number;
        /** Проверка был ли изменен ресур после загрузки */
        alteredFlag: bool;
        manager: IResourcePoolManager;
        /** Get current Engine. */
        getEngine(): IEngine;
        getManager(): IResourcePoolManager;
        /** Инициализация ресурса, вызывается один раз. Виртуальная. */
        createResource(): bool;
        /** Уничтожение ресурса. Виртуальная. */
        destroyResource(): bool;
        /**  Удаление ресурса из энергозависимой памяти. Виртуальная. */
        disableResource(): bool;
        /** Возвращение ресурса в энегрозависимю память. Виртуальная. */
        restoreResource(): bool;
        /** Загрузка ресурса из файла, или null при использовании имени ресурса. Виртуальная. */
        loadResource(sFilename?: string): bool;
        /** Сохранение ресурса в файл, или null при использовании имени ресурса. */
        saveResource(sFilename?: string): bool;
        /** Добавление и удаление функции, которая будет вызываться при изменении состояния ресурса( fnFunc(iNewSost,iOldSost) ) */
        setChangesNotifyRoutine(fn: IResourceNotifyRoutineFunc): void;
        delChangesNotifyRoutine(fn: IResourceNotifyRoutineFunc): void;
        setStateWatcher(eEvent: EResourceItemEvents, fnWatcher: IResourceWatcherFunc): void;
        sync(pResourceItem: IResourcePoolItem, eSignal: EResourceItemEvents, eSlot?: EResourceItemEvents): bool;
        unsync(pResourceItem: IResourcePoolItem, eSignal: EResourceItemEvents, eSlot?: EResourceItemEvents): bool;
        /** Установка состояния в созданный */
        notifyCreated(): void;
        /** Установка в состояние не созданный */
        notifyDestroyed(): void;
        /** Уставнока в состояние загруженный */
        notifyLoaded(): void;
        /** Уставнока в состояние незагруженный */
        notifyUnloaded(): void;
        /** Установка в состояние используемый */
        notifyRestored(): void;
        /** Установка в состояние не используемый */
        notifyDisabled(): void;
        /** Установка в состояние не используемый */
        notifyAltered(): void;
        /** Установка в состояние сохраненый */
        notifySaved(): void;
        notifyStateChange(eEvent: EResourceItemEvents, pTarget?: IResourcePoolItem);
        /** Проверка создан ли ресурс */
        isResourceCreated(): bool;
        /** Проверка загружен ли ресурс */
        isResourceLoaded(): bool;
        /** Проверка активен ли ресурс */
        isResourceDisabled(): bool;
        /** Проверка обновлен ли ресурс */
        isResourceAltered(): bool;
        /** Установка состояния в изменен после загружки */
        setAlteredFlag(isOn?: bool): bool;
        /** Пиписывание ресурсу имени */
        setResourceName(sName: string);
        /** Поиск имени ресурса */
        findResourceName(): string;
        /** оповещение о уменьшении количесва ссылок на ресурс */
        release(): number;
        setResourceCode(pCode: IResourceCode): void;
        setResourcePool(pPool: IResourcePool): void;
        setResourceHandle(iHandle: number): void;
        setResourceFlag(eFlagBit: EResourceItemEvents, isSetting: bool): bool;
        setResourceFlag(iFlagBit: number, isSetting: bool): bool;
        created(): void;
        destroyed(): void;
        loaded(): void;
        unloaded(): void;
        restored(): void;
        disabled(): void;
        altered(): void;
        saved(): void;
    }
    interface IResourcePoolItemType {
        new(pManager: IResourcePoolManager): IResourcePoolItem;
    }
}
module akra {
    enum EAFXInstructionTypes {
        k_Instruction,
        k_InstructionCollector,
        k_SimpleInstruction,
        k_VariableTypeInstruction,
        k_SystemTypeInstruction,
        k_ComplexTypeInstruction,
        k_TypedInstruction,
        k_DeclInstruction,
        k_IntInstruction,
        k_FloatInstruction,
        k_BoolInstruction,
        k_StringInstruction,
        k_IdInstruction,
        k_KeywordInstruction,
        k_TypeDeclInstruction,
        k_VariableDeclInstruction,
        k_AnnotationInstruction,
        k_UsageTypeInstruction,
        k_BaseTypeInstruction,
        k_StructDeclInstruction,
        k_StructFieldsInstruction,
        k_ExprInstruction,
        k_IdExprInstruction,
        k_ArithmeticExprInstruction,
        k_AssignmentExprInstruction,
        k_RelationalExprInstruction,
        k_LogicalExprInstruction,
        k_ConditionalExprInstruction,
        k_CastExprInstruction,
        k_UnaryExprInstruction,
        k_PostfixIndexInstruction,
        k_PostfixPointInstruction,
        k_PostfixArithmeticInstruction,
        k_PrimaryExprInstruction,
        k_ComplexExprInstruction,
        k_FunctionCallInstruction,
        k_SystemCallInstruction,
        k_ConstructorCallInstruction,
        k_CompileExprInstruction,
        k_InitExprInstruction,
        k_SamplerStateBlockInstruction,
        k_SamplerStateInstruction,
        k_ExtractExprInstruction,
        k_MemExprInstruction,
        k_FunctionDeclInstruction,
        k_ShaderFunctionInstruction,
        k_SystemFunctionInstruction,
        k_FunctionDefInstruction,
        k_StmtInstruction,
        k_StmtBlockInstruction,
        k_ExprStmtInstruction,
        k_BreakStmtInstruction,
        k_WhileStmtInstruction,
        k_ForStmtInstruction,
        k_IfStmtInstruction,
        k_DeclStmtInstruction,
        k_ReturnStmtInstruction,
        k_ExtractStmtInstruction,
        k_SemicolonStmtInstruction,
        k_PassInstruction,
        k_TechniqueInstruction,
    }
    enum EFunctionType {
        k_Vertex,
        k_Pixel,
        k_Fragment,
        k_Function,
        k_PassFunction,
    }
    enum ECheckStage {
        CODE_TARGET_SUPPORT,
        SELF_CONTAINED,
    }
    enum EVarUsedMode {
        k_Read,
        k_Write,
        k_ReadWrite,
        k_Undefined,
        k_Default,
    }
    interface IAFXInstructionStateMap extends StringMap {
    }
    interface IAFXInstructionRoutine {
        (): void;
    }
    interface IAFXInstructionError {
        code: number;
        info: any;
    }
    interface IAFXInstructionMap {
        [index: number]: IAFXInstruction;
    }
    interface IAFXSimpleInstructionMap {
        [index: string]: IAFXSimpleInstruction;
        [index: number]: IAFXSimpleInstruction;
    }
    interface IAFXIdExprMap {
        [index: string]: IAFXIdExprInstruction;
    }
    interface IAFXVariableTypeMap {
        [index: string]: IAFXVariableTypeInstruction;
        [index: number]: IAFXVariableTypeInstruction;
    }
    interface IAFXTypeMap {
        [index: string]: IAFXTypeInstruction;
        [index: number]: IAFXTypeInstruction;
    }
    interface IAFXTypeListMap {
        [index: string]: IAFXTypeInstruction[];
        [index: number]: IAFXTypeInstruction[];
    }
    interface IAFXTypeDeclMap {
        [index: string]: IAFXTypeDeclInstruction;
        [index: number]: IAFXTypeDeclInstruction;
    }
    interface IAFXVariableDeclMap {
        [index: number]: IAFXVariableDeclInstruction;
        [index: string]: IAFXVariableDeclInstruction;
    }
    interface IAFXVariableDeclListMap {
        [index: number]: IAFXVariableDeclInstruction[];
        [index: string]: IAFXVariableDeclInstruction[];
    }
    interface IAFXVarUsedModeMap {
        [index: string]: EVarUsedMode;
    }
    interface IAFXFunctionDeclMap {
        [index: string]: IAFXFunctionDeclInstruction;
        [index: number]: IAFXFunctionDeclInstruction;
    }
    interface IAFXTypeUseInfoContainer {
        type: IAFXVariableTypeInstruction;
        isRead: bool;
        isWrite: bool;
        numRead: number;
        numWrite: number;
        numUsed: number;
    }
    interface IAFXTypeUseInfoMap {
        [index: number]: IAFXTypeUseInfoContainer;
    }
    enum EExtractExprType {
        k_Header,
        k_Float,
        k_Int,
        k_Bool,
        k_Float2,
        k_Int2,
        k_Bool2,
        k_Float3,
        k_Int3,
        k_Bool3,
        k_Float4,
        k_Int4,
        k_Bool4,
        k_Float4x4,
    }
    enum EAFXBlendMode {
        k_Shared,
        k_Uniform,
        k_Attribute,
        k_Foreign,
        k_Global,
        k_Varying,
        k_TypeDecl,
        k_VertexOut,
    }
    /**
    * All opertion are represented by:
    * operator : arg1 ... argn
    * Operator and instructions may be empty.
    */
    interface IAFXInstruction extends IUnique {
        setParent(pParent: IAFXInstruction): void;
        getParent(): IAFXInstruction;
        setOperator(sOperator: string): void;
        getOperator(): string;
        setInstructions(pInstructionList: IAFXInstruction[]): void;
        getInstructions(): IAFXInstruction[];
        _getInstructionType(): EAFXInstructionTypes;
        _getInstructionID(): number;
        _getScope(): number;
        _setScope(iScope: number): void;
        _isInGlobalScope(): bool;
        check(eStage: ECheckStage): bool;
        getLastError(): IAFXInstructionError;
        setError(eCode: number, pInfo?: any): void;
        clearError(): void;
        isErrorOccured(): bool;
        setVisible(isVisible: bool): void;
        isVisible(): bool;
        initEmptyInstructions(): void;
        push(pInstruction: IAFXInstruction, isSetParent?: bool): void;
        addRoutine(fnRoutine: IAFXInstructionRoutine, iPriority?: number);
        prepareFor(eUsedType: EFunctionType): void;
        toString(): string;
        toFinalCode(): string;
        clone(pRelationMap?: IAFXInstructionMap): IAFXInstruction;
    }
    interface IAFXSimpleInstruction extends IAFXInstruction {
        setValue(sValue: string): void;
        isValue(sValue: string): bool;
    }
    interface IAFXTypeInstruction extends IAFXInstruction {
        _toDeclString(): string;
        isBuiltIn(): bool;
        setBuiltIn(isBuiltIn: bool): void;
        /**
        * Simple tests
        */
        isBase(): bool;
        isArray(): bool;
        isNotBaseArray(): bool;
        isComplex(): bool;
        isEqual(pType: IAFXTypeInstruction): bool;
        isStrongEqual(pType: IAFXTypeInstruction): bool;
        isConst(): bool;
        isSampler(): bool;
        isSamplerCube(): bool;
        isSampler2D(): bool;
        isWritable(): bool;
        isReadable(): bool;
        _containArray(): bool;
        _containSampler(): bool;
        _containPointer(): bool;
        _containComplexType(): bool;
        /**
        * Set private params
        */
        setName(sName: string): void;
        _canWrite(isWritable: bool): void;
        _canRead(isReadable: bool): void;
        /**
        * get type info
        */
        getName(): string;
        getRealName(): string;
        getHash(): string;
        getStrongHash(): string;
        getSize(): number;
        getBaseType(): IAFXTypeInstruction;
        getLength(): number;
        getArrayElementType(): IAFXTypeInstruction;
        getTypeDecl(): IAFXTypeDeclInstruction;
        hasField(sFieldName: string): bool;
        hasFieldWithSematic(sSemantic: string);
        hasAllUniqueSemantics(): bool;
        hasFieldWithoutSemantic(): bool;
        getField(sFieldName: string): IAFXVariableDeclInstruction;
        getFieldBySemantic(sSemantic: string): IAFXVariableDeclInstruction;
        getFieldType(sFieldName: string): IAFXVariableTypeInstruction;
        getFieldNameList(): string[];
        /**
        * System
        */
        clone(pRelationMap?: IAFXInstructionMap): IAFXTypeInstruction;
        blend(pType: IAFXTypeInstruction, eMode: EAFXBlendMode): IAFXTypeInstruction;
    }
    interface IAFXVariableTypeInstruction extends IAFXTypeInstruction {
        _setCollapsed(bValue: bool): void;
        _isCollapsed(): bool;
        /**
        * Simple tests
        */
        isPointer(): bool;
        isStrictPointer(): bool;
        isPointIndex(): bool;
        isFromVariableDecl(): bool;
        isFromTypeDecl(): bool;
        isUniform(): bool;
        isGlobal(): bool;
        isConst(): bool;
        isShared(): bool;
        isForeign(): bool;
        _isTypeOfField(): bool;
        _isUnverifiable(): bool;
        /**
        * init api
        */
        setPadding(iPadding: number): void;
        pushType(pType: IAFXTypeInstruction): void;
        addUsage(sUsage: string): void;
        addArrayIndex(pExpr: IAFXExprInstruction): void;
        addPointIndex(isStrict?: bool): void;
        setVideoBuffer(pBuffer: IAFXVariableDeclInstruction): void;
        initializePointers(): void;
        _setPointerToStrict(): void;
        _addPointIndexInDepth(): void;
        _setVideoBufferInDepth(): void;
        _markAsUnverifiable(isUnverifiable: bool): void;
        _addAttrOffset(pOffset: IAFXVariableDeclInstruction): void;
        /**
        * Type info
        */
        getPadding(): number;
        getArrayElementType(): IAFXVariableTypeInstruction;
        getUsageList(): string[];
        getSubType(): IAFXTypeInstruction;
        hasUsage(sUsageName: string): bool;
        hasVideoBuffer(): bool;
        getPointDim(): number;
        getPointer(): IAFXVariableDeclInstruction;
        getVideoBuffer(): IAFXVariableDeclInstruction;
        getFieldExpr(sFieldName: string): IAFXIdExprInstruction;
        getFieldIfExist(sFieldName: string): IAFXVariableDeclInstruction;
        getSubVarDecls(): IAFXVariableDeclInstruction[];
        _getFullName(): string;
        _getVarDeclName(): string;
        _getTypeDeclName(): string;
        _getParentVarDecl(): IAFXVariableDeclInstruction;
        _getParentContainer(): IAFXVariableDeclInstruction;
        _getMainVariable(): IAFXVariableDeclInstruction;
        _getMainPointer(): IAFXVariableDeclInstruction;
        _getUpPointer(): IAFXVariableDeclInstruction;
        _getDownPointer(): IAFXVariableDeclInstruction;
        _getAttrOffset(): IAFXVariableDeclInstruction;
        /**
        * System
        */
        wrap(): IAFXVariableTypeInstruction;
        clone(pRelationMap?: IAFXInstructionMap): IAFXVariableTypeInstruction;
        blend(pVariableType: IAFXVariableTypeInstruction, eMode: EAFXBlendMode): IAFXVariableTypeInstruction;
        _setCloneHash(sHash: string, sStrongHash: string): void;
        _setCloneArrayIndex(pElementType: IAFXVariableTypeInstruction, pIndexExpr: IAFXExprInstruction, iLength: number): void;
        _setClonePointeIndexes(nDim: number, pPointerList: IAFXVariableDeclInstruction[]): void;
        _setCloneFields(pFieldMap: IAFXVariableDeclMap): void;
        _setUpDownPointers(pUpPointer: IAFXVariableDeclInstruction, pDownPointer: IAFXVariableDeclInstruction): void;
    }
    interface IAFXTypedInstruction extends IAFXInstruction {
        getType(): IAFXTypeInstruction;
        setType(pType: IAFXTypeInstruction): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXTypedInstruction;
    }
    interface IAFXDeclInstruction extends IAFXTypedInstruction {
        setSemantic(sSemantic: string);
        setAnnotation(pAnnotation: IAFXAnnotationInstruction): void;
        getName(): string;
        getRealName(): string;
        getNameId(): IAFXIdInstruction;
        getSemantic(): string;
        isBuiltIn(): bool;
        setBuiltIn(isBuiltIn: bool): void;
        _isForAll(): bool;
        _isForPixel(): bool;
        _isForVertex(): bool;
        _setForAll(canUse: bool): void;
        _setForPixel(canUse: bool): void;
        _setForVertex(canUse: bool): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXDeclInstruction;
    }
    interface IAFXTypeDeclInstruction extends IAFXDeclInstruction {
        clone(pRelationMap?: IAFXInstructionMap): IAFXTypeDeclInstruction;
        blend(pDecl: IAFXTypeDeclInstruction, eBlendMode: EAFXBlendMode): IAFXTypeDeclInstruction;
    }
    interface IAFXVariableDeclInstruction extends IAFXDeclInstruction {
        hasInitializer(): bool;
        getInitializeExpr(): IAFXInitExprInstruction;
        lockInitializer(): void;
        unlockInitializer(): void;
        getDefaultValue(): any;
        getValue(): any;
        setValue(pValue: any): any;
        getType(): IAFXVariableTypeInstruction;
        setType(pType: IAFXVariableTypeInstruction): void;
        isUniform(): bool;
        isField(): bool;
        isPointer(): bool;
        isVideoBuffer(): bool;
        isSampler(): bool;
        getSubVarDecls(): IAFXVariableDeclInstruction[];
        isDefinedByZero(): bool;
        defineByZero(isDefine: bool): void;
        _setAttrExtractionBlock(pCodeBlock: IAFXInstruction): void;
        _getAttrExtractionBlock(): IAFXInstruction;
        _markAsVarying(bValue: bool): void;
        _markAsShaderOutput(isShaderOutput: bool): void;
        _isShaderOutput(): bool;
        _getFullNameExpr(): IAFXExprInstruction;
        _getFullName(): string;
        _getVideoBufferSampler(): IAFXVariableDeclInstruction;
        _getVideoBufferHeader(): IAFXVariableDeclInstruction;
        _getVideoBufferInitExpr(): IAFXInitExprInstruction;
        setName(sName: string): void;
        setRealName(sName: string): void;
        setVideoBufferRealName(sSampler: string, sHeader: string): void;
        _setCollapsed(bValue: bool): void;
        _isCollapsed(): bool;
        clone(pRelationMap?: IAFXInstructionMap): IAFXVariableDeclInstruction;
        blend(pVariableDecl: IAFXVariableDeclInstruction, eMode: EAFXBlendMode): IAFXVariableDeclInstruction;
    }
    interface IAFXFunctionDeclInstruction extends IAFXDeclInstruction {
        toFinalDefCode(): string;
        hasImplementation(): bool;
        getArguments(): IAFXTypedInstruction[];
        getNumNeededArguments(): number;
        getReturnType(): IAFXVariableTypeInstruction;
        getFunctionType(): EFunctionType;
        setFunctionType(eType: EFunctionType): void;
        _getVertexShader(): IAFXFunctionDeclInstruction;
        _getPixelShader(): IAFXFunctionDeclInstruction;
        setFunctionDef(pFunctionDef: IAFXDeclInstruction): void;
        setImplementation(pImplementation: IAFXStmtInstruction): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXFunctionDeclInstruction;
        _addOutVariable(pVariable: IAFXVariableDeclInstruction): bool;
        _getOutVariable(): IAFXVariableDeclInstruction;
        _markUsedAs(eUsedType: EFunctionType): void;
        _isUsedAs(eUsedType: EFunctionType): bool;
        _isUsedAsFunction(): bool;
        _isUsedAsVertex(): bool;
        _isUsedAsPixel(): bool;
        _isUsed(): bool;
        _markUsedInVertex(): void;
        _markUsedInPixel(): void;
        _isUsedInVertex(): bool;
        _isUsedInPixel(): bool;
        _checkVertexUsage(): bool;
        _checkPixelUsage(): bool;
        _checkDefenitionForVertexUsage(): bool;
        _checkDefenitionForPixelUsage(): bool;
        _canUsedAsFunction(): bool;
        _notCanUsedAsFunction(): void;
        _addUsedFunction(pFunction: IAFXFunctionDeclInstruction): bool;
        _getUsedFunctionList(): IAFXFunctionDeclInstruction[];
        _addUsedVariable(pVariable: IAFXVariableDeclInstruction): void;
        _isBlackListFunction(): bool;
        _addToBlackList(): void;
        _getStringDef(): string;
        _convertToVertexShader(): IAFXFunctionDeclInstruction;
        _convertToPixelShader(): IAFXFunctionDeclInstruction;
        _prepareForVertex(): void;
        _prepareForPixel(): void;
        _generateInfoAboutUsedData(): void;
        _getAttributeVariableMap(): IAFXVariableDeclMap;
        _getVaryingVariableMap(): IAFXVariableDeclMap;
        _getSharedVariableMap(): IAFXVariableDeclMap;
        _getGlobalVariableMap(): IAFXVariableDeclMap;
        _getUniformVariableMap(): IAFXVariableDeclMap;
        _getForeignVariableMap(): IAFXVariableDeclMap;
        _getTextureVariableMap(): IAFXVariableDeclMap;
        _getUsedComplexTypeMap(): IAFXTypeMap;
        _getAttributeVariableKeys(): number[];
        _getVaryingVariableKeys(): number[];
        _getSharedVariableKeys(): number[];
        _getUniformVariableKeys(): number[];
        _getForeignVariableKeys(): number[];
        _getGlobalVariableKeys(): number[];
        _getTextureVariableKeys(): number[];
        _getUsedComplexTypeKeys(): number[];
        _getExtSystemFunctionList(): IAFXFunctionDeclInstruction[];
        _getExtSystemMacrosList(): IAFXSimpleInstruction[];
        _getExtSystemTypeList(): IAFXTypeDeclInstruction[];
    }
    interface IAFXStructDeclInstruction extends IAFXInstruction {
    }
    interface IAFXIdInstruction extends IAFXInstruction {
        getName(): string;
        getRealName(): string;
        setName(sName: string): void;
        setRealName(sName: string): void;
        _markAsVarying(bValue: bool): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXIdInstruction;
    }
    interface IAFXKeywordInstruction extends IAFXInstruction {
        setValue(sValue: string): void;
        isValue(sTestValue: string): bool;
    }
    interface IAFXAnalyzedInstruction extends IAFXInstruction {
        addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    interface IAFXExprInstruction extends IAFXTypedInstruction, IAFXAnalyzedInstruction {
        evaluate(): bool;
        simplify(): bool;
        getEvalValue(): any;
        isConst(): bool;
        getType(): IAFXVariableTypeInstruction;
        clone(pRelationMap?: IAFXInstructionMap): IAFXExprInstruction;
    }
    interface IAFXInitExprInstruction extends IAFXExprInstruction {
        optimizeForVariableType(pType: IAFXVariableTypeInstruction): bool;
    }
    interface IAFXIdExprInstruction extends IAFXExprInstruction {
        clone(pRelationMap?: IAFXInstructionMap): IAFXIdExprInstruction;
    }
    interface IAFXLiteralInstruction extends IAFXExprInstruction {
        setValue(pValue: any): void;
        clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }
    interface IAFXAnnotationInstruction extends IAFXInstruction {
    }
    interface IAFXStmtInstruction extends IAFXInstruction, IAFXAnalyzedInstruction {
    }
    interface IAFXPassInstruction extends IAFXDeclInstruction {
        _addFoundFunction(pNode: IParseNode, pShader: IAFXFunctionDeclInstruction, eType: EFunctionType): void;
        _getFoundedFunction(pNode: IParseNode): IAFXFunctionDeclInstruction;
        _getFoundedFunctionType(pNode: IParseNode): EFunctionType;
        _setParseNode(pNode: IParseNode): void;
        _getParseNode(): IParseNode;
        _markAsComplex(isComplex: bool): void;
        _addCodeFragment(sCode: string): void;
        _getSharedVariableMapV(): IAFXVariableDeclMap;
        _getGlobalVariableMapV(): IAFXVariableDeclMap;
        _getUniformVariableMapV(): IAFXVariableDeclMap;
        _getForeignVariableMapV(): IAFXVariableDeclMap;
        _getTextureVariableMapV(): IAFXVariableDeclMap;
        _getUsedComplexTypeMapV(): IAFXTypeMap;
        _getSharedVariableMapP(): IAFXVariableDeclMap;
        _getGlobalVariableMapP(): IAFXVariableDeclMap;
        _getUniformVariableMapP(): IAFXVariableDeclMap;
        _getForeignVariableMapP(): IAFXVariableDeclMap;
        _getTextureVariableMapP(): IAFXVariableDeclMap;
        _getUsedComplexTypeMapP(): IAFXTypeMap;
        _getFullUniformMap(): IAFXVariableDeclMap;
        _getFullForeignMap(): IAFXVariableDeclMap;
        _getFullTextureMap(): IAFXVariableDeclMap;
        getVertexShader(): IAFXFunctionDeclInstruction;
        getPixelShader(): IAFXFunctionDeclInstruction;
        addShader(pShader: IAFXFunctionDeclInstruction): void;
        setState(sType: string, sValue: string): void;
        finalizePass(): void;
        isComplexPass(): bool;
        evaluate(pEngineStates: any, pForeigns: any, pUniforms: any): bool;
    }
    interface IAFXTechniqueInstruction extends IAFXDeclInstruction {
        setName(sName: string, isComplexName: bool): void;
        getName(): string;
        hasComplexName(): bool;
        addPass(pPass: IAFXPassInstruction): void;
        getPassList(): IAFXPassInstruction[];
        getPass(iPass: number): IAFXPassInstruction;
        totalOwnPasses(): number;
        totalPasses(): number;
        getSharedVariablesForVertex(): IAFXVariableDeclInstruction[];
        getSharedVariablesForPixel(): IAFXVariableDeclInstruction[];
        addComponent(pComponent: IAFXComponent, iShift: number): void;
        getComponentList(): IAFXComponent[];
        getComponentListShift(): number[];
        getFullComponentList(): IAFXComponent[];
        getFullComponentShiftList(): number[];
        checkForCorrectImports(): bool;
        finalizeTechnique(sProvideNameSpace: string, pGloabalComponentList: IAFXComponent[], pGloabalComponentShiftList: number[]): void;
    }
}
module akra {
    interface IAFXComponentMap {
        [index: number]: IAFXComponent;
        [index: string]: IAFXComponent;
    }
    interface IAFXComponent extends IResourcePoolItem {
        create(): void;
        getTechnique(): IAFXTechniqueInstruction;
        setTechnique(pTechnique: IAFXTechniqueInstruction): void;
        getName(): string;
        getTotalPasses(): number;
        getHash(iShift: number, iPass: number): string;
    }
}
module akra {
    interface IAFXComponent {
    }
    interface IEffect extends IResourcePoolItem {
        totalComponents: number;
        totalPasses: number;
        isEqual(pEffect: IEffect): bool;
        isReplicated(): bool;
        isMixid(): bool;
        isParameterUsed(pParam: any, iPass?: number): bool;
        replicable(bValue: bool): void;
        miscible(bValue: bool): void;
        addComponent(iComponentHandle: number, iShift?: number, iPass?: number, isSet?: bool): bool;
        addComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number, isSet?: bool): bool;
        addComponent(sComponent: string, iShift?: number, iPass?: number, isSet?: bool): bool;
        delComponent(iComponentHandle: number, iShift?: number, iPass?: number): bool;
        delComponent(sComponent: string, iShift?: number, iPass?: number): bool;
        delComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number): bool;
        activate(iShift?: number): bool;
        deactivate(): bool;
        findParameter(pParam: any, iPass?: number): any;
    }
}
module akra {
    interface IHardwareObject {
    }
    interface IRenderResource extends IResourcePoolItem {
    }
}
module akra {
    enum EPixelFormats {
        UNKNOWN,
        L8,
        BYTE_L,
        L16,
        SHORT_L,
        A8,
        BYTE_A,
        A4L4,
        BYTE_LA,
        R5G6B5,
        B5G6R5,
        R3G3B2,
        A4R4G4B4,
        A1R5G5B5,
        R8G8B8,
        B8G8R8,
        A8R8G8B8,
        A8B8G8R8,
        B8G8R8A8,
        R8G8B8A8,
        X8R8G8B8,
        X8B8G8R8,
        BYTE_RGB,
        BYTE_BGR,
        BYTE_BGRA,
        BYTE_RGBA,
        BYTE_ABGR,
        BYTE_ARGB,
        A2R10G10B10,
        A2B10G10R10,
        DXT1,
        DXT2,
        DXT3,
        DXT4,
        DXT5,
        FLOAT16_R,
        FLOAT16_RGB,
        FLOAT16_RGBA,
        FLOAT32_R,
        FLOAT32_RGB,
        FLOAT32_RGBA,
        FLOAT16_GR,
        FLOAT32_GR,
        FLOAT32_DEPTH,
        DEPTH8,
        BYTE_DEPTH,
        DEPTH16,
        SHORT_DEPTH,
        DEPTH32,
        DEPTH24STENCIL8,
        SHORT_RGBA,
        SHORT_GR,
        SHORT_RGB,
        PVRTC_RGB2,
        PVRTC_RGBA2,
        PVRTC_RGB4,
        PVRTC_RGBA4,
        R8,
        RG8,
        TOTAL,
    }
    interface PixelFormatList {
        [index: number]: EPixelFormats;
    }
    /**
    * Flags defining some on/off properties of pixel formats
    */
    enum EPixelFormatFlags {
        HASALPHA,
        COMPRESSED,
        FLOAT,
        DEPTH,
        NATIVEENDIAN,
        LUMINANCE,
        STENCIL,
    }
    /** Pixel component format */
    enum EPixelComponentTypes {
        BYTE,
        SHORT,
        INT,
        FLOAT16,
        FLOAT32,
        COUNT,
    }
    enum EFilters {
        NEAREST,
        LINEAR,
        BILINEAR,
        BOX,
        TRIANGLE,
        BICUBIC,
    }
}
module akra {
    interface IBuffer {
        length: number;
        byteLength: number;
    }
}
module akra {
    enum EHardwareBufferFlags {
        STATIC,
        DYNAMIC,
        STREAM,
        READABLE,
        BACKUP_COPY,
        /** indicate, that buffer does not use GPU memory or other specific memory. */
        SOFTWARE,
        /** Indicate, tha buffer uses specific data aligment */
        ALIGNMENT,
        /** Indicates that the application will be refilling the contents
        of the buffer regularly (not just updating, but generating the
        contents from scratch), and therefore does not mind if the contents
        of the buffer are lost somehow and need to be recreated. This
        allows and additional level of optimisation on the buffer.
        This option only really makes sense when combined with
        DYNAMIC and without READING.
        */
        DISCARDABLE,
        STATIC_READABLE,
        DYNAMIC_DISCARDABLE,
    }
    enum ELockFlags {
        READ,
        WRITE,
        DISCARD,
        NO_OVERWRITE,
        NORMAL,
    }
    interface IHardwareBuffer extends IBuffer {
        clone(pSrc: IHardwareBuffer): bool;
        isValid(): bool;
        isDynamic(): bool;
        isStatic(): bool;
        isStream(): bool;
        isReadable(): bool;
        isBackupPresent(): bool;
        isSoftware(): bool;
        isAligned(): bool;
        isLocked(): bool;
        getFlags(): number;
        readData(ppDest: ArrayBufferView): bool;
        readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        copyData(pSrcBuffer: IHardwareBuffer, iSrcOffset: number, iDstOffset: number, iSize: number, bDiscardWholeBuffer?: bool): bool;
        create(iSize: number, iFlags?: number): bool;
        destroy(): void;
        resize(iSize: number): bool;
        lock(iLockFlags: number): any;
        lock(iOffset: number, iSize: number, iLockFlags?: number): any;
        unlock(): void;
        restoreFromBackup(): bool;
    }
}
module akra {
    interface IRenderTarget {
    }
    interface EPixelFormats {
    }
    interface IBox {
    }
    interface IPixelBuffer extends IHardwareBuffer {
        width: number;
        height: number;
        depth: number;
        format: EPixelFormats;
        create(iFlags: number): bool;
        create(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats, iFlags: number): bool;
        blit(pSource: IPixelBuffer, pSrcBox: IBox, pDestBox: IBox): bool;
        blit(pSource: IPixelBuffer);
        blitFromMemory(pSource: IPixelBox): bool;
        blitFromMemory(pSource: IPixelBox, pDestBox?: IBox): bool;
        blitToMemory(pDest: IPixelBox): bool;
        blitToMemory(pSrcBox: IBox, pDest: IPixelBox): bool;
        getRenderTarget(): IRenderTarget;
        lock(iLockFlags: number): any;
        lock(iOffset: number, iSize: number, iLockFlags?: number): any;
        lock(pLockBox: IBox, iLockFlags?: number): IPixelBox;
        _clearRTT(iZOffset: number): void;
        reset(): void;
        reset(iSize: number): void;
        reset(iWidth: number, iHeight: number): void;
    }
}
module akra {
    interface IImg {
    }
    enum ETextureFlags {
        STATIC,
        DYNAMIC,
        READEBLE,
        DYNAMIC_DISCARDABLE,
        AUTOMIPMAP,
        RENDERTARGET,
        DEFAULT,
    }
    enum ETextureFilters {
        NEAREST,
        LINEAR,
        NEAREST_MIPMAP_NEAREST,
        LINEAR_MIPMAP_NEAREST,
        NEAREST_MIPMAP_LINEAR,
        LINEAR_MIPMAP_LINEAR,
    }
    enum ETextureWrapModes {
        REPEAT,
        CLAMP_TO_EDGE,
        MIRRORED_REPEAT,
    }
    enum ETextureParameters {
        MAG_FILTER,
        MIN_FILTER,
        WRAP_S,
        WRAP_T,
    }
    enum ETextureTypes {
        TEXTURE_2D,
        TEXTURE_CUBE_MAP,
    }
    enum ECubeFace {
        POSITIVE_X,
        NEGATIVE_X,
        POSITIVE_Y,
        NEGATIVE_Y,
        POSITIVE_Z,
        NEGATIVE_Z,
    }
    enum ETextureCubeFlags {
        POSITIVE_X,
        NEGATIVE_X,
        POSITIVE_Y,
        NEGATIVE_Y,
        POSITIVE_Z,
        NEGATIVE_Z,
    }
    enum ETextureUnits {
        TEXTURE0,
    }
    interface ITexture extends IRenderResource {
        width: number;
        height: number;
        depth: number;
        format: EPixelFormats;
        mipLevels: number;
        textureType: ETextureTypes;
        setFlags(iTextureFlag: number): void;
        getFlags(): number;
        calculateSize(): number;
        getNumFaces(): number;
        getSize(): number;
        isTexture2D(): bool;
        isTextureCube(): bool;
        isCompressed(): bool;
        isValid(): bool;
        create(iWidth: number, iHeight: number, iDepth: number, cFillColor?: IColor, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        create(iWidth: number, iHeight: number, iDepth: number, pPixels?: Array, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        create(iWidth: number, iHeight: number, iDepth: number, pPixels?: ArrayBufferView, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        getBuffer(iFace?: number, iMipmap?: number): IPixelBuffer;
        setFilter(eParam: ETextureParameters, eValue: ETextureFilters): bool;
        setWrapMode(eParam: ETextureParameters, eValue: ETextureWrapModes): bool;
        getFilter(eParam: ETextureParameters): ETextureFilters;
        getWrapMode(eParam: ETextureParameters): ETextureWrapModes;
        loadRawData(pData: ArrayBufferView, iWidth: number, iHeight: number, eFormat: EPixelFormats): bool;
        loadImage(pImage: IImg): bool;
        loadImages(pImages: IImg[]): bool;
        convertToImage(pDestImage: IImg, bIncludeMipMaps: bool): void;
        copyToTexture(pTarget: ITexture): void;
        createInternalTexture(cFillColor?: IColor): bool;
        freeInternalTexture(): bool;
        reset(): void;
        reset(iSize: number): void;
        reset(iWidth: number, iHeight: number): void;
    }
}
module akra {
    interface IAFXSamplerStateMap {
        [index: string]: IAFXSamplerState;
        [index: number]: IAFXSamplerState;
    }
    interface IAFXSamplerStateListMap {
        [index: string]: IAFXSamplerState[];
        [index: number]: IAFXSamplerState[];
    }
    interface IAFXSamplerState {
        textureName?: string;
        texture: ITexture;
        wrap_s?: ETextureWrapModes;
        wrap_t?: ETextureWrapModes;
        mag_filter?: ETextureFilters;
        min_filter?: ETextureFilters;
    }
}
module akra {
    interface IMaterial {
    }
    interface ITexture {
    }
    enum ESurfaceMaterialTextures {
        TEXTURE0,
        TEXTURE1,
        TEXTURE2,
        TEXTURE3,
        TEXTURE4,
        TEXTURE5,
        TEXTURE6,
        TEXTURE7,
        TEXTURE8,
        TEXTURE9,
        TEXTURE10,
        TEXTURE11,
        TEXTURE12,
        TEXTURE13,
        TEXTURE14,
        TEXTURE15,
        DIFFUSE,
        AMBIENT,
        SPECULAR,
        EMISSIVE,
        NORMAL,
        EMISSION,
    }
    interface ISurfaceMaterial extends IResourcePoolItem {
        totalTextures: number;
        material: IMaterial;
        textureFlags: number;
        textureMatrixFlags: number;
        setTexture(iIndex: number, sTexture: string, iTexcoord?: number): bool;
        setTexture(iIndex: number, iTextureHandle: number, iTexcoord?: number): bool;
        setTexture(iIndex: number, pTexture: ITexture, iTexcoord?: number): bool;
        setTextureMatrix(iIndex: number, m4fValue: IMat4): bool;
        setMaterial(pMaterial: IMaterial): void;
        isEqual(pSurface: ISurfaceMaterial): bool;
        texture(iSlot: number): ITexture;
        texcoord(iSlot: number): number;
        textureMatrix(iSlot: number): IMat4;
        _getHash(): string;
    }
}
module akra {
    enum EAFXShaderVariableType {
        k_NotVar,
        k_Texture,
        k_Float,
        k_Int,
        k_Bool,
        k_Float2,
        k_Int2,
        k_Bool2,
        k_Float3,
        k_Int3,
        k_Bool3,
        k_Float4,
        k_Int4,
        k_Bool4,
        k_Float2x2,
        k_Float3x3,
        k_Float4x4,
        k_Sampler2D,
        k_SamplerCUBE,
        k_SamplerVertexTexture,
        k_CustomSystem,
        k_Complex,
    }
    interface IAFXPassInputBlend {
        samplers: IAFXSamplerStateMap;
        samplerArrays: IAFXSamplerStateListMap;
        samplerArrayLength: IntMap;
        uniforms: any;
        foreigns: any;
        textures: any;
        samplerKeys: string[];
        samplerArrayKeys: string[];
        uniformKeys: string[];
        foreignKeys: string[];
        textureKeys: string[];
        hasTexture(sName: string): bool;
        hasUniform(sName: string): bool;
        setUniform(sName: string, pValue: any): void;
        setForeign(sName: string, pValue: any): void;
        setTexture(sName: string, pValue: any): void;
        setSampler(sName: string, pState: IAFXSamplerState): void;
        setSamplerArray(sName: string, pSamplerArray: IAFXSamplerState[]): void;
        setSamplerTexture(sName: string, sTexture: string): void;
        setSamplerTexture(sName: string, pTexture: ITexture): void;
        setStruct(sName: string, pValue: any): void;
        setSurfaceMaterial(pMaterial: ISurfaceMaterial): void;
        _getSamplerState(sName: string): IAFXSamplerState;
        _getSamplerTexture(sName: string): ITexture;
        _getTextureForSamplerState(pSamplerState: IAFXSamplerState): ITexture;
        _getUnifromLength(sName: string): number;
        _getUniformType(sName: string): EAFXShaderVariableType;
        _release(): void;
        _isNeedToCalcBlend(): bool;
        _isNeedToCalcShader(): bool;
        _getLastPassBlendId(): number;
        _getLastShaderId(): number;
        _setPassBlendId(id: number): void;
        _setShaderId(id: number): void;
        _getAFXUniformVar(sName: string): IAFXVariableDeclInstruction;
    }
}
module akra {
    interface IAFXComponentBlendMap {
        [index: number]: IAFXComponentBlend;
        [index: string]: IAFXComponentBlend;
    }
    interface IAFXComponentPassInputBlend {
        uniformNameToReal: StringMap;
        uniformByRealName: IAFXVariableDeclMap;
        uniformDefaultValue: any;
        textureNameToReal: StringMap;
        textureByRealName: IAFXVariableDeclMap;
        foreignByName: IAFXVariableDeclMap;
        uniformNameList: string[];
        uniformRealNameList: string[];
        textureNameList: string[];
        textureRealNameList: string[];
        foreignNameList: string[];
        addDataFromPass(pPass: IAFXPassInstruction): void;
        finalizeInput(): void;
        getPassInput(): IAFXPassInputBlend;
        releasePassInput(pPassInput: IAFXPassInputBlend): void;
    }
    interface IAFXComponentBlend extends IUnique {
        isReadyToUse(): bool;
        isEmpty(): bool;
        getComponentCount(): number;
        getTotalPasses(): number;
        getHash(): string;
        containComponentWithShift(pComponent: IAFXComponent, iShift: number, iPass: number);
        containComponentHash(sComponentHash: string): bool;
        addComponent(pComponent: IAFXComponent, iShift: number, iPass: number): void;
        removeComponent(pComponent: IAFXComponent, iShift: number, iPass: number): void;
        finalizeBlend(): bool;
        getPassInputForPass(iPass: number): IAFXPassInputBlend;
        getPassListAtPass(iPass: number): IAFXPassInstruction[];
        clone(): IAFXComponentBlend;
        _getComponentList(): IAFXComponent[];
        _getComponentShiftList(): number[];
        _getComponentPassIdList(): number[];
        _setDataForClone(pComponentList: IAFXComponent[], pComponentShiftList: number[], pComponentPassNumnerList: number[], pComponentHashMap: BoolMap, nShiftMin: number, nShiftMax: number): void;
    }
}
module akra {
    interface IReferenceCounter {
    }
    interface IVertexData {
    }
    interface IDataMapper {
    }
    interface IIndexData {
    }
    enum EDataFlowTypes {
        MAPPABLE,
        UNMAPPABLE,
    }
    interface IDataFlow {
        flow: number;
        data: IVertexData;
        type: EDataFlowTypes;
        mapper: IDataMapper;
    }
    interface IDataMapper {
        data: IVertexData;
        semantics: string;
        addition: number;
    }
    interface IBufferMap extends IReferenceCounter {
        primType: EPrimitiveTypes;
        index: IIndexData;
        length: number;
        /** writeonly */
        _length: number;
        /** Number of primitives. */
        primCount: number;
        /** Maximum flow available in buffer map. */
        limit: number;
        /** Start index for drawning. */
        startIndex: number;
        /** Number of completed flows. */
        size: number;
        /** Completed flows. */
        flows: IDataFlow[];
        /**
        * Mappers.
        * @private
        */
        mappers: IDataMapper[];
        /**
        * Offset in bytes for drawing with global idnex.
        * @deprecated
        */
        offset: number;
        /**
        * Find flow by semantics in.
        * @param sSemantics VertexElement usage or semantics.
        * @param {bool=} bComplete Find only in completed flows. Default is TRUE.
        */
        getFlow(sSemantics: string, bComplete?: bool): IDataFlow;
        getFlow(iFlow: number, bComplete?: bool): IDataFlow;
        findFlow(sSemantics: string): IDataFlow;
        reset(): void;
        /**
        * Add data to flow.
        */
        flow(pVertexData: IVertexData): number;
        flow(iFlow: number, pVertexData: IVertexData): number;
        /**
        * Add index for flow.
        */
        mapping(iFlow: number, pMap: IVertexData, sSemantics: string, iAddition?: number): bool;
        /**
        * Check, Is pData already used as flow or mapper.
        */
        checkData(pData: IVertexData): bool;
        /**
        * Recals all statistics in buffer map.
        */
        update(): bool;
        clone(bWithMapping?: bool): IBufferMap;
        /**
        * Draw buffer map.
        */
        _draw(): void;
        toString(bListAll?: bool): string;
    }
}
module akra {
    interface IAFXComposer {
        getComponentByName(sComponentName: string): IAFXComponent;
        getEngine(): IEngine;
        getComponentCountForEffect(pEffectResource: IEffect): number;
        getTotalPassesForEffect(pEffectResource: IEffect): number;
        addComponentToEffect(pEffectResource: IEffect, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        removeComponentFromEffect(pEffectResource: IEffect, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        activateEffectResource(pEffectResource: IEffect, iShift: number): bool;
        deactivateEffectResource(pEffectResource: IEffect): bool;
        getTotalPassesForTechnique(pRenderTechnique: IRenderTechnique): number;
        addOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        removeOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        hasOwnComponentInTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        prepareTechniqueBlend(pRenderTechnique: IRenderTechnique): bool;
        markTechniqueAsNeedUpdate(pRenderTechnique: IRenderTechnique): void;
        getPassInputBlend(pRenderTechnique: IRenderTechnique, iPass: number): IAFXPassInputBlend;
        applyBufferMap(pBufferMap: IBufferMap): bool;
        applySurfaceMaterial(pSurfaceMaterial: ISurfaceMaterial): bool;
        _setCurrentSceneObject(pSceneObject: ISceneObject): void;
        _setCurrentViewport(pViewport: IViewport): void;
        _setCurrentRenderableObject(pRenderable: IRenderableObject): void;
        _getCurrentSceneObject(): ISceneObject;
        _getCurrentViewport(): IViewport;
        _getCurrentRenderableObject(): IRenderableObject;
        renderTechniquePass(pRenderTechnique: IRenderTechnique, iPass: number): void;
        _loadEffectFromSyntaxTree(pTree: IParseTree, sFileName: string): bool;
        _loadEffectFromBinary(pData: Uint8Array, sFileName: string): bool;
    }
}
module akra {
    interface IEngine {
    }
    interface IResourceCode {
    }
    interface IResourcePoolItem {
    }
    interface IResourcePoolManager {
    }
    interface IResourcePool extends IEventProvider {
        iFourcc: number;
        manager: IResourcePoolManager;
        /** Добавление данного пула в менеджер ресурсво по его коду */
        registerResourcePool(pCode: IResourceCode): void;
        /** Удаление данного пула в менеджер ресурсво по его коду */
        unregisterResourcePool(): void;
        /** По имени ресурса возвращает его хендл */
        findResourceHandle(sName: string): number;
        /** По хендлу ресурва возвращает его имя */
        findResourceName(iHandle: number): string;
        /** set resource name */
        setResourceName(iHandle: number, sName: string): void;
        initialize(iGrowSize: number): void;
        destroy(): void;
        clean(): void;
        destroyAll(): void;
        restoreAll(): void;
        disableAll(): void;
        isInitialized(): bool;
        createResource(sResourceName: string): IResourcePoolItem;
        loadResource(sResourceName: string): IResourcePoolItem;
        saveResource(pResource: IResourcePoolItem): bool;
        destroyResource(pResource: IResourcePoolItem): void;
        findResource(sName: string): IResourcePoolItem;
        getResource(iHandle: number): IResourcePoolItem;
        getResources(): IResourcePoolItem[];
        createdResource(pResource: IResourcePoolItem): void;
    }
}
module akra {
    interface IResourcePoolItem {
    }
    interface IResourceWatcherFunc {
        (nLoaded?: number, nTotal?: number, pTarget?: IResourcePoolItem): void;
    }
}
module akra {
    interface ISkeleton {
    }
    interface IModel {
    }
    interface IEngine {
    }
    interface IColladaAsset {
    }
    interface IMesh {
    }
    interface IAnimationController {
    }
    interface ICollada extends IModel {
        getAsset(): IColladaAsset;
        getFilename(): string;
        getBasename(): string;
        isVisualSceneLoaded(): bool;
        isAnimationLoaded(): bool;
        attachToScene(pNode: ISceneNode, pController?: IAnimationController): IModelEntry;
        attachToScene(pScene: IScene3d, pController?: IAnimationController): IModelEntry;
    }
    interface IColladaCache {
        meshMap: IMeshMap;
        sharedBuffer: IRenderDataCollection;
    }
    interface IColladaAnimationLoadOptions {
        pose?: bool;
    }
    interface IColladaImageLoadOptions {
        flipY?: bool;
    }
    interface IColladaLoadOptions {
        /** Add nodes, that visualize joints in animated models. */
        drawJoints?: bool;
        /** Convert all meshed to wireframe. */
        wireframe?: bool;
        /**
        * Use common buffer for all data
        * @deprecated
        */
        sharedBuffer?: bool;
        animation?: IColladaAnimationLoadOptions;
        scene?: bool;
        extractPoses?: bool;
        skeletons?: ISkeleton[];
        images?: IColladaImageLoadOptions;
    }
    interface IXMLExplorer {
        (pXML: Element, sName?: string): void;
    }
    interface IColladaTarget {
        value: number;
        object?: IColladaEntry;
        source?: IColladaEntry;
    }
    interface IColladaEntry {
        id?: string;
        sid?: string;
        name?: string;
    }
    interface IColladaEntryMap {
        [id: string]: IColladaEntry;
    }
    interface IColladaLibrary extends IColladaEntry {
        [element: string]: IColladaEntryMap;
    }
    interface IColladaEffectLibrary extends IColladaLibrary {
        effect: {
            [id: string]: IColladaEffect;
        };
    }
    interface IColladaEntryLoader {
        (pXML: Element): IColladaEntry;
    }
    interface IColladaUnknownFormat {
        name: string[];
        type: string[];
    }
    /** Stride for collada formats, discretized at 32 bits. */
    interface IColladaFormatStrideTable {
        [format: string]: number;
    }
    interface IColladaConverter {
        (data: string, output: any[], from?: number): number;
    }
    interface IColladaConvertionTableRow {
        type: any;
        converter: IColladaConverter;
    }
    interface IColladaConvertionTable {
        [type: string]: IColladaConvertionTableRow;
    }
    interface IColladaLinkMap {
        [link: string]: any;
    }
    interface IColladaLibraryMap {
        [library: string]: IColladaLibrary;
    }
    interface IColladaLibraryTemplate {
        /** library tag name.*/
        lib: string;
        /** element in liibrary. */
        element: string;
        /** loader function */
        loader: string;
    }
    interface IColladaArray extends IColladaEntry {
        [i: number]: any;
    }
    interface IColladaUnit extends IColladaEntry {
        name: string;
        meter: number;
    }
    interface IColladaContributor extends IColladaEntry {
        author?: string;
        authoringTool?: string;
        comments?: string;
        copyright?: string;
        sourceData?: any;
    }
    interface IColladaAsset extends IColladaEntry {
        unit: IColladaUnit;
        upAxis: string;
        title?: string;
        subject?: string;
        created: string;
        modified: string;
        keywords?: string[];
        contributor?: IColladaContributor;
    }
    interface IColladaInstance extends IColladaEntry {
        url?: string;
    }
    interface IColladaAnnotate extends IColladaEntry {
        name: string;
        value: string;
    }
    interface IColladaNewParam extends IColladaEntry {
        sid: string;
        annotate: IColladaAnnotate;
        semantics: string;
        modifier: string;
        value: any;
        type: string;
    }
    interface IColladaNewParamMap {
        [sid: string]: IColladaNewParam;
    }
    interface IColladaParam extends IColladaEntry {
        name: string;
        type: string;
    }
    interface IColladaAccessor extends IColladaEntry {
        source?: string;
        data: IColladaArray;
        count: number;
        stride: number;
        params: IColladaParam[];
    }
    interface IColladaTechniqueCommon extends IColladaEntry {
        accessor: IColladaAccessor;
    }
    interface IColladaSource extends IColladaEntry {
        name: string;
        array: Object;
        techniqueCommon: IColladaTechniqueCommon;
    }
    interface IColladaInput extends IColladaEntry {
        semantics: string;
        source: IColladaSource;
        offset: number;
        set: string;
        array?: any[];
        accessor?: IColladaAccessor;
    }
    interface IColladaTransform extends IColladaEntry {
        transform: string;
        value: any;
    }
    interface IColladaRotate extends IColladaTransform {
        value: IVec4;
    }
    interface IColladaTranslate extends IColladaTransform {
        value: IVec3;
    }
    interface IColladaScale extends IColladaTransform {
        value: IVec3;
    }
    interface IColladaMatrix extends IColladaTransform {
        value: IMat4;
    }
    interface IColladaVertices extends IColladaEntry {
        inputs: {
            [semantics: string]: IColladaInput;
        };
    }
    interface IColladaJoints extends IColladaEntry {
        inputs: {
            [input: string]: IColladaInput;
        };
    }
    interface IColladaPolygons extends IColladaEntry {
        name: string;
        inputs: IColladaInput[];
        p: number[];
        material: string;
        type?: EPrimitiveTypes;
        count: number;
    }
    interface IColladaMesh extends IColladaEntry {
        sources: IColladaSource[];
        polygons: IColladaPolygons[];
    }
    interface IColladaConvexMesh extends IColladaEntry {
    }
    interface IColladaSpline extends IColladaEntry {
    }
    interface IColladaGeometrie extends IColladaEntry {
        name: string;
        mesh: IColladaMesh;
        convexMesh: IColladaConvexMesh;
        spline: IColladaSpline;
    }
    interface IColladaMorph extends IColladaEntry {
    }
    interface IColladaVertexWeights extends IColladaEntry {
        count: number;
        inputs: IColladaInput[];
        weightInput: IColladaInput;
        vcount: number[];
        v: number[];
    }
    interface IColladaSkin extends IColladaEntry {
        shapeMatrix: IMat4;
        sources: IColladaSource[];
        geometry: IColladaGeometrie;
        joints: IColladaJoints;
        vertexWeights: IColladaVertexWeights;
    }
    interface IColladaController extends IColladaEntry {
        name: string;
        skin: IColladaSkin;
        morph: IColladaMorph;
    }
    interface IColladaImage extends IColladaEntry {
        name: string;
        data: any;
        path: string;
        format?: string;
        depth?: number;
        height?: number;
        width?: number;
    }
    interface IColladaSurface extends IColladaEntry {
        initFrom: string;
    }
    interface IColladaSampler2D extends IColladaEntry {
        source: string;
        wrapS: string;
        wrapT: string;
        minFilter: string;
        mipFilter: string;
        magFilter: string;
    }
    interface IColladaTexture extends IColladaEntry {
        texcoord: string;
        sampler: IColladaNewParam;
        surface: IColladaNewParam;
        image: IColladaImage;
    }
    interface IColladaInstanceEffect extends IColladaInstance {
        parameters: Object;
        techniqueHint: StringMap;
        effect: IColladaEffect;
    }
    interface IColladaPhong extends IColladaEntry {
        diffuse: IColorValue;
        specular: IColorValue;
        ambient: IColorValue;
        emissive: IColorValue;
        shininess: number;
        reflective: IColorValue;
        reflectivity: number;
        transparent: IColorValue;
        transparency: number;
        indexOfRefraction: number;
        textures?: {
            diffuse: IColladaTexture;
            specular: IColladaTexture;
            ambient: IColladaTexture;
            emissive: IColladaTexture;
            normal: IColladaTexture;
        };
    }
    interface IColladaEffectTechnique extends IColladaEntry {
        sid: string;
        type: string;
        value: IColladaEntry;
    }
    interface IColladaProfileCommon extends IColladaEntry {
        technique: IColladaEffectTechnique;
        newParam: IColladaNewParamMap;
    }
    interface IColladaEffect extends IColladaEntry {
        profileCommon: IColladaProfileCommon;
    }
    interface IColladaMaterial extends IColladaEntry {
        name: string;
        instanceEffect: IColladaInstanceEffect;
    }
    interface IColladaTechniqueValue extends IColladaEntry {
    }
    interface IColladaBindVertexInput extends IColladaEntry {
        semantics: string;
        inputSemantic: string;
        inputSet: number;
    }
    interface IColladaBindVertexInputMap {
        [semantics: string]: IColladaBindVertexInput;
    }
    interface IColladaInstanceMaterial extends IColladaInstance {
        symbol: string;
        target: string;
        vertexInput: IColladaBindVertexInputMap;
        material: IColladaMaterial;
    }
    interface IColladaBindMaterial extends IColladaEntry {
        [symbol: string]: IColladaInstanceMaterial;
    }
    interface IColladaInstanceGeometry extends IColladaInstance {
        geometry: IColladaGeometrie;
        material: IColladaBindMaterial;
    }
    interface IColladaInstanceController extends IColladaInstance {
        controller: IColladaController;
        material: IColladaBindMaterial;
        skeletons: string[];
    }
    interface IColladaNode extends IColladaEntry {
        sid: string;
        name: string;
        type: string;
        layer: string;
        transform: IMat4;
        geometry: IColladaInstanceGeometry[];
        controller: IColladaInstanceController[];
        childNodes: IColladaNode[];
        depth: number;
        transforms: IColladaTransform[];
        constructedNode: ISceneNode;
    }
    interface IColladaVisualScene extends IColladaEntry {
        name: string;
        nodes: IColladaNode[];
    }
    interface IColladaAnimationSampler extends IColladaEntry {
        inputs: {
            [semantics: string]: IColladaInput;
        };
    }
    interface IColladaAnimationChannel extends IColladaEntry {
        target: IColladaTarget;
        sampler: IColladaAnimationSampler;
    }
    interface IColladaAnimation extends IColladaEntry {
        name: string;
        sources: IColladaSource[];
        samplers: IColladaAnimationSampler[];
        channels: IColladaAnimationChannel[];
        animations?: IColladaAnimation[];
    }
    interface IColladaScene {
    }
    interface IColladaDocument {
        asset?: IColladaAsset;
        libEffects?: IColladaEffectLibrary;
        libMaterials?: IColladaLibrary;
        libGeometries?: IColladaLibrary;
        libVisualScenes?: IColladaLibrary;
        libAnimations?: IColladaLibrary;
        scene?: IColladaScene;
    }
    interface IColladaAnimationClip extends IColladaEntry {
        name?: string;
        start: number;
        end: number;
    }
}
module akra {
    interface IAnimationBase {
    }
    interface IAnimationBaseController {
    }
    interface IColladaLoadOptions {
    }
    interface ISceneNode {
    }
    interface IScene3d {
    }
    interface ISkeleton {
    }
    interface IMesh {
    }
    interface IModel extends IResourcePoolItem {
        loadResource(sFilename?: string, pOptions?: IColladaLoadOptions): bool;
        attachToScene(pNode: ISceneNode): IModelEntry;
        attachToScene(pScene: IScene3d): IModelEntry;
    }
}
module akra {
    enum EResourceCodes {
        INVALID_CODE,
    }
    interface IResourceCode {
        family: number;
        type: number;
        /** Пеерводит текущее состояние идентифиакора в невалидное */
        setInvalid(): void;
        /** operator "<" */
        less(pSrc: IResourceCode): bool;
        /** operator = */
        eq(pSrc: IResourceCode): IResourceCode;
        valueOf(): number;
        toNumber(): number;
    }
}
module akra.core.pool {
    class ResourceCode implements IResourceCode {
        private iValue;
        public family : number;
        public type : number;
        constructor();
        constructor(iCode: number);
        constructor(eCode: EResourceCodes);
        constructor(pCode: IResourceCode);
        constructor(iFamily: number, iType: number);
        public setInvalid(): void;
        public less(pSrc: IResourceCode): bool;
        public eq(pSrc: IResourceCode): IResourceCode;
        public valueOf(): number;
        public toNumber(): number;
    }
}
module akra {
    interface IEngine {
    }
    interface IResourcePoolManager {
    }
    interface IDataPool {
        manager: IResourcePoolManager;
        /** Инициализация пула данных */
        initialize(iGrowSize: number): void;
        /** Инициализирован ли пул */
        isInitialized(): bool;
        /** Очистка пула и пометка о том что он больш не инициализирован */
        destroy(): void;
        /** Высвобождаем элемент в пуле по его номеру */
        release(iHandle: number): void;
        clear(): void;
        /** Добавляет новый элемент в пул */
        add(pMembers: IResourcePoolItem): number;
        /** Цикл по всем объектам с приминением к ним функции, как fFunction(текущий пул данных, объект к торому применяется); */
        forEach(fFunction: (pPool: IDataPool, iHandle: number, pMember: IResourcePoolItem) => void): void;
        /** Ищет первый свободный элемент в пуле */
        nextHandle(): number;
        /** Проверяется используется лм этот элемент */
        isHandleValid(iHandle: number): bool;
        /** Возвратитть элемент по хендлу */
        get(iHandle: number): IResourcePoolItem;
        /** Возвратитть элемент по хендлу */
        getPtr(iHandle: number): IResourcePoolItem;
        /** Возвратитть элемент по хендлу */
        getGenericPtr(iHandle: number): IResourcePoolItem;
    }
}
module akra.util {
    class ReferenceCounter implements IReferenceCounter {
        private nReferenceCount;
        /** Выстанавливает чило ссылок  на объект в ноль */
        constructor();
        /**
        * Выстанавливает чило ссылок  на объект в ноль
        * количесвто ссылок привязаны к конкретному экземпляру, поэтому никогда не копируются
        */
        constructor(pSrc: IReferenceCounter);
        /** @inline */
        public referenceCount(): number;
        /** @inline */
        public destructor(): void;
        public release(): number;
        public addRef(): number;
        /** @inline */
        public eq(pSrc: IReferenceCounter): IReferenceCounter;
    }
}
/***********************************************
* TODO: check, if event exists on target!!!!!
*************************************************/
module akra {
    interface IEventSlot {
        target: any;
        callback: string;
        listener: Function;
    }
    interface IEventSlotListMap {
        [index: string]: IEventSlot[];
    }
    interface IEventSlotMap {
        [index: string]: IEventSlot;
    }
    interface IEventSlotTable {
        [index: number]: IEventSlotListMap;
        [index: string]: IEventSlotListMap;
    }
    interface IEventSlotList {
        [index: number]: IEventSlotMap;
        [index: string]: IEventSlotMap;
    }
    interface IEventTable {
        broadcast: IEventSlotTable;
        unicast: IEventSlotList;
        addDestination(iGuid: number, sSignal: string, pTarget: IEventProvider, sSlot: string, eType?: EEventTypes): bool;
        removeDestination(iGuid: number, sSignal: string, pTarget: IEventProvider, sSlot: string, eType?: EEventTypes): bool;
        addListener(iGuid: number, sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        removeListener(iGuid: number, sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        findUnicastList(iGuid: number): IEventSlotMap;
        findBroadcastList(iGuid: number): IEventSlotListMap;
        _sync(pTarget: IEventProvider, pFrom: IEventProvider): void;
    }
}
module akra.events {
    class EventTable implements IEventTable {
        public broadcast: IEventSlotTable;
        public unicast: IEventSlotList;
        public addDestination(iGuid: number, sSignal: string, pTarget: IEventProvider, sSlot: string, eType?: EEventTypes): bool;
        private findDestinationIndexBC(iGuid, sSignal, pTarget, sSlot);
        public removeDestination(iGuid: number, sSignal: string, pTarget: IEventProvider, sSlot: string, eType?: EEventTypes): bool;
        public addListener(iGuid: number, sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        public removeListener(iGuid: number, sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public findBroadcastList(iGuid: number): IEventSlotListMap;
        public findUnicastList(iGuid: number): IEventSlotMap;
        public _sync(pTarget: IEventProvider, pFrom: IEventProvider): void;
        private findBroadcastSignalMap(iGuid, sSignal);
    }
    class EventProvider implements IEventProvider {
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
    }
}
module akra.core.pool {
    class ResourcePool extends util.ReferenceCounter implements IResourcePool {
        private pManager;
        /** Конструктор для создания данных в пуле ресурсов */
        private tTemplate;
        private sExt;
        private pRegistrationCode;
        private pNameMap;
        private pDataPool;
        /**@inline*/ 
        public iFourcc : number;
        /**@inline*/ 
        public manager : IResourcePoolManager;
        constructor(pManager: IResourcePoolManager, tTemplate: IResourcePoolItemType);
        /** Добавление данного пула в менеджер ресурсво по его коду */
        public registerResourcePool(pCode: IResourceCode): void;
        /** Удаление данного пула в менеджер ресурсво по его коду */
        public unregisterResourcePool(): void;
        /** По имени ресурса возвращает его хендл */
        public findResourceHandle(sName: string): number;
        /**
        * Get resource name by handle.
        * @inline
        */
        public findResourceName(iHandle: number): string;
        public setResourceName(iHandle: number, sName: string): void;
        public initialize(iGrowSize: number): void;
        /** @inline */
        public destroy(): void;
        public clean(): void;
        public destroyAll(): void;
        public restoreAll(): void;
        public disableAll(): void;
        /** @inline */
        public isInitialized(): bool;
        public createResource(sResourceName: string): IResourcePoolItem;
        public loadResource(sResourceName: string): IResourcePoolItem;
        public saveResource(pResource: IResourcePoolItem): bool;
        public destroyResource(pResource: IResourcePoolItem): void;
        public findResource(sName: string): IResourcePoolItem;
        public getResource(iHandle: number): IResourcePoolItem;
        public getResources(): IResourcePoolItem[];
        private internalGetResource(iHandle);
        private internalDestroyResource(iHandle);
        private internalCreateResource(sResourceName);
        private static callbackDestroy(pPool, iHandle, pResource);
        private static callbackDisable(pPool, iHandle, pResource);
        private static callbackRestore(pPool, iHandle, pResource);
        private static callbackClean(pPool, iHandle, pResource);
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public createdResource(pResource): void;
    }
}
module akra.core.pool {
    interface IGroupNumber {
        value: number;
    }
    class PoolGroup {
        private pManager;
        /** Конструктор для создания данных в группе */
        private tTemplate;
        /** Число свободных элементов группы */
        private iTotalOpen;
        /** Первый свободный элемент группы */
        private iFirstOpen;
        /** Колмичество элементов в группе */
        private iMaxCount;
        /** Список свободных элементов группы */
        private pNextOpenList;
        /** Массив элементов группы */
        private pMemberList;
        /**@inline*/ 
        public manager : IResourcePoolManager;
        /**
        * Возвращает количесвто свободных мест в группе
        * @inline
        */
        public totalOpen : number;
        /**
        * Возвращает количесвто занятых мест в группе
        * @inline
        */
        public totalUsed : number;
        /**
        * Номер первого свободного элемента в группе
        * @inline
        */
        public firstOpen : number;
        constructor(pManager: IResourcePoolManager, tTemplate: IResourcePoolItemType, iMaxCount: number);
        /** Создание группы, создается массив элементов, инициализирется список свободный и т.д. */
        public create(): void;
        /**
        * Удаление группы: удаление массива элементов, списка совбодных элементов и т.д.
        * Выдается ошибка если группа не пуста
        * */
        public destroy(): void;
        /** Возвращает номер следующего совбодного элемента в списке, и помечает его как используемый */
        public nextMember(): number;
        /** Добавляем новый элемент в список */
        public addMember(pMember: IResourcePoolItem): number;
        /** Исключение элемента из списка по его номеру */
        public release(iIndex: number): void;
        /** Проверить свободна ли эта ячейка в группе */
        public isOpen(iIndex: number): bool;
        /** Получение элемента по его номеру */
        public member(iIndex: number): IResourcePoolItem;
        public memberPtr(iIndex: number): IResourcePoolItem;
    }
    class DataPool implements IDataPool {
        private pManager;
        private tTemplate;
        private bInitialized;
        /** Массив групп */
        private pGroupList;
        /** Общее число ячеек */
        private iTotalMembers;
        /** Количесвто свободных ячеек */
        private iTotalOpen;
        /** Количесвто элементов в группе */
        private iGroupCount;
        /**
        * Номер элемента состоит из номер группы сдвинутого на _iIndexShift
        * и номера элемента в этой группе, который можно вырезать маской _iIndexMask
        */
        private iIndexMask;
        /**
        * Номер элемента состоит из номер группы сдвинутого на _iIndexShift
        * и номера элемента в этой группе, который можно вырезать маской _iIndexMask
        */
        private iIndexShift;
        /**@inline*/ 
        public manager : IResourcePoolManager;
        constructor(pManager: IResourcePoolManager, tTemplate: IResourcePoolItemType);
        public initialize(iGrowSize: number): void;
        /** @inline */
        public isInitialized(): bool;
        public destroy(): void;
        public release(iHandle: number): void;
        public clear(): void;
        public add(pMembers: IResourcePoolItem): number;
        public forEach(fFunction: (pPool: IDataPool, iHandle: number, pMember: IResourcePoolItem) => void): void;
        public nextHandle(): number;
        public isHandleValid(iHandle: number): bool;
        public get(iHandle: number): IResourcePoolItem;
        public getPtr(iHandle: number): IResourcePoolItem;
        public getGenericPtr(iHandle: number): IResourcePoolItem;
        /**
        * @inline
        * Получение номера группы по номеру элемента
        */
        private getGroupNumber(iHandle);
        /**
        * @inline
        * Получение номера элеменат в группе по его номеру
        */
        private getItemIndex(iHandle);
        /**
        * @inline
        * Полученяи номера элеменат по его номеру группы и группе
        */
        private buildHandle(iGroup, iIndex);
        /** Добавление группы в пул */
        private addGroup();
        /** Поиск первой группы которая имеет свободную область */
        private findOpenGroup(pGroupNumber);
        /**
        * @inline
        * Возвращает группу по ее номеру
        */
        private getGroup(iIndex);
    }
}
module akra {
    interface IEffect {
    }
    interface ISurfaceMaterial {
    }
    interface IRenderMethod extends IResourcePoolItem {
        effect: IEffect;
        surfaceMaterial: ISurfaceMaterial;
        isEqual(pRenderMethod: IRenderMethod): bool;
    }
}
module akra {
    interface IResourceNotifyRoutineFunc {
        (iFlagBit?: number, iResourceFlags?: number, isSet?: bool): void;
        (eEvent?: EResourceItemEvents, iResourceFlags?: number, isSet?: bool): void;
    }
}
module akra.core.pool {
    interface ICallbackSlot {
        bState: bool;
        fn: IResourceNotifyRoutineFunc;
        pResourceItem: IResourcePoolItem;
    }
    class ResourcePoolItem extends util.ReferenceCounter implements IResourcePoolItem {
        private pResourceCode;
        private pResourcePool;
        private iResourceHandle;
        private iResourceFlags;
        private pCallbackFunctions;
        private pStateWatcher;
        private pCallbackSlots;
        /**@inline*/ 
        public resourceCode : IResourceCode;
        /**@inline*/ 
        public resourcePool : IResourcePool;
        /**@inline*/ 
        public resourceHandle : number;
        /**@inline*/ 
        public resourceFlags : number;
        /**@inline*/ 
        public alteredFlag : bool;
        /**@inline*/ 
        public manager : IResourcePoolManager;
        constructor();
        /**@inline*/ 
        public getEngine(): IEngine;
        /**@inline*/ 
        public getManager(): ResourcePoolManager;
        public createResource(): bool;
        public destroyResource(): bool;
        public disableResource(): bool;
        public restoreResource(): bool;
        public loadResource(sFilename?: string): bool;
        public saveResource(sFilename?: string): bool;
        public setChangesNotifyRoutine(fn: IResourceNotifyRoutineFunc): void;
        public delChangesNotifyRoutine(fn: IResourceNotifyRoutineFunc): void;
        public setStateWatcher(eEvent: EResourceItemEvents, fnWatcher: IResourceWatcherFunc): void;
        public sync(pResourceItem: IResourcePoolItem, eSignal: EResourceItemEvents, eSlot?: EResourceItemEvents): bool;
        public unsync(pResourceItem: IResourcePoolItem, eSignal: EResourceItemEvents, eSlot?: EResourceItemEvents): bool;
        /**@inline*/ 
        public isResourceCreated(): bool;
        /**@inline*/ 
        public isResourceLoaded(): bool;
        /**@inline*/ 
        public isResourceDisabled(): bool;
        /**@inline*/ 
        public isResourceAltered(): bool;
        public setAlteredFlag(isOn?: bool): bool;
        /**@inline*/ 
        public setResourceName(sName: string): void;
        public findResourceName(): string;
        public release(): number;
        /**@inline*/ 
        public notifyCreated(): void;
        /**@inline*/ 
        public notifyDestroyed(): void;
        /**@inline*/ 
        public notifyLoaded(): void;
        /**@inline*/ 
        public notifyUnloaded(): void;
        /**@inline*/ 
        public notifyRestored(): void;
        /**@inline*/ 
        public notifyDisabled(): void;
        /**@inline*/ 
        public notifyAltered(): void;
        /**@inline*/ 
        public notifySaved(): void;
        /**
        * Назначение кода ресурсу
        * @inline
        */
        public setResourceCode(pCode: IResourceCode): void;
        /**
        * Чтобы ресурс знал какому пулу ресурсов принадлжит
        * @inline
        */
        public setResourcePool(pPool: IResourcePool): void;
        /**
        * Назначение хендла ресурсу
        * @inline
        */
        public setResourceHandle(iHandle: number): void;
        public notifyStateChange(eEvent: EResourceItemEvents, pTarget?: IResourcePoolItem): void;
        public setResourceFlag(eFlagBit: EResourceItemEvents, isSetting: bool): bool;
        public setResourceFlag(iFlagBit: number, isSetting: bool): bool;
        private static parseEvent(sEvent);
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public created(): void;
        public destroyed(): void;
        public loaded(): void;
        public unloaded(): void;
        public restored(): void;
        public disabled(): void;
        public altered(): void;
        public saved(): void;
    }
}
module akra.core.pool.resources {
    class RenderMethod extends ResourcePoolItem implements IRenderMethod {
        /**@protected*/ 
        public _pEffect: IEffect;
        /**@protected*/ 
        public _pSurfaceMaterial: ISurfaceMaterial;
        /**@inline*/ 
        public effect : IEffect;
        /**@inline*/ /**@inline*/ 
        public surfaceMaterial : ISurfaceMaterial;
        public isEqual(pRenderMethod: IRenderMethod): bool;
    }
}
module akra {
    interface IVertexData {
    }
    interface IMaterialBase {
        diffuse: IColorValue;
        ambient: IColorValue;
        specular: IColorValue;
        emissive: IColorValue;
        shininess: number;
    }
    interface IMaterial extends IMaterialBase {
        name: string;
        set(pMat: IMaterialBase): IMaterial;
        isEqual(pMat: IMaterialBase): bool;
    }
    interface IFlexMaterial extends IMaterial {
        data: IVertexData;
    }
}
module akra {
    interface IVertexElement {
    }
    /**@const*/ 
    var DeclarationUsages: {
        POSITION: string;
        POSITION1: string;
        POSITION2: string;
        POSITION3: string;
        BLENDWEIGHT: string;
        BLENDINDICES: string;
        BLENDMETA: string;
        NORMAL: string;
        NORMAL1: string;
        NORMAL2: string;
        NORMAL3: string;
        PSIZE: string;
        TEXCOORD: string;
        TEXCOORD1: string;
        TEXCOORD2: string;
        TEXCOORD3: string;
        TEXCOORD4: string;
        TEXCOORD5: string;
        TANGENT: string;
        BINORMAL: string;
        TESSFACTOR: string;
        COLOR: string;
        FOG: string;
        DEPTH: string;
        SAMPLE: string;
        INDEX: string;
        INDEX0: string;
        INDEX1: string;
        INDEX2: string;
        INDEX3: string;
        INDEX10: string;
        INDEX11: string;
        INDEX12: string;
        INDEX13: string;
        MATERIAL: string;
        MATERIAL1: string;
        MATERIAL2: string;
        DIFFUSE: string;
        AMBIENT: string;
        SPECULAR: string;
        EMISSIVE: string;
        SHININESS: string;
        TEXTURE_HEADER: string;
        UNKNOWN: string;
        END: string;
    };
    /**@const*/ 
    var DeclUsages: {
        POSITION: string;
        POSITION1: string;
        POSITION2: string;
        POSITION3: string;
        BLENDWEIGHT: string;
        BLENDINDICES: string;
        BLENDMETA: string;
        NORMAL: string;
        NORMAL1: string;
        NORMAL2: string;
        NORMAL3: string;
        PSIZE: string;
        TEXCOORD: string;
        TEXCOORD1: string;
        TEXCOORD2: string;
        TEXCOORD3: string;
        TEXCOORD4: string;
        TEXCOORD5: string;
        TANGENT: string;
        BINORMAL: string;
        TESSFACTOR: string;
        COLOR: string;
        FOG: string;
        DEPTH: string;
        SAMPLE: string;
        INDEX: string;
        INDEX0: string;
        INDEX1: string;
        INDEX2: string;
        INDEX3: string;
        INDEX10: string;
        INDEX11: string;
        INDEX12: string;
        INDEX13: string;
        MATERIAL: string;
        MATERIAL1: string;
        MATERIAL2: string;
        DIFFUSE: string;
        AMBIENT: string;
        SPECULAR: string;
        EMISSIVE: string;
        SHININESS: string;
        TEXTURE_HEADER: string;
        UNKNOWN: string;
        END: string;
    };
    interface IVertexDeclaration {
        stride: number;
        length: number;
        append(...pElement: IVertexElementInterface[]): bool;
        append(pElements: IVertexElementInterface[]): bool;
        extend(pDecl: IVertexDeclaration): bool;
        hasSemantics(sSemantics: string): bool;
        findElement(sSemantics: string, iCount?: number): IVertexElement;
        clone(): IVertexDeclaration;
        element(i: number): IVertexElement;
        _update(): bool;
        toString(): string;
    }
    /**@inline*/ 
    function VE_CUSTOM(sUsage: string, eType?: EDataTypes, iCount?: number, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_FLOAT(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_FLOAT2(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_FLOAT3(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_FLOAT4(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_FLOAT4x4(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_VEC2(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_VEC3(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_VEC4(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_MAT4(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_INT(sUsage: string, iOffset?: number): IVertexElementInterface;
    /**@inline*/ 
    function VE_END(iOffset?: number): IVertexElementInterface;
}
module akra {
    interface IVertexElementInterface {
        /**
        * Number of uint.
        */
        count: number;
        /**
        * Type of units.
        */
        type: EDataTypes;
        /**
        * Usage of element.
        * For ex., basicly for vertices is 'POSITION'.
        */
        usage: string;
        /**
        * Offset in bytes.
        */
        offset?: number;
    }
    interface IVertexElement extends IVertexElementInterface {
        /**
        * Size in bytes.
        */
        size: number;
        /**
        * numerical index of declaration.
        * For ex. for usage INDEX10, index is 10, semantics is 'INDEX'.
        */
        index: number;
        /**
        * Semantics of declaration.
        * @see DelcarationUsages.
        */
        semantics: string;
        clone(): IVertexElement;
        isEnd(): bool;
        toString(): string;
    }
}
module akra.data {
    class VertexElement implements IVertexElement {
        public count: number;
        public type: EDataTypes;
        public usage: string;
        public offset: number;
        public size: number;
        public index: number;
        public semantics: string;
        constructor(nCount?: number, eType?: EDataTypes, eUsage?: string, iOffset?: number);
        private update();
        public clone(): IVertexElement;
        /**@inline*/ 
        static hasUnknownOffset(pElement: IVertexElementInterface): bool;
        /**@inline*/ 
        public isEnd(): bool;
        public toString(): string;
    }
}
module akra {
    var VertexElement;
}
module akra.data {
    class VertexDeclaration implements IVertexDeclaration {
        public stride: number;
        private _pElements;
        /**@inline*/ 
        public length : number;
        constructor(...pElements: IVertexElementInterface[]);
        constructor(pElements: IVertexElementInterface[]);
        /**@inline*/ 
        public element(i: number): IVertexElement;
        public append(...pElement: IVertexElementInterface[]): bool;
        public append(pElements: IVertexElementInterface[]): bool;
        public _update(): bool;
        public extend(decl: IVertexDeclaration): bool;
        /**@inline*/ 
        public hasSemantics(sSemantics: string): bool;
        public findElement(sSemantics: string, iCount?: number): IVertexElement;
        public clone(): IVertexDeclaration;
        public toString(): string;
    }
}
module akra {
    var VertexDeclaration: {
        new(...pElements: IVertexElementInterface[]): data.VertexDeclaration;
        new(pElements: IVertexElementInterface[]): data.VertexDeclaration;
    };
    var createVertexDeclaration: (pData?: any) => data.VertexDeclaration;
}
module akra {
    interface IColorIValue {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    interface IColorValue {
        r: number;
        g: number;
        b: number;
        a: number;
    }
}
module akra {
    interface IColor extends IColorValue {
        rgba: number;
        argb: number;
        bgra: number;
        abgr: number;
        html: string;
        htmlRgba: string;
        set(cColor: IColorValue): IColor;
        set(cColor: IColor): IColor;
        set(r?: number, g?: number, b?: number, a?: number): IColor;
        set(fGray: number, fAlpha: number): IColor;
        /** Clamps colour value to the range [0, 1].
        */
        saturate(): void;
        /** As saturate, except that this colour value is unaffected and
        the saturated colour value is returned as a copy. */
        saturateCopy(): IColor;
        add(cColor: IColor, ppDest?: IColor): IColor;
        subtract(cColor: IColor, ppDest?: IColor): IColor;
        multiply(cColor: IColor, ppDest?: IColor): IColor;
        multiply(fScalar: number, ppDest?: IColor): IColor;
        divide(cColor: IColor, ppDest?: IColor): IColor;
        divide(fScalar: number, ppDest?: IColor): IColor;
        /** Set a colour value from Hue, Saturation and Brightness.
        @param hue Hue value, scaled to the [0,1] range as opposed to the 0-360
        @param saturation Saturation level, [0,1]
        @param brightness Brightness level, [0,1]
        */
        setHSB(fHue: number, fSaturation: number, fBrightness: number): IColor;
        /** Convert the current colour to Hue, Saturation and Brightness values.
        @param hue Output hue value, scaled to the [0,1] range as opposed to the 0-360
        @param saturation Output saturation level, [0,1]
        @param brightness Output brightness level, [0,1]
        */
        getHSB(pHsb?: number[]): number[];
        toString(): string;
    }
}
module akra.util {
    class Color implements IColor {
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        constructor();
        constructor(cColor: IColor);
        constructor(pData: ArrayBufferView);
        constructor(r: number, g: number, b: number, a: number);
        constructor(r: number, g: number, b: number);
        constructor(fGray: number, fAlpha: number);
        constructor(fGray: number);
        public html : string;
        public htmlRgba : string;
        public rgba : number;
        public argb : number;
        public bgra : number;
        public abgr : number;
        public set(): IColor;
        public set(cColor: IColorValue): IColor;
        public set(pData: ArrayBufferView): IColor;
        public set(cColor: IColor): IColor;
        public set(r: number, g: number, b: number, a: number): IColor;
        public set(r: number, g: number, b: number): IColor;
        public set(fGray: number, fAlpha: number): IColor;
        public set(fGray: number): IColor;
        public saturate(): IColor;
        /** As saturate, except that this colour value is unaffected and
        the saturated colour value is returned as a copy. */
        public saturateCopy(): IColor;
        public add(cColor: IColor, ppDest?: IColor): IColor;
        public subtract(cColor: IColor, ppDest?: IColor): IColor;
        public multiply(cColor: IColor, ppDest?: IColor): IColor;
        public multiply(fScalar: number, ppDest?: IColor): IColor;
        public divide(cColor: IColor, ppDest?: IColor): IColor;
        public divide(fScalar: number, ppDest?: IColor): IColor;
        public setHSB(fHue: number, fSaturation: number, fBrightness: number): IColor;
        public getHSB(pHsb?: number[]): number[];
        public toString(): string;
        static toFloat32Array(pValue: IColorValue): Float32Array;
        static BLACK: IColor;
        static WHITE: IColor;
        static ZERO: IColor;
        static isEqual(c1: IColorValue, c2: IColorValue): bool;
        static ALICE_BLUE: IColor;
        static ANTIQUE_WHITE: IColor;
        static AQUA: IColor;
        static AQUA_MARINE: IColor;
        static AZURE: IColor;
        static BEIGE: IColor;
        static BISQUE: IColor;
        static BLANCHED_ALMOND: IColor;
        static BLUE: IColor;
        static BLUE_VIOLET: IColor;
        static BROWN: IColor;
        static BURLY_WOOD: IColor;
        static CADET_BLUE: IColor;
        static CHARTREUSE: IColor;
        static CHOCOLATE: IColor;
        static CORAL: IColor;
        static CORNFLOWER_BLUE: IColor;
        static CORNSILK: IColor;
        static CRIMSON: IColor;
        static CYAN: IColor;
        static DARK_BLUE: IColor;
        static DARK_CYAN: IColor;
        static DARK_GOLDEN_ROD: IColor;
        static DARK_GRAY: IColor;
        static DARK_GREEN: IColor;
        static DARK_KHAKI: IColor;
        static DARK_MAGENTA: IColor;
        static DARK_OLIVE_GREEN: IColor;
        static DARK_ORANGE: IColor;
        static DARK_ORCHID: IColor;
        static DARK_RED: IColor;
        static DARK_SALMON: IColor;
        static DARK_SEA_GREEN: IColor;
        static DARK_SLATE_BLUE: IColor;
        static DARK_SLATE_GRAY: IColor;
        static DARK_TURQUOISE: IColor;
        static DARK_VIOLET: IColor;
        static DEEP_PINK: IColor;
        static DEEP_SKY_BLUE: IColor;
        static DIM_GRAY: IColor;
        static DIM_GREY: IColor;
        static DODGER_BLUE: IColor;
        static FIRE_BRICK: IColor;
        static FLORAL_WHITE: IColor;
        static FOREST_GREEN: IColor;
        static FUCHSIA: IColor;
        static GAINSBORO: IColor;
        static GHOST_WHITE: IColor;
        static GOLD: IColor;
        static GOLDEN_ROD: IColor;
        static GRAY: IColor;
        static GREEN: IColor;
        static GREEN_YELLOW: IColor;
        static HONEY_DEW: IColor;
        static HOT_PINK: IColor;
        static INDIAN_RED: IColor;
        static INDIGO: IColor;
        static IVORY: IColor;
        static KHAKI: IColor;
        static LAVENDER: IColor;
        static LAVENDER_BLUSH: IColor;
        static LAWN_GREEN: IColor;
        static LEMON_CHIFFON: IColor;
        static LIGHT_BLUE: IColor;
        static LIGHT_CORAL: IColor;
        static LIGHT_CYAN: IColor;
        static LIGHT_GOLDEN_ROD_YELLOW: IColor;
        static LIGHT_GRAY: IColor;
        static LIGHT_GREEN: IColor;
        static LIGHT_PINK: IColor;
        static LIGHT_SALMON: IColor;
        static LIGHT_SEA_GREEN: IColor;
        static LIGHT_SKY_BLUE: IColor;
        static LIGHT_SLATE_GRAY: IColor;
        static LIGHT_STEEL_BLUE: IColor;
        static LIGHT_YELLOW: IColor;
        static LIME: IColor;
        static LIME_GREEN: IColor;
        static LINEN: IColor;
        static MAGENTA: IColor;
        static MAROON: IColor;
        static MEDIUM_AQUA_MARINE: IColor;
        static MEDIUM_BLUE: IColor;
        static MEDIUM_ORCHID: IColor;
        static MEDIUM_PURPLE: IColor;
        static MEDIUM_SEA_GREEN: IColor;
        static MEDIUM_SLATE_BLUE: IColor;
        static MEDIUM_SPRING_GREEN: IColor;
        static MEDIUM_TURQUOISE: IColor;
        static MEDIUM_VIOLET_RED: IColor;
        static MIDNIGHT_BLUE: IColor;
        static MINT_CREAM: IColor;
        static MISTY_ROSE: IColor;
        static MOCCASIN: IColor;
        static NAVAJO_WHITE: IColor;
        static NAVY: IColor;
        static OLD_LACE: IColor;
        static OLIVE: IColor;
        static OLIVE_DRAB: IColor;
        static ORANGE: IColor;
        static ORANGE_RED: IColor;
        static ORCHID: IColor;
        static PALE_GOLDEN_ROD: IColor;
        static PALE_GREEN: IColor;
        static PALE_TURQUOISE: IColor;
        static PALE_VIOLET_RED: IColor;
        static PAPAYA_WHIP: IColor;
        static PEACH_PUFF: IColor;
        static PERU: IColor;
        static PINK: IColor;
        static PLUM: IColor;
        static POWDER_BLUE: IColor;
        static PURPLE: IColor;
        static RED: IColor;
        static ROSY_BROWN: IColor;
        static ROYAL_BLUE: IColor;
        static SADDLE_BROWN: IColor;
        static SALMON: IColor;
        static SANDY_BROWN: IColor;
        static SEA_GREEN: IColor;
        static SEA_SHELL: IColor;
        static SIENNA: IColor;
        static SILVER: IColor;
        static SKY_BLUE: IColor;
        static SLATE_BLUE: IColor;
        static SLATE_GRAY: IColor;
        static SNOW: IColor;
        static SPRING_GREEN: IColor;
        static STEEL_BLUE: IColor;
        static TAN: IColor;
        static TEAL: IColor;
        static THISTLE: IColor;
        static TOMATO: IColor;
        static TURQUOISE: IColor;
        static VIOLET: IColor;
        static WHEAT: IColor;
        static WHITE_SMOKE: IColor;
        static YELLOW: IColor;
        static YELLOW_GREEN: IColor;
    }
    function randomColor(bVarious?: bool): IColor;
    /**@inline*/ 
    function colorToVec4(pValue: IColorValue): IVec4;
}
module akra {
    var Color: {
        toFloat32Array(pValue: IColorValue): Float32Array;
        BLACK: IColor;
        WHITE: IColor;
        ZERO: IColor;
        isEqual(c1: IColorValue, c2: IColorValue): bool;
        ALICE_BLUE: IColor;
        ANTIQUE_WHITE: IColor;
        AQUA: IColor;
        AQUA_MARINE: IColor;
        AZURE: IColor;
        BEIGE: IColor;
        BISQUE: IColor;
        BLANCHED_ALMOND: IColor;
        BLUE: IColor;
        BLUE_VIOLET: IColor;
        BROWN: IColor;
        BURLY_WOOD: IColor;
        CADET_BLUE: IColor;
        CHARTREUSE: IColor;
        CHOCOLATE: IColor;
        CORAL: IColor;
        CORNFLOWER_BLUE: IColor;
        CORNSILK: IColor;
        CRIMSON: IColor;
        CYAN: IColor;
        DARK_BLUE: IColor;
        DARK_CYAN: IColor;
        DARK_GOLDEN_ROD: IColor;
        DARK_GRAY: IColor;
        DARK_GREEN: IColor;
        DARK_KHAKI: IColor;
        DARK_MAGENTA: IColor;
        DARK_OLIVE_GREEN: IColor;
        DARK_ORANGE: IColor;
        DARK_ORCHID: IColor;
        DARK_RED: IColor;
        DARK_SALMON: IColor;
        DARK_SEA_GREEN: IColor;
        DARK_SLATE_BLUE: IColor;
        DARK_SLATE_GRAY: IColor;
        DARK_TURQUOISE: IColor;
        DARK_VIOLET: IColor;
        DEEP_PINK: IColor;
        DEEP_SKY_BLUE: IColor;
        DIM_GRAY: IColor;
        DIM_GREY: IColor;
        DODGER_BLUE: IColor;
        FIRE_BRICK: IColor;
        FLORAL_WHITE: IColor;
        FOREST_GREEN: IColor;
        FUCHSIA: IColor;
        GAINSBORO: IColor;
        GHOST_WHITE: IColor;
        GOLD: IColor;
        GOLDEN_ROD: IColor;
        GRAY: IColor;
        GREEN: IColor;
        GREEN_YELLOW: IColor;
        HONEY_DEW: IColor;
        HOT_PINK: IColor;
        INDIAN_RED: IColor;
        INDIGO: IColor;
        IVORY: IColor;
        KHAKI: IColor;
        LAVENDER: IColor;
        LAVENDER_BLUSH: IColor;
        LAWN_GREEN: IColor;
        LEMON_CHIFFON: IColor;
        LIGHT_BLUE: IColor;
        LIGHT_CORAL: IColor;
        LIGHT_CYAN: IColor;
        LIGHT_GOLDEN_ROD_YELLOW: IColor;
        LIGHT_GRAY: IColor;
        LIGHT_GREEN: IColor;
        LIGHT_PINK: IColor;
        LIGHT_SALMON: IColor;
        LIGHT_SEA_GREEN: IColor;
        LIGHT_SKY_BLUE: IColor;
        LIGHT_SLATE_GRAY: IColor;
        LIGHT_STEEL_BLUE: IColor;
        LIGHT_YELLOW: IColor;
        LIME: IColor;
        LIME_GREEN: IColor;
        LINEN: IColor;
        MAGENTA: IColor;
        MAROON: IColor;
        MEDIUM_AQUA_MARINE: IColor;
        MEDIUM_BLUE: IColor;
        MEDIUM_ORCHID: IColor;
        MEDIUM_PURPLE: IColor;
        MEDIUM_SEA_GREEN: IColor;
        MEDIUM_SLATE_BLUE: IColor;
        MEDIUM_SPRING_GREEN: IColor;
        MEDIUM_TURQUOISE: IColor;
        MEDIUM_VIOLET_RED: IColor;
        MIDNIGHT_BLUE: IColor;
        MINT_CREAM: IColor;
        MISTY_ROSE: IColor;
        MOCCASIN: IColor;
        NAVAJO_WHITE: IColor;
        NAVY: IColor;
        OLD_LACE: IColor;
        OLIVE: IColor;
        OLIVE_DRAB: IColor;
        ORANGE: IColor;
        ORANGE_RED: IColor;
        ORCHID: IColor;
        PALE_GOLDEN_ROD: IColor;
        PALE_GREEN: IColor;
        PALE_TURQUOISE: IColor;
        PALE_VIOLET_RED: IColor;
        PAPAYA_WHIP: IColor;
        PEACH_PUFF: IColor;
        PERU: IColor;
        PINK: IColor;
        PLUM: IColor;
        POWDER_BLUE: IColor;
        PURPLE: IColor;
        RED: IColor;
        ROSY_BROWN: IColor;
        ROYAL_BLUE: IColor;
        SADDLE_BROWN: IColor;
        SALMON: IColor;
        SANDY_BROWN: IColor;
        SEA_GREEN: IColor;
        SEA_SHELL: IColor;
        SIENNA: IColor;
        SILVER: IColor;
        SKY_BLUE: IColor;
        SLATE_BLUE: IColor;
        SLATE_GRAY: IColor;
        SNOW: IColor;
        SPRING_GREEN: IColor;
        STEEL_BLUE: IColor;
        TAN: IColor;
        TEAL: IColor;
        THISTLE: IColor;
        TOMATO: IColor;
        TURQUOISE: IColor;
        VIOLET: IColor;
        WHEAT: IColor;
        WHITE_SMOKE: IColor;
        YELLOW: IColor;
        YELLOW_GREEN: IColor;
        new(): util.Color;
        new(cColor: IColor): util.Color;
        new(pData: ArrayBufferView): util.Color;
        new(r: number, g: number, b: number, a: number): util.Color;
        new(r: number, g: number, b: number): util.Color;
        new(fGray: number, fAlpha: number): util.Color;
        new(fGray: number): util.Color;
    };
}
module akra.material {
    class Material implements IMaterial {
        public name: string;
        public diffuse: IColor;
        public ambient: IColor;
        public specular: IColor;
        public emissive: IColor;
        public shininess: number;
        constructor(sName?: string, pMat?: IMaterial);
        public set(pMat: IMaterialBase): IMaterial;
        public isEqual(pMat: IMaterialBase): bool;
        public toString(): string;
    }
    /**@const*/ 
    var VERTEX_DECL: IVertexDeclaration;
    /**@const*/ 
    var DEFAULT: IMaterial;
    function create(sName?: string, pMat?: IMaterial): IMaterial;
    function _createFlex(sName: string, pData: IVertexData): IMaterial;
}
module akra {
    var Material: new(sName: string, pMat?: IMaterial) => material.Material;
}
module akra.core.pool.resources {
    class SurfaceMaterial extends ResourcePoolItem implements ISurfaceMaterial {
        /**@protected*/ 
        public _pMaterial: IMaterial;
        /**@protected*/ 
        public _nTotalTextures: number;
        /**@protected*/ 
        public _iTextureFlags: number;
        /**@protected*/ 
        public _iTextureMatrixFlags: number;
        /**@protected*/ 
        public _pTextures: ITexture[];
        /**@protected*/ 
        public _pTexcoords: number[];
        /**@protected*/ 
        public _pTextureMatrices: IMat4[];
        /**@protected*/ 
        public _sLastHash: string;
        /**@protected*/ 
        public _isNeedToUpdateHash: bool;
        /**@inline*/ 
        public totalTextures : number;
        /**@inline*/ /**@inline*/ 
        public material : IMaterial;
        /**@inline*/ 
        public textureFlags : number;
        /**@inline*/ 
        public textureMatrixFlags : number;
        constructor();
        public createResource(): bool;
        public setTexture(iIndex: number, iTextureHandle: number, iTexcoord?: number): bool;
        public setTexture(iIndex: number, sTexture: string, iTexcoord?: number): bool;
        public setTexture(iIndex: number, pTexture: ITexture, iTexcoord?: number): bool;
        public setTextureMatrix(iIndex: number, m4fValue: IMat4): bool;
        /**@inline*/ 
        public setMaterial(pMaterial: IMaterial): void;
        public isEqual(pSurfaceMaterial: ISurfaceMaterial): bool;
        /**@inline*/ 
        public texture(iSlot: number): ITexture;
        /**@inline*/ 
        public texcoord(iSlot: number): number;
        /**@inline*/ 
        public textureMatrix(iSlot: number): IMat4;
        static MAX_TEXTURES_PER_SURFACE: number;
        public _getHash(): string;
        private calcHash();
    }
}
module akra.core.pool.resources {
    class Effect extends ResourcePoolItem implements IEffect {
        public totalComponents : number;
        public totalPasses : number;
        constructor();
        public isEqual(pEffect: IEffect): bool;
        public isReplicated(): bool;
        public isMixid(): bool;
        public isParameterUsed(pParam: any, iPass?: number): bool;
        public createResource(): bool;
        public replicable(bValue: bool): void;
        public miscible(bValue: bool): void;
        public addComponent(iComponentHandle: number, iShift?: number, iPass?: number, isSet?: bool): bool;
        public addComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number, isSet?: bool): bool;
        public addComponent(sComponent: string, iShift?: number, iPass?: number, isSet?: bool): bool;
        public delComponent(iComponentHandle: number, iShift?: number, iPass?: number): bool;
        public delComponent(sComponent: string, iShift?: number, iPass?: number): bool;
        public delComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number): bool;
        public activate(iShift?: number): bool;
        public deactivate(): bool;
        public findParameter(pParam: any, iPass?: number): any;
        /**@inline*/ 
        private getComposer();
    }
}
module akra {
    interface IBox {
        width: number;
        height: number;
        depth: number;
        left: number;
        top: number;
        right: number;
        bottom: number;
        front: number;
        back: number;
        contains(pDest: IBox): bool;
        isEqual(pDest: IBox): bool;
        setPosition(iLeft: number, iTop: number, iWidth: number, iHeight: number, iFront?: number, iDepth?: number): void;
        toString(): string;
    }
}
module akra {
    interface IColor {
    }
    interface IPixelBox extends IBox {
        format: EPixelFormats;
        data: Uint8Array;
        rowPitch: number;
        slicePitch: number;
        setConsecutive(): void;
        getRowSkip(): number;
        getSliceSkip(): number;
        isConsecutive(): bool;
        getConsecutiveSize(): number;
        getSubBox(pDest: IBox): IPixelBox;
        getColorAt(pColor: IColor, x: number, y: number, z?: number): IColor;
        setColorAt(pColor: IColor, x: number, y: number, z?: number): void;
        scale(pDest: IPixelBox, eFilter?: EFilters): bool;
        refresh(pExtents: IBox, ePixelFormat: EPixelFormats, pPixelData: Uint8Array): void;
    }
}
module akra {
    enum EImageFlags {
        COMPRESSED,
        CUBEMAP,
        TEXTURE_3D,
    }
    enum EImageCubeFlags {
        POSITIVE_X,
        NEGATIVE_X,
        POSITIVE_Y,
        NEGATIVE_Y,
        POSITIVE_Z,
        NEGATIVE_Z,
    }
    interface IImg extends IResourcePoolItem {
        byteLength: number;
        width: number;
        height: number;
        depth: number;
        numFaces: number;
        numMipMaps: number;
        format: EPixelFormats;
        flags: number;
        cubeFlags: number;
        set(pSrc: IImg): IImg;
        /** @param Destination image. If destination not specified, original image will be modified.*/
        flipY(pDest?: IImg): IImg;
        flipX(pDest?: IImg): IImg;
        load(sFileName: string, fnCallBack?: Function): IImg;
        load(pData: Uint8Array, sType: string, fnCallBack?: Function): IImg;
        load(pCanvas: HTMLCanvasElement, fnCallBack?: Function): IImg;
        loadRawData(pData: Uint8Array, iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): IImg;
        loadDynamicImage(pData: Uint8Array, iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): IImg;
        create(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats, nFaces: number, nMipMaps: number): IImg;
        convert(eFormat: EPixelFormats): bool;
        getRawSpan(): number;
        getPixelSize(): number;
        getBPP(): number;
        getData(): Uint8Array;
        hasFlag(eFlag: EImageFlags): bool;
        hasAlpha(): bool;
        isCompressed(): bool;
        isLuminance(): bool;
        freeMemory();
        getColorAt(pColor: IColor, x: number, y: number, z?: number): IColor;
        setColorAt(pColor: IColor, x: number, y: number, z?: number): void;
        getPixels(nFace?: number, iMipMap?: number): IPixelBox;
        scale(pDest: IPixelBox, eFilter?: EFilters): bool;
        resize(iWidth: number, iHeight: number, eFilter?: EFilters): bool;
        generatePerlinNoise(fScale: number, iOctaves: number, fFalloff: number): void;
        randomChannelNoise(iChannel: number, iMinRange: number, iMaxRange: number): void;
    }
}
module akra {
    interface IPathinfo {
        path: string;
        dirname: string;
        filename: string;
        ext: string;
        basename: string;
        set(sPath: string): void;
        set(pPath: IPathinfo): void;
        isAbsolute(): bool;
        toString(): string;
    }
}
module akra.util {
    class Pathinfo implements IPathinfo {
        private _sDirname;
        private _sExtension;
        private _sFilename;
        /**@inline*/ /**@inline*/ 
        public path : string;
        /**@inline*/ /**@inline*/ 
        public dirname : string;
        /**@inline*/ /**@inline*/ 
        public filename : string;
        /**@inline*/ /**@inline*/ 
        public ext : string;
        /**@inline*/ /**@inline*/ 
        public basename : string;
        constructor(pPath: IPathinfo);
        constructor(sPath: string);
        public set(sPath: string): void;
        public set(pPath: IPathinfo): void;
        public isAbsolute(): bool;
        public toString(): string;
    }
    var pathinfo: (pPath?: any) => IPathinfo;
}
module akra {
    var Pathinfo: {
        new(pPath: IPathinfo): util.Pathinfo;
        new(sPath: string): util.Pathinfo;
    };
}
module akra {
    interface IURI {
        scheme: string;
        userinfo: string;
        host: string;
        port: number;
        path: string;
        query: string;
        fragment: string;
        urn: string;
        url: string;
        authority: string;
        protocol: string;
        toString(): string;
    }
}
module akra.util {
    class URI implements IURI {
        private sScheme;
        private sUserinfo;
        private sHost;
        private nPort;
        private sPath;
        private sQuery;
        private sFragment;
        public urn : string;
        public url : string;
        public authority : string;
        /**@inline*/ 
        public scheme : string;
        public protocol : string;
        /**@inline*/ 
        public userinfo : string;
        /**@inline*/ /**@inline*/ 
        public host : string;
        /**@inline*/ /**@inline*/ 
        public port : number;
        /**@inline*/ /**@inline*/ 
        public path : string;
        /**@inline*/ /**@inline*/ 
        public query : string;
        /**@inline*/ 
        public fragment : string;
        constructor(pUri: URI);
        constructor(sUri: string);
        public set(pUri: URI);
        public set(sUri: string);
        public toString(): string;
        static here(): IURI;
        private static uriExp;
    }
    var uri: (sUri: string) => IURI;
}
module akra.util {
    var stoab: (s: string) => ArrayBuffer;
    var abtos: (pBuf: ArrayBuffer) => string;
    function abtota(pBuffer: ArrayBuffer, eType: EDataTypes): ArrayBufferView;
    function parseJSON(sJSON: string): Object;
    function btoa(pBlob: Blob, fn: (e: ErrorEvent, pBuffer: ArrayBuffer) => void): void;
    /**
    * Преобразование html-сформированного текста
    * в dom.
    */
    function parseHTML(sHTML: string, useDocFragment?: bool): any;
}
module akra {
    interface ICanvasInfo {
        width: number;
        height: number;
        id: string;
    }
}
module akra {
    interface IBrowserInfo {
        name: string;
        version: string;
        os: string;
    }
}
module akra.util {
    class Singleton {
        constructor();
    }
}
module akra.util {
    interface IBrowserData {
        string: string;
        subString: string;
        identity: string;
        versionSearch?: string;
        prop?: string;
    }
    class BrowserInfo extends Singleton implements IBrowserInfo {
        private sBrowser;
        private sVersion;
        private sOS;
        private sVersionSearch;
        constructor();
        public name : string;
        public version : string;
        public os : string;
        private init();
        private searchString(pDataBrowser);
        private searchVersion(sData);
        private static dataBrowser;
        private static dataOS;
    }
}
module akra {
    interface IScreenInfo {
        width: number;
        height: number;
        aspect: number;
        pixelDepth: number;
        colorDepth: number;
    }
}
module akra.util {
    class ScreenInfo implements IScreenInfo {
        public width : number;
        public height : number;
        public aspect : number;
        public pixelDepth : number;
        public colorDepth : number;
    }
}
module akra {
    interface IApiInfo {
        gamepad: bool;
        webGL: bool;
        webAudio: bool;
        file: bool;
        fileSystem: bool;
        webWorker: bool;
        transferableObjects: bool;
        localStorage: bool;
        webSocket: bool;
    }
}
interface WebGLObject {
}
interface WebGLBuffer extends WebGLObject {
}
interface WebGLFramebuffer extends WebGLObject {
}
interface WebGLProgram extends WebGLObject {
}
interface WebGLRenderbuffer extends WebGLObject {
}
interface WebGLShader extends WebGLObject {
}
interface WebGLTexture extends WebGLObject {
}
interface WebGLUniformLocation {
}
interface WebGLActiveInfo {
    size: number;
    type: number;
    name: string;
}
interface WebGLShaderPrecisionFormat {
    rangeMin: number;
    rangeMax: number;
    precision: number;
}
interface WebGLContextAttributes {
    alpha?: bool;
    depth?: bool;
    stencil?: bool;
    antialias?: bool;
    premultipliedAlpha?: bool;
    preserveDrawingBuffer?: bool;
}
interface WebGLRenderingContext {
    DEPTH_BUFFER_BIT: number;
    STENCIL_BUFFER_BIT: number;
    COLOR_BUFFER_BIT: number;
    POINTS: number;
    LINES: number;
    LINE_LOOP: number;
    LINE_STRIP: number;
    TRIANGLES: number;
    TRIANGLE_STRIP: number;
    TRIANGLE_FAN: number;
    ZERO: number;
    ONE: number;
    SRC_COLOR: number;
    ONE_MINUS_SRC_COLOR: number;
    SRC_ALPHA: number;
    ONE_MINUS_SRC_ALPHA: number;
    DST_ALPHA: number;
    ONE_MINUS_DST_ALPHA: number;
    DST_COLOR: number;
    ONE_MINUS_DST_COLOR: number;
    SRC_ALPHA_SATURATE: number;
    FUNC_ADD: number;
    BLEND_EQUATION: number;
    BLEND_EQUATION_RGB: number;
    BLEND_EQUATION_ALPHA: number;
    FUNC_SUBTRACT: number;
    FUNC_REVERSE_SUBTRACT: number;
    BLEND_DST_RGB: number;
    BLEND_SRC_RGB: number;
    BLEND_DST_ALPHA: number;
    BLEND_SRC_ALPHA: number;
    CONSTANT_COLOR: number;
    ONE_MINUS_CONSTANT_COLOR: number;
    CONSTANT_ALPHA: number;
    ONE_MINUS_CONSTANT_ALPHA: number;
    BLEND_COLOR: number;
    ARRAY_BUFFER: number;
    ELEMENT_ARRAY_BUFFER: number;
    ARRAY_BUFFER_BINDING: number;
    ELEMENT_ARRAY_BUFFER_BINDING: number;
    STREAM_DRAW: number;
    STATIC_DRAW: number;
    DYNAMIC_DRAW: number;
    BUFFER_SIZE: number;
    BUFFER_USAGE: number;
    CURRENT_VERTEX_ATTRIB: number;
    FRONT: number;
    BACK: number;
    FRONT_AND_BACK: number;
    CULL_FACE: number;
    BLEND: number;
    DITHER: number;
    STENCIL_TEST: number;
    DEPTH_TEST: number;
    SCISSOR_TEST: number;
    POLYGON_OFFSET_FILL: number;
    SAMPLE_ALPHA_TO_COVERAGE: number;
    SAMPLE_COVERAGE: number;
    NO_ERROR: number;
    INVALID_ENUM: number;
    INVALID_VALUE: number;
    INVALID_OPERATION: number;
    OUT_OF_MEMORY: number;
    CW: number;
    CCW: number;
    LINE_WIDTH: number;
    ALIASED_POINT_SIZE_RANGE: number;
    ALIASED_LINE_WIDTH_RANGE: number;
    CULL_FACE_MODE: number;
    FRONT_FACE: number;
    DEPTH_RANGE: number;
    DEPTH_WRITEMASK: number;
    DEPTH_CLEAR_VALUE: number;
    DEPTH_FUNC: number;
    STENCIL_CLEAR_VALUE: number;
    STENCIL_FUNC: number;
    STENCIL_FAIL: number;
    STENCIL_PASS_DEPTH_FAIL: number;
    STENCIL_PASS_DEPTH_PASS: number;
    STENCIL_REF: number;
    STENCIL_VALUE_MASK: number;
    STENCIL_WRITEMASK: number;
    STENCIL_BACK_FUNC: number;
    STENCIL_BACK_FAIL: number;
    STENCIL_BACK_PASS_DEPTH_FAIL: number;
    STENCIL_BACK_PASS_DEPTH_PASS: number;
    STENCIL_BACK_REF: number;
    STENCIL_BACK_VALUE_MASK: number;
    STENCIL_BACK_WRITEMASK: number;
    VIEWPORT: number;
    SCISSOR_BOX: number;
    COLOR_CLEAR_VALUE: number;
    COLOR_WRITEMASK: number;
    UNPACK_ALIGNMENT: number;
    PACK_ALIGNMENT: number;
    MAX_TEXTURE_SIZE: number;
    MAX_VIEWPORT_DIMS: number;
    SUBPIXEL_BITS: number;
    RED_BITS: number;
    GREEN_BITS: number;
    BLUE_BITS: number;
    ALPHA_BITS: number;
    DEPTH_BITS: number;
    STENCIL_BITS: number;
    POLYGON_OFFSET_UNITS: number;
    POLYGON_OFFSET_FACTOR: number;
    TEXTURE_BINDING_2D: number;
    SAMPLE_BUFFERS: number;
    SAMPLES: number;
    SAMPLE_COVERAGE_VALUE: number;
    SAMPLE_COVERAGE_INVERT: number;
    COMPRESSED_TEXTURE_FORMATS: number;
    DONT_CARE: number;
    FASTEST: number;
    NICEST: number;
    GENERATE_MIPMAP_HINT: number;
    BYTE: number;
    UNSIGNED_BYTE: number;
    SHORT: number;
    UNSIGNED_SHORT: number;
    INT: number;
    UNSIGNED_INT: number;
    FLOAT: number;
    DEPTH_COMPONENT: number;
    ALPHA: number;
    RGB: number;
    RGBA: number;
    LUMINANCE: number;
    LUMINANCE_ALPHA: number;
    UNSIGNED_SHORT_4_4_4_4: number;
    UNSIGNED_SHORT_5_5_5_1: number;
    UNSIGNED_SHORT_5_6_5: number;
    FRAGMENT_SHADER: number;
    VERTEX_SHADER: number;
    MAX_VERTEX_ATTRIBS: number;
    MAX_VERTEX_UNIFORM_VECTORS: number;
    MAX_VARYING_VECTORS: number;
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: number;
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: number;
    MAX_TEXTURE_IMAGE_UNITS: number;
    MAX_FRAGMENT_UNIFORM_VECTORS: number;
    SHADER_TYPE: number;
    DELETE_STATUS: number;
    LINK_STATUS: number;
    VALIDATE_STATUS: number;
    ATTACHED_SHADERS: number;
    ACTIVE_UNIFORMS: number;
    ACTIVE_ATTRIBUTES: number;
    SHADING_LANGUAGE_VERSION: number;
    CURRENT_PROGRAM: number;
    NEVER: number;
    LESS: number;
    EQUAL: number;
    LEQUAL: number;
    GREATER: number;
    NOTEQUAL: number;
    GEQUAL: number;
    ALWAYS: number;
    KEEP: number;
    REPLACE: number;
    INCR: number;
    DECR: number;
    INVERT: number;
    INCR_WRAP: number;
    DECR_WRAP: number;
    VENDOR: number;
    RENDERER: number;
    VERSION: number;
    NEAREST: number;
    LINEAR: number;
    NEAREST_MIPMAP_NEAREST: number;
    LINEAR_MIPMAP_NEAREST: number;
    NEAREST_MIPMAP_LINEAR: number;
    LINEAR_MIPMAP_LINEAR: number;
    TEXTURE_MAG_FILTER: number;
    TEXTURE_MIN_FILTER: number;
    TEXTURE_WRAP_S: number;
    TEXTURE_WRAP_T: number;
    TEXTURE_2D: number;
    TEXTURE: number;
    TEXTURE_CUBE_MAP: number;
    TEXTURE_BINDING_CUBE_MAP: number;
    TEXTURE_CUBE_MAP_POSITIVE_X: number;
    TEXTURE_CUBE_MAP_NEGATIVE_X: number;
    TEXTURE_CUBE_MAP_POSITIVE_Y: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Y: number;
    TEXTURE_CUBE_MAP_POSITIVE_Z: number;
    TEXTURE_CUBE_MAP_NEGATIVE_Z: number;
    MAX_CUBE_MAP_TEXTURE_SIZE: number;
    TEXTURE0: number;
    TEXTURE1: number;
    TEXTURE2: number;
    TEXTURE3: number;
    TEXTURE4: number;
    TEXTURE5: number;
    TEXTURE6: number;
    TEXTURE7: number;
    TEXTURE8: number;
    TEXTURE9: number;
    TEXTURE10: number;
    TEXTURE11: number;
    TEXTURE12: number;
    TEXTURE13: number;
    TEXTURE14: number;
    TEXTURE15: number;
    TEXTURE16: number;
    TEXTURE17: number;
    TEXTURE18: number;
    TEXTURE19: number;
    TEXTURE20: number;
    TEXTURE21: number;
    TEXTURE22: number;
    TEXTURE23: number;
    TEXTURE24: number;
    TEXTURE25: number;
    TEXTURE26: number;
    TEXTURE27: number;
    TEXTURE28: number;
    TEXTURE29: number;
    TEXTURE30: number;
    TEXTURE31: number;
    ACTIVE_TEXTURE: number;
    REPEAT: number;
    CLAMP_TO_EDGE: number;
    MIRRORED_REPEAT: number;
    FLOAT_VEC2: number;
    FLOAT_VEC3: number;
    FLOAT_VEC4: number;
    INT_VEC2: number;
    INT_VEC3: number;
    INT_VEC4: number;
    BOOL: number;
    BOOL_VEC2: number;
    BOOL_VEC3: number;
    BOOL_VEC4: number;
    FLOAT_MAT2: number;
    FLOAT_MAT3: number;
    FLOAT_MAT4: number;
    SAMPLER_2D: number;
    SAMPLER_CUBE: number;
    VERTEX_ATTRIB_ARRAY_ENABLED: number;
    VERTEX_ATTRIB_ARRAY_SIZE: number;
    VERTEX_ATTRIB_ARRAY_STRIDE: number;
    VERTEX_ATTRIB_ARRAY_TYPE: number;
    VERTEX_ATTRIB_ARRAY_NORMALIZED: number;
    VERTEX_ATTRIB_ARRAY_POINTER: number;
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: number;
    COMPILE_STATUS: number;
    LOW_FLOAT: number;
    MEDIUM_FLOAT: number;
    HIGH_FLOAT: number;
    LOW_INT: number;
    MEDIUM_INT: number;
    HIGH_INT: number;
    FRAMEBUFFER: number;
    RENDERBUFFER: number;
    RGBA4: number;
    RGB5_A1: number;
    RGB565: number;
    DEPTH_COMPONENT16: number;
    STENCIL_INDEX: number;
    STENCIL_INDEX8: number;
    DEPTH_STENCIL: number;
    RENDERBUFFER_WIDTH: number;
    RENDERBUFFER_HEIGHT: number;
    RENDERBUFFER_INTERNAL_FORMAT: number;
    RENDERBUFFER_RED_SIZE: number;
    RENDERBUFFER_GREEN_SIZE: number;
    RENDERBUFFER_BLUE_SIZE: number;
    RENDERBUFFER_ALPHA_SIZE: number;
    RENDERBUFFER_DEPTH_SIZE: number;
    RENDERBUFFER_STENCIL_SIZE: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: number;
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: number;
    COLOR_ATTACHMENT0: number;
    DEPTH_ATTACHMENT: number;
    STENCIL_ATTACHMENT: number;
    DEPTH_STENCIL_ATTACHMENT: number;
    NONE: number;
    FRAMEBUFFER_COMPLETE: number;
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: number;
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: number;
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: number;
    FRAMEBUFFER_UNSUPPORTED: number;
    FRAMEBUFFER_BINDING: number;
    RENDERBUFFER_BINDING: number;
    MAX_RENDERBUFFER_SIZE: number;
    INVALID_FRAMEBUFFER_OPERATION: number;
    UNPACK_FLIP_Y_WEBGL: number;
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: number;
    CONTEXT_LOST_WEBGL: number;
    UNPACK_COLORSPACE_CONVERSION_WEBGL: number;
    BROWSER_DEFAULT_WEBGL: number;
    canvas: HTMLCanvasElement;
    drawingBufferWidth: number;
    drawingBufferHeight: number;
    getContextAttributes(): WebGLContextAttributes;
    isContextLost(): bool;
    getSupportedExtensions(): string[];
    getExtension(name: string): any;
    activeTexture(texture: number): void;
    attachShader(program: WebGLProgram, shader: WebGLShader): void;
    bindAttribLocation(program: WebGLProgram, index: number, name: string): void;
    bindBuffer(target: number, buffer: WebGLBuffer): void;
    bindFramebuffer(target: number, framebuffer: WebGLFramebuffer): void;
    bindRenderbuffer(target: number, renderbuffer: WebGLRenderbuffer): void;
    bindTexture(target: number, texture: WebGLTexture): void;
    blendColor(red: number, green: number, blue: number, alpha: number): void;
    blendEquation(mode: number): void;
    blendEquationSeparate(modeRGB: number, modeAlpha: number): void;
    blendFunc(sfactor: number, dfactor: number): void;
    blendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;
    bufferData(target: number, size: number, usage: number): void;
    bufferData(target: number, data: ArrayBufferView, usage: number): void;
    bufferData(target: number, data: ArrayBuffer, usage: number): void;
    bufferSubData(target: number, offset: number, data: ArrayBufferView): void;
    bufferSubData(target: number, offset: number, data: ArrayBuffer): void;
    checkFramebufferStatus(target: number): number;
    clear(mask: number): void;
    clearColor(red: number, green: number, blue: number, alpha: number): void;
    clearDepth(depth: number): void;
    clearStencil(s: number): void;
    colorMask(red: bool, green: bool, blue: bool, alpha: bool): void;
    compileShader(shader: WebGLShader): void;
    compressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, data: ArrayBufferView): void;
    compressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, data: ArrayBufferView): void;
    copyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;
    copyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;
    createBuffer(): WebGLBuffer;
    createFramebuffer(): WebGLFramebuffer;
    createProgram(): WebGLProgram;
    createRenderbuffer(): WebGLRenderbuffer;
    createShader(type: number): WebGLShader;
    createTexture(): WebGLTexture;
    cullFace(mode: number): void;
    deleteBuffer(buffer: WebGLBuffer): void;
    deleteFramebuffer(framebuffer: WebGLFramebuffer): void;
    deleteProgram(program: WebGLProgram): void;
    deleteRenderbuffer(renderbuffer: WebGLRenderbuffer): void;
    deleteShader(shader: WebGLShader): void;
    deleteTexture(texture: WebGLTexture): void;
    depthFunc(func: number): void;
    depthMask(flag: bool): void;
    depthRange(zNear: number, zFar: number): void;
    detachShader(program: WebGLProgram, shader: WebGLShader): void;
    disable(cap: number): void;
    disableVertexAttribArray(index: number): void;
    drawArrays(mode: number, first: number, count: number): void;
    drawElements(mode: number, count: number, type: number, offset: number): void;
    enable(cap: number): void;
    enableVertexAttribArray(index: number): void;
    finish(): void;
    flush(): void;
    framebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: WebGLRenderbuffer): void;
    framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture, level: number): void;
    frontFace(mode: number): void;
    generateMipmap(target: number): void;
    getActiveAttrib(program: WebGLProgram, index: number): WebGLActiveInfo;
    getActiveUniform(program: WebGLProgram, index: number): WebGLActiveInfo;
    getAttachedShaders(program: WebGLProgram): WebGLShader[];
    getAttribLocation(program: WebGLProgram, name: string): number;
    getBufferParameter(target: number, pname: number): any;
    getParameter(pname: number): any;
    getError(): number;
    getFramebufferAttachmentParameter(target: number, attachment: number, pname: number): any;
    getProgramParameter(program: WebGLProgram, pname: number): any;
    getProgramInfoLog(program: WebGLProgram): string;
    getRenderbufferParameter(target: number, pname: number): any;
    getTranslatedShaderSource(shader: WebGLShader): string;
    getShaderParameter(shader: WebGLShader, pname: number): any;
    getShaderPrecisionFormat(shadertype: number, precisiontype: number): WebGLShaderPrecisionFormat;
    getShaderInfoLog(shader: WebGLShader): string;
    getShaderSource(shader: WebGLShader): string;
    getTexParameter(target: number, pname: number): any;
    getUniform(program: WebGLProgram, location: WebGLUniformLocation): any;
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation;
    getVertexAttrib(index: number, pname: number): any;
    getVertexAttribOffset(index: number, pname: number): number;
    hint(target: number, mode: number): void;
    isBuffer(buffer: WebGLBuffer): bool;
    isEnabled(cap: number): bool;
    isFramebuffer(framebuffer: WebGLFramebuffer): bool;
    isProgram(program: WebGLProgram): bool;
    isRenderbuffer(renderbuffer: WebGLRenderbuffer): bool;
    isShader(shader: WebGLShader): bool;
    isTexture(texture: WebGLTexture): bool;
    lineWidth(width: number): void;
    linkProgram(program: WebGLProgram): void;
    pixelStorei(pname: number, param: number): void;
    polygonOffset(factor: number, units: number): void;
    readPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
    renderbufferStorage(target: number, internalformat: number, width: number, height: number): void;
    sampleCoverage(value: number, invert: bool): void;
    scissor(x: number, y: number, width: number, height: number): void;
    shaderSource(shader: WebGLShader, source: string): void;
    stencilFunc(func: number, ref: number, mask: number): void;
    stencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;
    stencilMask(mask: number): void;
    stencilMaskSeparate(face: number, mask: number): void;
    stencilOp(fail: number, zfail: number, zpass: number): void;
    stencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;
    texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, pixels: ImageData): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, image: HTMLImageElement): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, canvas: HTMLCanvasElement): void;
    texImage2D(target: number, level: number, internalformat: number, format: number, type: number, video: HTMLVideoElement): void;
    texParameterf(target: number, pname: number, param: number): void;
    texParameteri(target: number, pname: number, param: number): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, pixels: ImageData): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, image: HTMLImageElement): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, canvas: HTMLCanvasElement): void;
    texSubImage2D(target: number, level: number, xoffset: number, yoffset: number, format: number, type: number, video: HTMLVideoElement): void;
    uniform1f(location: WebGLUniformLocation, x: number): void;
    uniform1fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform1fv(location: WebGLUniformLocation, v: number[]): void;
    uniform1i(location: WebGLUniformLocation, x: number): void;
    uniform1iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform1iv(location: WebGLUniformLocation, v: number[]): void;
    uniform2f(location: WebGLUniformLocation, x: number, y: number): void;
    uniform2fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform2fv(location: WebGLUniformLocation, v: number[]): void;
    uniform2i(location: WebGLUniformLocation, x: number, y: number): void;
    uniform2iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform2iv(location: WebGLUniformLocation, v: number[]): void;
    uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    uniform3fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform3fv(location: WebGLUniformLocation, v: number[]): void;
    uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    uniform3iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform3iv(location: WebGLUniformLocation, v: number[]): void;
    uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    uniform4fv(location: WebGLUniformLocation, v: Float32Array): void;
    uniform4fv(location: WebGLUniformLocation, v: number[]): void;
    uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    uniform4iv(location: WebGLUniformLocation, v: Int32Array): void;
    uniform4iv(location: WebGLUniformLocation, v: number[]): void;
    uniformMatrix2fv(location: WebGLUniformLocation, transpose: bool, value: Float32Array): void;
    uniformMatrix2fv(location: WebGLUniformLocation, transpose: bool, value: number[]): void;
    uniformMatrix3fv(location: WebGLUniformLocation, transpose: bool, value: Float32Array): void;
    uniformMatrix3fv(location: WebGLUniformLocation, transpose: bool, value: number[]): void;
    uniformMatrix4fv(location: WebGLUniformLocation, transpose: bool, value: Float32Array): void;
    uniformMatrix4fv(location: WebGLUniformLocation, transpose: bool, value: number[]): void;
    useProgram(program: WebGLProgram): void;
    validateProgram(program: WebGLProgram): void;
    vertexAttrib1f(indx: number, x: number): void;
    vertexAttrib1fv(indx: number, values: Float32Array): void;
    vertexAttrib1fv(indx: number, value: number[]): void;
    vertexAttrib2f(indx: number, x: number, y: number): void;
    vertexAttrib2fv(indx: number, values: Float32Array): void;
    vertexAttrib2fv(indx: number, value: number[]): void;
    vertexAttrib3f(indx: number, x: number, y: number, z: number): void;
    vertexAttrib3fv(indx: number, values: Float32Array): void;
    vertexAttrib3fv(indx: number, value: number[]): void;
    vertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void;
    vertexAttrib4fv(indx: number, values: Float32Array): void;
    vertexAttrib4fv(indx: number, value: number[]): void;
    vertexAttribPointer(indx: number, size: number, type: number, normalized: bool, stride: number, offset: number): void;
    viewport(x: number, y: number, width: number, height: number): void;
}
interface CanvasRenderingContext {
}
interface WebGLRenderingContext extends CanvasRenderingContext {
}
interface HTMLCanvasElement extends HTMLElement {
    getContext(contextId: string, args: WebGLContextAttributes): WebGLRenderingContext;
}
interface WEBGL_debug_shaders {
    getTranslatedShaderSource(shader: WebGLShader): DOMString;
}
interface WEBGL_debug_renderer_info {
    UNMASKED_VENDOR_WEBGL: number;
    UNMASKED_RENDERER_WEBGL: number;
}
interface WEBGL_compressed_texture_pvrtc {
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: number;
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: number;
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: number;
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: number;
}
interface WEBGL_compressed_texture_atc {
    COMPRESSED_RGB_ATC_WEBGL: number;
    COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: number;
    COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: number;
}
interface WEBGL_compressed_texture_s3tc {
    COMPRESSED_RGB_S3TC_DXT1_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT1_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT3_EXT: number;
    COMPRESSED_RGBA_S3TC_DXT5_EXT: number;
}
interface WEBGL_depth_texture {
    UNSIGNED_INT_24_8_WEBGL: number;
}
interface OES_element_index_uint {
}
interface WebGLVertexArrayObjectOES extends WebGLObject {
}
interface OES_vertex_array_object {
    VERTEX_ARRAY_BINDING_OES: number;
    createVertexArrayOES(): WebGLVertexArrayObjectOES;
    deleteVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES): void;
    isVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES): bool;
    bindVertexArrayOES(arrayObject: WebGLVertexArrayObjectOES): void;
}
interface OES_standard_derivatives {
    FRAGMENT_SHADER_DERIVATIVE_HINT_OES: number;
}
interface OES_texture_half_float {
    HALF_FLOAT_OES: number;
}
interface OES_texture_float {
}
interface WEBGL_lose_context {
    loseContext(): void;
    restoreContext(): void;
}
interface WEBGL_multiple_render_targets {
    COLOR_ATTACHMENT0_WEBGL: number;
    COLOR_ATTACHMENT1_WEBGL: number;
    COLOR_ATTACHMENT2_WEBGL: number;
    COLOR_ATTACHMENT3_WEBGL: number;
    COLOR_ATTACHMENT4_WEBGL: number;
    COLOR_ATTACHMENT5_WEBGL: number;
    COLOR_ATTACHMENT6_WEBGL: number;
    COLOR_ATTACHMENT7_WEBGL: number;
    COLOR_ATTACHMENT8_WEBGL: number;
    COLOR_ATTACHMENT9_WEBGL: number;
    COLOR_ATTACHMENT10_WEBGL: number;
    COLOR_ATTACHMENT11_WEBGL: number;
    COLOR_ATTACHMENT12_WEBGL: number;
    COLOR_ATTACHMENT13_WEBGL: number;
    COLOR_ATTACHMENT14_WEBGL: number;
    COLOR_ATTACHMENT15_WEBGL: number;
    DRAW_BUFFER0_WEBGL: number;
    DRAW_BUFFER1_WEBGL: number;
    DRAW_BUFFER2_WEBGL: number;
    DRAW_BUFFER3_WEBGL: number;
    DRAW_BUFFER4_WEBGL: number;
    DRAW_BUFFER5_WEBGL: number;
    DRAW_BUFFER6_WEBGL: number;
    DRAW_BUFFER7_WEBGL: number;
    DRAW_BUFFER8_WEBGL: number;
    DRAW_BUFFER9_WEBGL: number;
    DRAW_BUFFER10_WEBGL: number;
    DRAW_BUFFER11_WEBGL: number;
    DRAW_BUFFER12_WEBGL: number;
    DRAW_BUFFER13_WEBGL: number;
    DRAW_BUFFER14_WEBGL: number;
    DRAW_BUFFER15_WEBGL: number;
    MAX_COLOR_ATTACHMENTS_WEBGL: number;
    MAX_DRAW_BUFFERS_WEBGL: number;
    drawBuffersWEBGL(buffers: number[]): void;
}
interface WEBGL_fbo_color_attachments {
    COLOR_ATTACHMENT0: number;
    COLOR_ATTACHMENT1: number;
    COLOR_ATTACHMENT2: number;
    COLOR_ATTACHMENT3: number;
    COLOR_ATTACHMENT4: number;
    COLOR_ATTACHMENT5: number;
    COLOR_ATTACHMENT6: number;
    COLOR_ATTACHMENT7: number;
    COLOR_ATTACHMENT8: number;
    COLOR_ATTACHMENT9: number;
    COLOR_ATTACHMENT10: number;
    COLOR_ATTACHMENT11: number;
    COLOR_ATTACHMENT12: number;
    COLOR_ATTACHMENT13: number;
    COLOR_ATTACHMENT14: number;
    COLOR_ATTACHMENT15: number;
    MAX_COLOR_ATTACHMENTS: number;
}
module akra {
    interface IVec2Constructor {
        ();
        (fValue: number);
        (v2fVec: IVec2);
        (pArray: number[]);
        (fValue1: number, fValue2: number);
    }
    interface IVec2 {
        x: number;
        y: number;
        xx: IVec2;
        xy: IVec2;
        yx: IVec2;
        yy: IVec2;
        set(): IVec2;
        set(fValue: number): IVec2;
        set(v2fVec: IVec2): IVec2;
        set(pArray: number[]): IVec2;
        set(fValue1: number, fValue2: number): IVec2;
        clear(): IVec2;
        add(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        subtract(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        dot(v2fVec: IVec2): number;
        isEqual(v2fVec: IVec2, fEps?: number): bool;
        isClear(fEps?: number): bool;
        negate(v2fDestination?: IVec2): IVec2;
        scale(fScale: number, v2fDestination?: IVec2): IVec2;
        normalize(v2fDestination?: IVec2): IVec2;
        length(): number;
        lengthSquare(): number;
        direction(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        mix(v2fVec: IVec2, fA: number, v2fDestination?: IVec2): IVec2;
        toString(): string;
    }
}
module akra.math {
    class Vec2 implements IVec2 {
        public x: number;
        public y: number;
        public xx : IVec2;
        public xy : IVec2;
        public yx : IVec2;
        public yy : IVec2;
        constructor();
        constructor(fValue: number);
        constructor(v2fVec: IVec2);
        constructor(pArray: number[]);
        constructor(fValue1: number, fValue2: number);
        public set(): IVec2;
        public set(fValue: number): IVec2;
        public set(v2fVec: IVec2): IVec2;
        public set(pArray: number[]): IVec2;
        public set(fValue1: number, fValue2: number): IVec2;
        /**@inline*/ 
        public clear(): IVec2;
        public add(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        public subtract(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public dot(v2fVec: IVec2): number;
        public isEqual(v2fVec: IVec2, fEps?: number): bool;
        public isClear(fEps?: number): bool;
        public negate(v2fDestination?: IVec2): IVec2;
        public scale(fScale: number, v2fDestination?: IVec2): IVec2;
        public normalize(v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public length(): number;
        /**@inline*/ 
        public lengthSquare(): number;
        public direction(v2fVec: IVec2, v2fDestination?: IVec2): IVec2;
        public mix(v2fVec: IVec2, fA: number, v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public toString(): string;
        static stackCeil : Vec2;
        static stackSize: number;
        static stackPosition: number;
        static stack: Vec2[];
    }
}
module akra {
    interface IVec2 {
    }
    interface IMat4 {
    }
    interface IVec3Constructor {
        ();
        (fValue: number);
        (v3fVec: IVec3);
        (pArray: number[]);
        (fValue: number, v2fVec: IVec2);
        (v2fVec: IVec2, fValue: number);
        (fValue1: number, fValue2: number, fValue3: number);
    }
    interface IVec3 {
        x: number;
        y: number;
        z: number;
        xx: IVec2;
        xy: IVec2;
        xz: IVec2;
        yx: IVec2;
        yy: IVec2;
        yz: IVec2;
        zx: IVec2;
        zy: IVec2;
        zz: IVec2;
        xxx: IVec3;
        xxy: IVec3;
        xxz: IVec3;
        xyx: IVec3;
        xyy: IVec3;
        xyz: IVec3;
        xzx: IVec3;
        xzy: IVec3;
        xzz: IVec3;
        yxx: IVec3;
        yxy: IVec3;
        yxz: IVec3;
        yyx: IVec3;
        yyy: IVec3;
        yyz: IVec3;
        yzx: IVec3;
        yzy: IVec3;
        yzz: IVec3;
        zxx: IVec3;
        zxy: IVec3;
        zxz: IVec3;
        zyx: IVec3;
        zyy: IVec3;
        zyz: IVec3;
        zzx: IVec3;
        zzy: IVec3;
        zzz: IVec3;
        set(): IVec3;
        set(fValue: number): IVec3;
        set(v3fVec: IVec3): IVec3;
        set(pArray: number[]): IVec3;
        set(fValue: number, v2fVec: IVec2): IVec3;
        set(v2fVec: IVec2, fValue: number): IVec3;
        set(fValue1: number, fValue2: number, fValue3: number): IVec3;
        clear(): IVec3;
        add(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        subtract(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        dot(v3fVec: IVec3): number;
        cross(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        isEqual(v3fVec: IVec3, fEps?: number): bool;
        isClear(fEps?: number): bool;
        negate(v3fDestination?: IVec3): IVec3;
        scale(fScale: number, v3fDestination?: IVec3): IVec3;
        scale(v3fScale: IVec3, v3fDestination?: IVec3): IVec3;
        normalize(v3fDestination?: IVec3): IVec3;
        length(): number;
        lengthSquare(): number;
        direction(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        mix(v3fVec: IVec3, fA: number, v3fDestination?: IVec3): IVec3;
        toString(): string;
        toTranslationMatrix(m4fDestination?: IMat4);
        vec3TransformCoord(m4fTransformation: IMat4, v3fDestination?: IVec3): IVec3;
    }
}
module akra {
    interface IVec3 {
    }
    interface IVec4 {
    }
    interface IMat3 {
    }
    interface IQuat4 {
    }
    interface IMat4Constructor {
        ();
        (fValue: number);
        (v4fVec: IVec4);
        (m4fMat: IMat4);
        (pArray: number[]);
        (m3fMat: IMat3, v3fTranslation?: IVec3);
        (pArray: Float32Array, bFlag: bool);
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number);
        (v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4);
        (pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]);
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number);
    }
    interface IMat4 {
        data: Float32Array;
        set(): IMat4;
        set(fValue: number): IMat4;
        set(v4fVec: IVec4): IMat4;
        set(m3fMat: IMat3, v3fTranslation?: IVec3): IMat4;
        set(m4fMat: IMat4): IMat4;
        set(pArray: number[]): IMat4;
        set(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IMat4;
        set(v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4): IMat4;
        set(pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]): IMat4;
        set(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number): IMat4;
        identity(): IMat4;
        add(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        subtract(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        multiply(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        multiplyLeft(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        multiplyVec4(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        transpose(m4fDestination?: IMat4): IMat4;
        determinant(): number;
        inverse(m4fDestination?: IMat4): IMat4;
        trace(): number;
        isEqual(m4fMat: IMat4, fEps?: number): bool;
        isDiagonal(fEps?: number): bool;
        toMat3(m3fDestination?: IMat3): IMat3;
        toQuat4(q4fDestination?: IQuat4): IQuat4;
        toRotationMatrix(m4fDestination?: IMat4): IMat4;
        toString(): string;
        rotateRight(fAngle: number, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;
        rotateLeft(fAngle: number, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;
        setTranslation(v3fTranslation: IVec3): IMat4;
        getTranslation(v3fTranslation?: IVec3): IVec3;
        translateRight(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;
        translateLeft(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;
        scaleRight(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;
        scaleLeft(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;
        decompose(q4fRotation: IQuat4, v3fScale: IVec3, v3fTranslation: IVec3): bool;
        row(iRow: number, v4fDestination?: IVec4): IVec4;
        column(iColumn: number, v4fDestination?: IVec4): IVec4;
        unproj(v3fScreen: IVec3, v4fDestination?: IVec4): IVec4;
        unproj(v4fScreen: IVec4, v4fDestination?: IVec4): IVec4;
        unprojZ(fZ: number): number;
        /**
        * use only this projection matrix otherwise result doesn't have any sense
        */
        isOrthogonalProjection(): bool;
    }
}
module akra.math {
    class Vec3 {
        public x: number;
        public y: number;
        public z: number;
        public xx : IVec2;
        public xy : IVec2;
        public xz : IVec2;
        public yx : IVec2;
        public yy : IVec2;
        public yz : IVec2;
        public zx : IVec2;
        public zy : IVec2;
        public zz : IVec2;
        public xxx : IVec3;
        public xxy : IVec3;
        public xxz : IVec3;
        public xyx : IVec3;
        public xyy : IVec3;
        public xyz : IVec3;
        public xzx : IVec3;
        public xzy : IVec3;
        public xzz : IVec3;
        public yxx : IVec3;
        public yxy : IVec3;
        public yxz : IVec3;
        public yyx : IVec3;
        public yyy : IVec3;
        public yyz : IVec3;
        public yzx : IVec3;
        public yzy : IVec3;
        public yzz : IVec3;
        public zxx : IVec3;
        public zxy : IVec3;
        public zxz : IVec3;
        public zyx : IVec3;
        public zyy : IVec3;
        public zyz : IVec3;
        public zzx : IVec3;
        public zzy : IVec3;
        public zzz : IVec3;
        constructor();
        constructor(fValue: number);
        constructor(v3fVec: IVec3);
        constructor(pArray: number[]);
        constructor(fValue: number, v2fVec: IVec2);
        constructor(v2fVec: IVec2, fValue: number);
        constructor(fValue1: number, fValue2: number, fValue3: number);
        public set(): IVec3;
        public set(fValue: number): IVec3;
        public set(v3fVec: IVec3): IVec3;
        public set(pArray: number[]): IVec3;
        public set(fValue: number, v2fVec: IVec2): IVec3;
        public set(v2fVec: IVec2, fValue: number): IVec3;
        public set(fValue1: number, fValue2: number, fValue3: number): IVec3;
        /**@inline*/ 
        public clear(): IVec3;
        public add(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        public subtract(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public dot(v3fVec: IVec3): number;
        public cross(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        public isEqual(v3fVec: IVec3, fEps?: number): bool;
        public isClear(fEps?: number): bool;
        public negate(v3fDestination?: IVec3): IVec3;
        public scale(v3fScale: IVec3, v3fDestination?: IVec3): IVec3;
        public scale(fScale: number, v3fDestination?: IVec3): IVec3;
        public normalize(v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public length(): number;
        /**@inline*/ 
        public lengthSquare(): number;
        public direction(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        public mix(v3fVec: IVec3, fA: number, v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public toString(): string;
        public toTranslationMatrix(m4fDestination?: IMat4): IMat4;
        public vec3TransformCoord(m4fTransformation: IMat4, v3fDestination?: IVec3): IVec3;
        static stackCeil : Vec3;
        static stackSize: number;
        static stackPosition: number;
        static stack: Vec3[];
    }
}
module akra.math {
    class Vec4 implements IVec4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;
        public xx : IVec2;
        public xy : IVec2;
        public xz : IVec2;
        public xw : IVec2;
        public yx : IVec2;
        public yy : IVec2;
        public yz : IVec2;
        public yw : IVec2;
        public zx : IVec2;
        public zy : IVec2;
        public zz : IVec2;
        public zw : IVec2;
        public wx : IVec2;
        public wy : IVec2;
        public wz : IVec2;
        public ww : IVec2;
        public xxx : IVec3;
        public xxy : IVec3;
        public xxz : IVec3;
        public xxw : IVec3;
        public xyx : IVec3;
        public xyy : IVec3;
        public xyz : IVec3;
        public xyw : IVec3;
        public xzx : IVec3;
        public xzy : IVec3;
        public xzz : IVec3;
        public xzw : IVec3;
        public xwx : IVec3;
        public xwy : IVec3;
        public xwz : IVec3;
        public xww : IVec3;
        public yxx : IVec3;
        public yxy : IVec3;
        public yxz : IVec3;
        public yxw : IVec3;
        public yyx : IVec3;
        public yyy : IVec3;
        public yyz : IVec3;
        public yyw : IVec3;
        public yzx : IVec3;
        public yzy : IVec3;
        public yzz : IVec3;
        public yzw : IVec3;
        public ywx : IVec3;
        public ywy : IVec3;
        public ywz : IVec3;
        public yww : IVec3;
        public zxx : IVec3;
        public zxy : IVec3;
        public zxz : IVec3;
        public zxw : IVec3;
        public zyx : IVec3;
        public zyy : IVec3;
        public zyz : IVec3;
        public zyw : IVec3;
        public zzx : IVec3;
        public zzy : IVec3;
        public zzz : IVec3;
        public zzw : IVec3;
        public zwx : IVec3;
        public zwy : IVec3;
        public zwz : IVec3;
        public zww : IVec3;
        public wxx : IVec3;
        public wxy : IVec3;
        public wxz : IVec3;
        public wxw : IVec3;
        public wyx : IVec3;
        public wyy : IVec3;
        public wyz : IVec3;
        public wyw : IVec3;
        public wzx : IVec3;
        public wzy : IVec3;
        public wzz : IVec3;
        public wzw : IVec3;
        public wwx : IVec3;
        public wwy : IVec3;
        public wwz : IVec3;
        public www : IVec3;
        public xxxx : IVec4;
        public xxxy : IVec4;
        public xxxz : IVec4;
        public xxxw : IVec4;
        public xxyx : IVec4;
        public xxyy : IVec4;
        public xxyz : IVec4;
        public xxyw : IVec4;
        public xxzx : IVec4;
        public xxzy : IVec4;
        public xxzz : IVec4;
        public xxzw : IVec4;
        public xxwx : IVec4;
        public xxwy : IVec4;
        public xxwz : IVec4;
        public xxww : IVec4;
        public xyxx : IVec4;
        public xyxy : IVec4;
        public xyxz : IVec4;
        public xyxw : IVec4;
        public xyyx : IVec4;
        public xyyy : IVec4;
        public xyyz : IVec4;
        public xyyw : IVec4;
        public xyzx : IVec4;
        public xyzy : IVec4;
        public xyzz : IVec4;
        public xyzw : IVec4;
        public xywx : IVec4;
        public xywy : IVec4;
        public xywz : IVec4;
        public xyww : IVec4;
        public xzxx : IVec4;
        public xzxy : IVec4;
        public xzxz : IVec4;
        public xzxw : IVec4;
        public xzyx : IVec4;
        public xzyy : IVec4;
        public xzyz : IVec4;
        public xzyw : IVec4;
        public xzzx : IVec4;
        public xzzy : IVec4;
        public xzzz : IVec4;
        public xzzw : IVec4;
        public xzwx : IVec4;
        public xzwy : IVec4;
        public xzwz : IVec4;
        public xzww : IVec4;
        public xwxx : IVec4;
        public xwxy : IVec4;
        public xwxz : IVec4;
        public xwxw : IVec4;
        public xwyx : IVec4;
        public xwyy : IVec4;
        public xwyz : IVec4;
        public xwyw : IVec4;
        public xwzx : IVec4;
        public xwzy : IVec4;
        public xwzz : IVec4;
        public xwzw : IVec4;
        public xwwx : IVec4;
        public xwwy : IVec4;
        public xwwz : IVec4;
        public xwww : IVec4;
        public yxxx : IVec4;
        public yxxy : IVec4;
        public yxxz : IVec4;
        public yxxw : IVec4;
        public yxyx : IVec4;
        public yxyy : IVec4;
        public yxyz : IVec4;
        public yxyw : IVec4;
        public yxzx : IVec4;
        public yxzy : IVec4;
        public yxzz : IVec4;
        public yxzw : IVec4;
        public yxwx : IVec4;
        public yxwy : IVec4;
        public yxwz : IVec4;
        public yxww : IVec4;
        public yyxx : IVec4;
        public yyxy : IVec4;
        public yyxz : IVec4;
        public yyxw : IVec4;
        public yyyx : IVec4;
        public yyyy : IVec4;
        public yyyz : IVec4;
        public yyyw : IVec4;
        public yyzx : IVec4;
        public yyzy : IVec4;
        public yyzz : IVec4;
        public yyzw : IVec4;
        public yywx : IVec4;
        public yywy : IVec4;
        public yywz : IVec4;
        public yyww : IVec4;
        public yzxx : IVec4;
        public yzxy : IVec4;
        public yzxz : IVec4;
        public yzxw : IVec4;
        public yzyx : IVec4;
        public yzyy : IVec4;
        public yzyz : IVec4;
        public yzyw : IVec4;
        public yzzx : IVec4;
        public yzzy : IVec4;
        public yzzz : IVec4;
        public yzzw : IVec4;
        public yzwx : IVec4;
        public yzwy : IVec4;
        public yzwz : IVec4;
        public yzww : IVec4;
        public ywxx : IVec4;
        public ywxy : IVec4;
        public ywxz : IVec4;
        public ywxw : IVec4;
        public ywyx : IVec4;
        public ywyy : IVec4;
        public ywyz : IVec4;
        public ywyw : IVec4;
        public ywzx : IVec4;
        public ywzy : IVec4;
        public ywzz : IVec4;
        public ywzw : IVec4;
        public ywwx : IVec4;
        public ywwy : IVec4;
        public ywwz : IVec4;
        public ywww : IVec4;
        public zxxx : IVec4;
        public zxxy : IVec4;
        public zxxz : IVec4;
        public zxxw : IVec4;
        public zxyx : IVec4;
        public zxyy : IVec4;
        public zxyz : IVec4;
        public zxyw : IVec4;
        public zxzx : IVec4;
        public zxzy : IVec4;
        public zxzz : IVec4;
        public zxzw : IVec4;
        public zxwx : IVec4;
        public zxwy : IVec4;
        public zxwz : IVec4;
        public zxww : IVec4;
        public zyxx : IVec4;
        public zyxy : IVec4;
        public zyxz : IVec4;
        public zyxw : IVec4;
        public zyyx : IVec4;
        public zyyy : IVec4;
        public zyyz : IVec4;
        public zyyw : IVec4;
        public zyzx : IVec4;
        public zyzy : IVec4;
        public zyzz : IVec4;
        public zyzw : IVec4;
        public zywx : IVec4;
        public zywy : IVec4;
        public zywz : IVec4;
        public zyww : IVec4;
        public zzxx : IVec4;
        public zzxy : IVec4;
        public zzxz : IVec4;
        public zzxw : IVec4;
        public zzyx : IVec4;
        public zzyy : IVec4;
        public zzyz : IVec4;
        public zzyw : IVec4;
        public zzzx : IVec4;
        public zzzy : IVec4;
        public zzzz : IVec4;
        public zzzw : IVec4;
        public zzwx : IVec4;
        public zzwy : IVec4;
        public zzwz : IVec4;
        public zzww : IVec4;
        public zwxx : IVec4;
        public zwxy : IVec4;
        public zwxz : IVec4;
        public zwxw : IVec4;
        public zwyx : IVec4;
        public zwyy : IVec4;
        public zwyz : IVec4;
        public zwyw : IVec4;
        public zwzx : IVec4;
        public zwzy : IVec4;
        public zwzz : IVec4;
        public zwzw : IVec4;
        public zwwx : IVec4;
        public zwwy : IVec4;
        public zwwz : IVec4;
        public zwww : IVec4;
        public wxxx : IVec4;
        public wxxy : IVec4;
        public wxxz : IVec4;
        public wxxw : IVec4;
        public wxyx : IVec4;
        public wxyy : IVec4;
        public wxyz : IVec4;
        public wxyw : IVec4;
        public wxzx : IVec4;
        public wxzy : IVec4;
        public wxzz : IVec4;
        public wxzw : IVec4;
        public wxwx : IVec4;
        public wxwy : IVec4;
        public wxwz : IVec4;
        public wxww : IVec4;
        public wyxx : IVec4;
        public wyxy : IVec4;
        public wyxz : IVec4;
        public wyxw : IVec4;
        public wyyx : IVec4;
        public wyyy : IVec4;
        public wyyz : IVec4;
        public wyyw : IVec4;
        public wyzx : IVec4;
        public wyzy : IVec4;
        public wyzz : IVec4;
        public wyzw : IVec4;
        public wywx : IVec4;
        public wywy : IVec4;
        public wywz : IVec4;
        public wyww : IVec4;
        public wzxx : IVec4;
        public wzxy : IVec4;
        public wzxz : IVec4;
        public wzxw : IVec4;
        public wzyx : IVec4;
        public wzyy : IVec4;
        public wzyz : IVec4;
        public wzyw : IVec4;
        public wzzx : IVec4;
        public wzzy : IVec4;
        public wzzz : IVec4;
        public wzzw : IVec4;
        public wzwx : IVec4;
        public wzwy : IVec4;
        public wzwz : IVec4;
        public wzww : IVec4;
        public wwxx : IVec4;
        public wwxy : IVec4;
        public wwxz : IVec4;
        public wwxw : IVec4;
        public wwyx : IVec4;
        public wwyy : IVec4;
        public wwyz : IVec4;
        public wwyw : IVec4;
        public wwzx : IVec4;
        public wwzy : IVec4;
        public wwzz : IVec4;
        public wwzw : IVec4;
        public wwwx : IVec4;
        public wwwy : IVec4;
        public wwwz : IVec4;
        public wwww : IVec4;
        constructor();
        constructor(fValue: number);
        constructor(v4fVec: IVec4);
        constructor(pArray: number[]);
        constructor(fValue: number, v3fVec: IVec3);
        constructor(v2fVec1: IVec2, v2fVec2: IVec2);
        constructor(v3fVec: IVec3, fValue: number);
        constructor(fValue1: number, fValue2: number, v2fVec: IVec2);
        constructor(fValue1: number, v2fVec: IVec2, fValue2: number);
        constructor(v2fVec: IVec2, fValue1: number, fValue2: number);
        constructor(fValue1: number, fValue2: number, fValue3: number, fValue4: number);
        public set(): IVec4;
        public set(fValue: number): IVec4;
        public set(v4fVec: IVec4): IVec4;
        public set(c4fColor: IColorValue): IVec4;
        public set(pArray: number[]): IVec4;
        public set(fValue: number, v3fVec: IVec3): IVec4;
        public set(v2fVec1: IVec2, v2fVec2: IVec2): IVec4;
        public set(v3fVec: IVec3, fValue: number): IVec4;
        public set(fValue1: number, fValue2: number, v2fVec: IVec2): IVec4;
        public set(fValue1: number, v2fVec: IVec2, fValue2: number): IVec4;
        public set(v2fVec: IVec2, fValue1: number, fValue2: number): IVec4;
        public set(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IVec4;
        /**@inline*/ 
        public clear(): IVec4;
        public add(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        public subtract(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        /**@inline*/ 
        public dot(v4fVec: IVec4): number;
        public isEqual(v4fVec: IVec4, fEps?: number): bool;
        public isClear(fEps?: number): bool;
        public negate(v4fDestination?: IVec4): IVec4;
        public scale(fScale: number, v4fDestination?: IVec4): IVec4;
        public normalize(v4fDestination?: IVec4): IVec4;
        /**@inline*/ 
        public length(): number;
        /**@inline*/ 
        public lengthSquare(): number;
        public direction(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        public mix(v4fVec: IVec4, fA: number, v4fDestination?: IVec4): IVec4;
        /**@inline*/ 
        public toString(): string;
        static stackCeil : Vec4;
        static stackSize: number;
        static stackPosition: number;
        static stack: Vec4[];
    }
}
module akra {
    interface IMat4 {
    }
    interface IVec3 {
    }
    interface IQuat4 {
    }
    interface IMat3Constructor {
        ();
        (fValue: number);
        (v3fVec: IVec3);
        (m3fMat: IMat3);
        (m4fMat: IMat4);
        (pArray: number[]);
        (fValue1: number, fValue2: number, fValue3: number);
        (v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3);
        (pArray1: number[], pArray2: number[], pArray3: number[]);
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number);
    }
    interface IMat3 {
        data: Float32Array;
        set(): IMat3;
        set(fValue: number): IMat3;
        set(v3fVec: IVec3): IMat3;
        set(m3fMat: IMat3): IMat3;
        set(m4fMat: IMat4): IMat3;
        set(pArray: number[]): IMat3;
        set(fValue1: number, fValue2: number, fValue3: number): IMat3;
        set(v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3): IMat3;
        set(pArray1: number[], pArray2: number[], pArray3: number[]): IMat3;
        set(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number): IMat3;
        identity(): IMat3;
        add(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        subtract(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        multiply(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        multiplyVec3(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        transpose(m3fDestination?: IMat3): IMat3;
        determinant(): number;
        inverse(m3fDestination?: IMat3): IMat3;
        isEqual(m3fMat: IMat3, fEps?: number): bool;
        isDiagonal(fEps?: number): bool;
        toMat4(m4fDestination?: IMat4): IMat4;
        toQuat4(q4fDestination?: IQuat4): IQuat4;
        toString(): string;
        decompose(q4fRotation: IQuat4, v3fScale: IVec3): bool;
        row(iRow: number, v3fDestination?: IVec3): IVec3;
        column(iColumn: number, v3fDestination?: IVec3): IVec3;
    }
}
module akra {
    interface IVec3 {
    }
    interface IMat3 {
    }
    interface IMat4 {
    }
    interface IQuat4Constructor {
        ();
        (q4fQuat: IQuat4);
        (pArray: number[]);
        (fValue: number, fW: number);
        (v3fValue: IVec3, fW: number);
        (fX: number, fY: number, fZ: number, fW: number);
    }
    interface IQuat4 {
        x: number;
        y: number;
        z: number;
        w: number;
        set(): IQuat4;
        set(q4fQuat: IQuat4): IQuat4;
        set(pArray: number[]): IQuat4;
        set(fValue: number, fW: number): IQuat4;
        set(v3fValue: IVec3, fW: number): IQuat4;
        set(fX: number, fY: number, fZ: number, fW: number): IQuat4;
        multiply(q4fQuat: IQuat4, q4fDestination?: IQuat4): IQuat4;
        multiplyVec3(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        conjugate(q4fDestination?: IQuat4): IQuat4;
        inverse(q4fDestination?: IQuat4): IQuat4;
        length(): number;
        normalize(q4fDestination?: IQuat4): IQuat4;
        calculateW(q4fDestination?: IQuat4): IQuat4;
        isEqual(q4fQuat: IQuat4, fEps?: number, asMatrix?: bool): bool;
        getYaw(): number;
        getPitch(): number;
        getRoll(): number;
        toYawPitchRoll(v3fDestination?: IVec3): IVec3;
        toMat3(m3fDestination?: IMat3): IMat3;
        toMat4(m4fDestination?: IMat4): IMat4;
        toString(): string;
        mix(q4fQuat: IQuat4, fA: number, q4fDestination?: IQuat4, bShortestPath?: bool);
        smix(q4fQuat: IQuat4, fA: number, q4fDestination?: IQuat4, bShortestPath?: bool);
    }
}
module akra.math {
    class Mat3 {
        public data: Float32Array;
        constructor();
        constructor(fValue: number);
        constructor(v3fVec: IVec3);
        constructor(m3fMat: IMat3);
        constructor(m4fMat: IMat4);
        constructor(pArray: number[]);
        constructor(fValue1: number, fValue2: number, fValue3: number);
        constructor(v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3);
        constructor(pArray1: number[], pArray2: number[], pArray3: number[]);
        constructor(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number);
        public set(): IMat3;
        public set(fValue: number): IMat3;
        public set(v3fVec: IVec3): IMat3;
        public set(m3fMat: IMat3): IMat3;
        public set(m4fMat: IMat4): IMat3;
        public set(pArray: number[]): IMat3;
        public set(fValue1: number, fValue2: number, fValue3: number): IMat3;
        public set(v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3): IMat3;
        public set(pArray1: number[], pArray2: number[], pArray3: number[]): IMat3;
        public set(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number): IMat3;
        public identity(): IMat3;
        public add(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        public subtract(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        public multiply(m3fMat: IMat3, m3fDestination?: IMat3): IMat3;
        public multiplyVec3(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        public transpose(m3fDestination?: IMat3): IMat3;
        public determinant(): number;
        public inverse(m3fDestination?: IMat3): IMat3;
        public isEqual(m3fMat: IMat3, fEps?: number): bool;
        public isDiagonal(fEps?: number): bool;
        public toMat4(m4fDestination?: IMat4): IMat4;
        public toQuat4(q4fDestination?: IQuat4): IQuat4;
        public toString(): string;
        public decompose(q4fRotation: IQuat4, v3fScale: IVec3): bool;
        public row(iRow: number, v3fDestination?: IVec3): IVec3;
        public column(iColumn: number, v3fDestination?: IVec3): IVec3;
        static fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, m3fDestination?: IMat3): IMat3;
        static fromYawPitchRoll(v3fAngles: IVec3, m3fDestination?: IMat3): IMat3;
        static fromXYZ(fX: number, fY: number, fZ: number, m3fDestination?: IMat3): IMat3;
        static fromXYZ(v3fAngles: IVec3, m3fDestination?: IMat3): IMat3;
        static stackCeil : Mat3;
        static stackSize: number;
        static stackPosition: number;
        static stack: Mat3[];
    }
}
module akra {
    interface IVec2 {
    }
    interface IVec3 {
    }
    interface IColorValue {
    }
    interface IVec4Constructor {
        ();
        (fValue: number);
        (v4fVec: IVec4);
        (pArray: number[]);
        (fValue: number, v3fVec: IVec3);
        (v2fVec1: IVec2, v2fVec2: IVec2);
        (v3fVec: IVec3, fValue: number);
        (fValue1: number, fValue2: number, v2fVec: IVec2);
        (fValue1: number, v2fVec: IVec2, fValue2: number);
        (v2fVec: IVec2, fValue1: number, fValue2: number);
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number);
    }
    interface IVec4 {
        x: number;
        y: number;
        z: number;
        w: number;
        xx: IVec2;
        xy: IVec2;
        xz: IVec2;
        xw: IVec2;
        yx: IVec2;
        yy: IVec2;
        yz: IVec2;
        yw: IVec2;
        zx: IVec2;
        zy: IVec2;
        zz: IVec2;
        zw: IVec2;
        wx: IVec2;
        wy: IVec2;
        wz: IVec2;
        ww: IVec2;
        xxx: IVec3;
        xxy: IVec3;
        xxz: IVec3;
        xxw: IVec3;
        xyx: IVec3;
        xyy: IVec3;
        xyz: IVec3;
        xyw: IVec3;
        xzx: IVec3;
        xzy: IVec3;
        xzz: IVec3;
        xzw: IVec3;
        xwx: IVec3;
        xwy: IVec3;
        xwz: IVec3;
        xww: IVec3;
        yxx: IVec3;
        yxy: IVec3;
        yxz: IVec3;
        yxw: IVec3;
        yyx: IVec3;
        yyy: IVec3;
        yyz: IVec3;
        yyw: IVec3;
        yzx: IVec3;
        yzy: IVec3;
        yzz: IVec3;
        yzw: IVec3;
        ywx: IVec3;
        ywy: IVec3;
        ywz: IVec3;
        yww: IVec3;
        zxx: IVec3;
        zxy: IVec3;
        zxz: IVec3;
        zxw: IVec3;
        zyx: IVec3;
        zyy: IVec3;
        zyz: IVec3;
        zyw: IVec3;
        zzx: IVec3;
        zzy: IVec3;
        zzz: IVec3;
        zzw: IVec3;
        zwx: IVec3;
        zwy: IVec3;
        zwz: IVec3;
        zww: IVec3;
        wxx: IVec3;
        wxy: IVec3;
        wxz: IVec3;
        wxw: IVec3;
        wyx: IVec3;
        wyy: IVec3;
        wyz: IVec3;
        wyw: IVec3;
        wzx: IVec3;
        wzy: IVec3;
        wzz: IVec3;
        wzw: IVec3;
        wwx: IVec3;
        wwy: IVec3;
        wwz: IVec3;
        www: IVec3;
        xxxx: IVec4;
        xxxy: IVec4;
        xxxz: IVec4;
        xxxw: IVec4;
        xxyx: IVec4;
        xxyy: IVec4;
        xxyz: IVec4;
        xxyw: IVec4;
        xxzx: IVec4;
        xxzy: IVec4;
        xxzz: IVec4;
        xxzw: IVec4;
        xxwx: IVec4;
        xxwy: IVec4;
        xxwz: IVec4;
        xxww: IVec4;
        xyxx: IVec4;
        xyxy: IVec4;
        xyxz: IVec4;
        xyxw: IVec4;
        xyyx: IVec4;
        xyyy: IVec4;
        xyyz: IVec4;
        xyyw: IVec4;
        xyzx: IVec4;
        xyzy: IVec4;
        xyzz: IVec4;
        xyzw: IVec4;
        xywx: IVec4;
        xywy: IVec4;
        xywz: IVec4;
        xyww: IVec4;
        xzxx: IVec4;
        xzxy: IVec4;
        xzxz: IVec4;
        xzxw: IVec4;
        xzyx: IVec4;
        xzyy: IVec4;
        xzyz: IVec4;
        xzyw: IVec4;
        xzzx: IVec4;
        xzzy: IVec4;
        xzzz: IVec4;
        xzzw: IVec4;
        xzwx: IVec4;
        xzwy: IVec4;
        xzwz: IVec4;
        xzww: IVec4;
        xwxx: IVec4;
        xwxy: IVec4;
        xwxz: IVec4;
        xwxw: IVec4;
        xwyx: IVec4;
        xwyy: IVec4;
        xwyz: IVec4;
        xwyw: IVec4;
        xwzx: IVec4;
        xwzy: IVec4;
        xwzz: IVec4;
        xwzw: IVec4;
        xwwx: IVec4;
        xwwy: IVec4;
        xwwz: IVec4;
        xwww: IVec4;
        yxxx: IVec4;
        yxxy: IVec4;
        yxxz: IVec4;
        yxxw: IVec4;
        yxyx: IVec4;
        yxyy: IVec4;
        yxyz: IVec4;
        yxyw: IVec4;
        yxzx: IVec4;
        yxzy: IVec4;
        yxzz: IVec4;
        yxzw: IVec4;
        yxwx: IVec4;
        yxwy: IVec4;
        yxwz: IVec4;
        yxww: IVec4;
        yyxx: IVec4;
        yyxy: IVec4;
        yyxz: IVec4;
        yyxw: IVec4;
        yyyx: IVec4;
        yyyy: IVec4;
        yyyz: IVec4;
        yyyw: IVec4;
        yyzx: IVec4;
        yyzy: IVec4;
        yyzz: IVec4;
        yyzw: IVec4;
        yywx: IVec4;
        yywy: IVec4;
        yywz: IVec4;
        yyww: IVec4;
        yzxx: IVec4;
        yzxy: IVec4;
        yzxz: IVec4;
        yzxw: IVec4;
        yzyx: IVec4;
        yzyy: IVec4;
        yzyz: IVec4;
        yzyw: IVec4;
        yzzx: IVec4;
        yzzy: IVec4;
        yzzz: IVec4;
        yzzw: IVec4;
        yzwx: IVec4;
        yzwy: IVec4;
        yzwz: IVec4;
        yzww: IVec4;
        ywxx: IVec4;
        ywxy: IVec4;
        ywxz: IVec4;
        ywxw: IVec4;
        ywyx: IVec4;
        ywyy: IVec4;
        ywyz: IVec4;
        ywyw: IVec4;
        ywzx: IVec4;
        ywzy: IVec4;
        ywzz: IVec4;
        ywzw: IVec4;
        ywwx: IVec4;
        ywwy: IVec4;
        ywwz: IVec4;
        ywww: IVec4;
        zxxx: IVec4;
        zxxy: IVec4;
        zxxz: IVec4;
        zxxw: IVec4;
        zxyx: IVec4;
        zxyy: IVec4;
        zxyz: IVec4;
        zxyw: IVec4;
        zxzx: IVec4;
        zxzy: IVec4;
        zxzz: IVec4;
        zxzw: IVec4;
        zxwx: IVec4;
        zxwy: IVec4;
        zxwz: IVec4;
        zxww: IVec4;
        zyxx: IVec4;
        zyxy: IVec4;
        zyxz: IVec4;
        zyxw: IVec4;
        zyyx: IVec4;
        zyyy: IVec4;
        zyyz: IVec4;
        zyyw: IVec4;
        zyzx: IVec4;
        zyzy: IVec4;
        zyzz: IVec4;
        zyzw: IVec4;
        zywx: IVec4;
        zywy: IVec4;
        zywz: IVec4;
        zyww: IVec4;
        zzxx: IVec4;
        zzxy: IVec4;
        zzxz: IVec4;
        zzxw: IVec4;
        zzyx: IVec4;
        zzyy: IVec4;
        zzyz: IVec4;
        zzyw: IVec4;
        zzzx: IVec4;
        zzzy: IVec4;
        zzzz: IVec4;
        zzzw: IVec4;
        zzwx: IVec4;
        zzwy: IVec4;
        zzwz: IVec4;
        zzww: IVec4;
        zwxx: IVec4;
        zwxy: IVec4;
        zwxz: IVec4;
        zwxw: IVec4;
        zwyx: IVec4;
        zwyy: IVec4;
        zwyz: IVec4;
        zwyw: IVec4;
        zwzx: IVec4;
        zwzy: IVec4;
        zwzz: IVec4;
        zwzw: IVec4;
        zwwx: IVec4;
        zwwy: IVec4;
        zwwz: IVec4;
        zwww: IVec4;
        wxxx: IVec4;
        wxxy: IVec4;
        wxxz: IVec4;
        wxxw: IVec4;
        wxyx: IVec4;
        wxyy: IVec4;
        wxyz: IVec4;
        wxyw: IVec4;
        wxzx: IVec4;
        wxzy: IVec4;
        wxzz: IVec4;
        wxzw: IVec4;
        wxwx: IVec4;
        wxwy: IVec4;
        wxwz: IVec4;
        wxww: IVec4;
        wyxx: IVec4;
        wyxy: IVec4;
        wyxz: IVec4;
        wyxw: IVec4;
        wyyx: IVec4;
        wyyy: IVec4;
        wyyz: IVec4;
        wyyw: IVec4;
        wyzx: IVec4;
        wyzy: IVec4;
        wyzz: IVec4;
        wyzw: IVec4;
        wywx: IVec4;
        wywy: IVec4;
        wywz: IVec4;
        wyww: IVec4;
        wzxx: IVec4;
        wzxy: IVec4;
        wzxz: IVec4;
        wzxw: IVec4;
        wzyx: IVec4;
        wzyy: IVec4;
        wzyz: IVec4;
        wzyw: IVec4;
        wzzx: IVec4;
        wzzy: IVec4;
        wzzz: IVec4;
        wzzw: IVec4;
        wzwx: IVec4;
        wzwy: IVec4;
        wzwz: IVec4;
        wzww: IVec4;
        wwxx: IVec4;
        wwxy: IVec4;
        wwxz: IVec4;
        wwxw: IVec4;
        wwyx: IVec4;
        wwyy: IVec4;
        wwyz: IVec4;
        wwyw: IVec4;
        wwzx: IVec4;
        wwzy: IVec4;
        wwzz: IVec4;
        wwzw: IVec4;
        wwwx: IVec4;
        wwwy: IVec4;
        wwwz: IVec4;
        wwww: IVec4;
        set(): IVec4;
        set(fValue: number): IVec4;
        set(v4fVec: IVec4): IVec4;
        set(c4fColor: IColorValue): IVec4;
        set(pArray: number[]): IVec4;
        set(fValue: number, v3fVec: IVec3): IVec4;
        set(v2fVec1: IVec2, v2fVec2: IVec2): IVec4;
        set(v3fVec: IVec3, fValue: number): IVec4;
        set(fValue1: number, fValue2: number, v2fVec: IVec2): IVec4;
        set(fValue1: number, v2fVec: IVec2, fValue2: number): IVec4;
        set(v2fVec: IVec2, fValue1: number, fValue2: number): IVec4;
        set(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IVec4;
        clear(): IVec4;
        add(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        subtract(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        dot(v4fVec: IVec4): number;
        isEqual(v4fVec: IVec4, fEps?: number): bool;
        isClear(fEps?: number): bool;
        negate(v4fDestination?: IVec4): IVec4;
        scale(fScale: number, v4fDestination?: IVec4): IVec4;
        normalize(v4fDestination?: IVec4): IVec4;
        length(): number;
        lengthSquare(): number;
        direction(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        mix(v4fVec: IVec4, fA: number, v4fDestination?: IVec4): IVec4;
        toString(): string;
    }
}
module akra.math {
    class Mat4 implements IMat4 {
        public data: Float32Array;
        constructor();
        constructor(fValue: number);
        constructor(v4fVec: IVec4);
        constructor(m3fMat: IMat3, v3fTranslation?: IVec3);
        constructor(m4fMat: IMat4);
        constructor(pArray: number[]);
        constructor(pArray: Float32Array, bFlag: bool);
        constructor(fValue1: number, fValue2: number, fValue3: number, fValue4: number);
        constructor(v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4);
        constructor(pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]);
        constructor(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number);
        public set(): IMat4;
        public set(fValue: number): IMat4;
        public set(v4fVec: IVec4): IMat4;
        public set(m3fMat: IMat3, v3fTranslation?: IVec3): IMat4;
        public set(m4fMat: IMat4): IMat4;
        public set(pArray: number[]): IMat4;
        public set(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IMat4;
        public set(v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4): IMat4;
        public set(pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]): IMat4;
        public set(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number): IMat4;
        public identity(): IMat4;
        public add(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        public subtract(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        public multiply(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        public multiplyLeft(m4fMat: IMat4, m4fDestination?: IMat4): IMat4;
        public multiplyVec4(v4fVec: IVec4, v4fDestination?: IVec4): IVec4;
        public transpose(m4fDestination?: IMat4): IMat4;
        public determinant(): number;
        public inverse(m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        public trace(): number;
        public isEqual(m4fMat: IMat4, fEps?: number): bool;
        public isDiagonal(fEps?: number): bool;
        public toMat3(m3fDestination?: IMat3): IMat3;
        public toQuat4(q4fDestination?: IQuat4): IQuat4;
        public toRotationMatrix(m4fDestination?: IMat4): IMat4;
        public toString(): string;
        public rotateRight(fAngle: number, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;
        public rotateLeft(fAngle: number, v3fAxis: IVec3, m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        public setTranslation(v3fTranslation: IVec3): IMat4;
        /**@inline*/ 
        public getTranslation(v3fTranslation?: IVec3): IVec3;
        public translateRight(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;
        public translateLeft(v3fTranslation: IVec3, m4fDestination?: IMat4): IMat4;
        public scaleRight(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;
        public scaleLeft(v3fScale: IVec3, m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        public decompose(q4fRotation: IQuat4, v3fScale: IVec3, v3fTranslation: IVec3): bool;
        public row(iRow: number, v4fDestination?: IVec4): IVec4;
        public column(iColumn: number, v4fDestination?: IVec4): IVec4;
        public unproj(v3fScreen: IVec3, v4fDestination?: IVec4): IVec4;
        public unproj(v4fScreen: IVec4, v4fDestination?: IVec4): IVec4;
        public unprojZ(fZ: number): number;
        /**@inline*/ 
        public isOrthogonalProjection(): bool;
        static fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, m4fDestination?: IMat4): IMat4;
        static fromYawPitchRoll(v3fAngles: IVec3, m4fDestination?: IMat4): IMat4;
        static fromXYZ(fX: number, fY: number, fZ: number, m4fDestination?: IMat4): IMat4;
        static fromXYZ(v3fAngles: IVec3, m4fDestination?: IMat4): IMat4;
        static frustum(fLeft: number, fRight: number, fBottom: number, fTop: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        static perspective(fFovy: number, fAspect: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        static orthogonalProjectionAsymmetric(fLeft: number, fRight: number, fBottom: number, fTop: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        static orthogonalProjection(fWidth: number, fHeight: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        static lookAt(v3fEye: IVec3, v3fCenter: IVec3, v3fUp: IVec3, m4fDestination?: IMat4): IMat4;
        static stackCeil : Mat4;
        static stackSize: number;
        static stackPosition: number;
        static stack: Mat4[];
    }
}
module akra.math {
    class Quat4 implements IQuat4 {
        public x: number;
        public y: number;
        public z: number;
        public w: number;
        constructor();
        constructor(q4fQuat: IQuat4);
        constructor(pArray: number[]);
        constructor(fValue: number, fW: number);
        constructor(v3fValue: IVec3, fW: number);
        constructor(fX: number, fY: number, fZ: number, fW: number);
        public set(): IQuat4;
        public set(q4fQuat: IQuat4): IQuat4;
        public set(pArray: number[]): IQuat4;
        public set(fValue: number, fW: number): IQuat4;
        public set(v3fValue: IVec3, fW: number): IQuat4;
        public set(fX: number, fY: number, fZ: number, fW: number): IQuat4;
        public multiply(q4fQuat: IQuat4, q4fDestination?: IQuat4): IQuat4;
        public multiplyVec3(v3fVec: IVec3, v3fDestination?: IVec3): IVec3;
        public conjugate(q4fDestination?: IQuat4): IQuat4;
        public inverse(q4fDestination?: IQuat4): IQuat4;
        /**@inline*/ 
        public length(): number;
        public normalize(q4fDestination?: IQuat4): IQuat4;
        public calculateW(q4fDestination?: IQuat4): IQuat4;
        public isEqual(q4fQuat: IQuat4, fEps?: number, asMatrix?: bool): bool;
        public getYaw(): number;
        public getPitch(): number;
        public getRoll(): number;
        public toYawPitchRoll(v3fDestination?: IVec3): IVec3;
        public toMat3(m3fDestination?: IMat3): IMat3;
        public toMat4(m4fDestination?: IMat4): IMat4;
        /**@inline*/ 
        public toString(): string;
        public mix(q4fQuat: IQuat4, fA: number, q4fDestination?: IQuat4, bShortestPath?: bool): IQuat4;
        public smix(q4fQuat: IQuat4, fA: number, q4fDestination?: IQuat4, bShortestPath?: bool): IQuat4;
        static fromForwardUp(v3fForward: IVec3, v3fUp: IVec3, q4fDestination?: IQuat4): IQuat4;
        static fromAxisAngle(v3fAxis: IVec3, fAngle: number, q4fDestination?: IQuat4): IQuat4;
        static fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, q4fDestination?: IQuat4): IQuat4;
        static fromYawPitchRoll(v3fAngles: IVec3, q4fDestination?: IQuat4): IQuat4;
        static fromXYZ(fX: number, fY: number, fZ: number, q4fDestination?: IQuat4): IQuat4;
        static fromXYZ(v3fAngles: IVec3, q4fDestination?: IQuat4): IQuat4;
        static stackCeil : Quat4;
        static stackSize: number;
        static stackPosition: number;
        static stack: Quat4[];
    }
}
module akra.math {
    var E: number;
    var LN2: number;
    var LOG2E: number;
    var LOG10E: number;
    var PI: number;
    var SQRT1_2: number;
    var SQRT2: number;
    var LN10: number;
    var POSITIVE_INFINITY: number;
    var NEGATIVE_INFINITY: number;
    var FLOAT_PRECISION: number;
    var TWO_PI: number;
    var HALF_PI: number;
    var QUARTER_PI: number;
    var EIGHTH_PI: number;
    var PI_SQUARED: number;
    var PI_INVERSE: number;
    var PI_OVER_180: number;
    var PI_DIV_180: number;
    var NATURAL_LOGARITHM_BASE: number;
    var EULERS_CONSTANT: number;
    var SQUARE_ROOT_2: number;
    var INVERSE_ROOT_2: number;
    var SQUARE_ROOT_3: number;
    var SQUARE_ROOT_5: number;
    var SQUARE_ROOT_10: number;
    var CUBE_ROOT_2: number;
    var CUBE_ROOT_3: number;
    var FOURTH_ROOT_2: number;
    var NATURAL_LOG_2: number;
    var NATURAL_LOG_3: number;
    var NATURAL_LOG_10: number;
    var NATURAL_LOG_PI: number;
    var BASE_TEN_LOG_PI: number;
    var NATURAL_LOGARITHM_BASE_INVERSE: number;
    var NATURAL_LOGARITHM_BASE_SQUARED: number;
    var GOLDEN_RATIO: number;
    var DEGREE_RATIO: number;
    var RADIAN_RATIO: number;
    var GRAVITY_CONSTANT: number;
}
module akra.math {
    var abs: (x: number) => number;
    var acos: (x: number) => number;
    var asin: (x: number) => number;
    var atan: (x: number) => number;
    var atan2: (y: number, x: number) => number;
    var exp: (x: number) => number;
    var min: (...values: number[]) => number;
    var random: () => number;
    var sqrt: (x: number) => number;
    var log: (x: number) => number;
    var round: (x: number) => number;
    var floor: (x: number) => number;
    var ceil: (x: number) => number;
    var sin: (x: number) => number;
    var cos: (x: number) => number;
    var tan: (x: number) => number;
    var pow: (x: number, y: number) => number;
    var max: (...values: number[]) => number;
    /** @inline */
    var fpBits: (f: number) => number;
    /** @inline */
    var intBits: (i: number) => number;
    /** @inline */
    var fpSign: (f: number) => number;
    /** @inline */
    var fpExponent: (f: number) => number;
    /** @inline */
    var fpExponentSign: (f: number) => number;
    /** @inline */
    var fpPureMantissa: (f: number) => number;
    /** @inline */
    var fpMantissa: (f: number) => number;
    var fpOneBits: number;
    /** @inline */
    var flipSign: (i: number, flip: number) => number;
    /**
    * Абсолютное значение числа
    */
    var absoluteValue: (x: number) => number;
    /**
    * Pow
    */
    var raiseToPower: (x: number, y: number) => number;
    /**
    * Число положительно?
    */
    var isPositive: (a: number) => bool;
    /**
    * Число отрицательно?
    */
    var isNegative: (a: number) => bool;
    /**
    * Число одного знака?
    */
    var sameSigns: (a: number, b: number) => bool;
    /**
    * Копировать знак
    */
    var copySign: (a: number, b: number) => number;
    /**
    * Растояние между а и b меньше epsilon?
    */
    var deltaRangeTest: (a: number, b: number, epsilon: number) => bool;
    /**
    * Ограничивает value интервалом [low,high]
    */
    var clamp: (value: number, low: number, high: number) => number;
    /**
    * Ограничивает value интервалом [0,+Infinity]
    */
    var clampPositive: (value: number) => number;
    /**
    * Ограничивает value интервалом [-Infinity,0]
    */
    var clampNegative: (value: number) => number;
    /**
    * Ограничивает value интервалом [-1,1]
    */
    var clampUnitSize: (value: number) => number;
    /**
    * Номер с права начиная от нуля, самого левого установленного бита
    */
    var highestBitSet: (value: number) => number;
    /**
    * Номер с права начиная от нуля, самого правого установленного бита
    */
    var lowestBitSet: (value: number) => number;
    /**
    * Является ли число степенью двойки
    */
    var isPowerOfTwo: (value: number) => bool;
    /**
    * Округление до числа наиболее близкого к степени двойки
    */
    var nearestPowerOfTwo: (value: number) => number;
    /**
    * Округление до следующего числа являющегося к степени двойки
    */
    var ceilingPowerOfTwo: (value: number) => number;
    /**
    * Округление до предыдущего числа являющегося к степени двойки
    */
    var floorPowerOfTwo: (value: number) => number;
    /**
    * Деление по модулю
    */
    var modulus: (e: number, divisor: number) => number;
    /**
    *
    */
    var mod: (e: number, divisor: number) => number;
    /**
    * Вырвнивание числа на alignment вверх
    */
    var alignUp: (value: number, alignment: number) => number;
    /**
    * Вырвнивание числа на alignment вниз
    */
    var alignDown: (value: number, alignment: number) => number;
    /**
    * пнвертировать число
    */
    var inverse: (a: number) => number;
    /**
    * log base 2
    */
    var log2: (f: number) => number;
    /**
    * Округлени числа с определенной точностью, где округляется до значащих чисел как 1/(2^precision)
    */
    var trimFloat: (f: number, precision: number) => number;
    /**
    * Перевод дробного в целое с усеением
    */
    var realToInt32_chop: (a: number) => number;
    /**
    * Перевод дробного в целое до меньшего
    */
    var realToInt32_floor: (a: number) => number;
    /**
    * Перевод дробного в целое до большего
    */
    var realToInt32_ceil: (a: number) => number;
    /**
    * Наибольший общий делитель
    */
    var nod: (n: number, m: number) => number;
    /**
    * Наименьшее общее кратное
    */
    var nok: (n: number, m: number) => number;
    /**
    * Greatest common devider
    */
    var gcd: (n: number, m: number) => number;
    /**
    * Least common multiple
    */
    var lcm: (n: number, m: number) => number;
    var isRealEqual: (a: number, b: number, tolerance: number) => bool;
    function calcPOTtextureSize(nPixels: number): number[];
}
module akra.math {
    function vec2(): IVec2;
    function vec2(fValue: number): IVec2;
    function vec2(v2fVec: IVec2): IVec2;
    function vec2(pArray: number[]): IVec2;
    function vec2(fValue1: number, fValue2: number): IVec2;
    function vec3(): IVec3;
    function vec3(fValue: number): IVec3;
    function vec3(v3fVec: IVec3): IVec3;
    function vec3(pArray: number[]): IVec3;
    function vec3(fValue: number, v2fVec: IVec2): IVec3;
    function vec3(v2fVec: IVec2, fValue: number): IVec3;
    function vec3(fValue1: number, fValue2: number, fValue3: number): IVec3;
    function vec4(): IVec4;
    function vec4(fValue: number): IVec4;
    function vec4(v4fVec: IVec4): IVec4;
    function vec4(pArray: number[]): IVec4;
    function vec4(fValue: number, v3fVec: IVec3): IVec4;
    function vec4(v2fVec1: IVec2, v2fVec2: IVec2): IVec4;
    function vec4(v3fVec: IVec3, fValue: number): IVec4;
    function vec4(fValue1: number, fValue2: number, v2fVec: IVec2): IVec4;
    function vec4(fValue1: number, v2fVec: IVec2, fValue2: number): IVec4;
    function vec4(v2fVec: IVec2, fValue1: number, fValue2: number): IVec4;
    function vec4(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IVec4;
    function quat4(): IQuat4;
    function quat4(q4fQuat: IQuat4): IQuat4;
    function quat4(pArray: number[]): IQuat4;
    function quat4(fValue: number, fW: number): IQuat4;
    function quat4(v3fValue: IVec3, fW: number): IQuat4;
    function quat4(fX: number, fY: number, fZ: number, fW: number): IQuat4;
    function mat3(): IMat3;
    function mat3(fValue: number): IMat3;
    function mat3(v3fVec: IVec3): IMat3;
    function mat3(m3fMat: IMat3): IMat3;
    function mat3(m4fMat: IMat4): IMat3;
    function mat3(pArray: number[]): IMat3;
    function mat3(fValue1: number, fValue2: number, fValue3: number): IMat3;
    function mat3(v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3): IMat3;
    function mat3(pArray1: number[], pArray2: number[], pArray3: number[]): IMat3;
    function mat3(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number): IMat3;
    function mat4(): IMat4;
    function mat4(fValue: number): IMat4;
    function mat4(v4fVec: IVec4): IMat4;
    function mat4(m3fMat: IMat3, v3fTranslation?: IVec3): IMat4;
    function mat4(m4fMat: IMat4): IMat4;
    function mat4(pArray: number[]): IMat4;
    function mat4(pArray: Float32Array, bFlag: bool): IMat4;
    function mat4(fValue1: number, fValue2: number, fValue3: number, fValue4: number): IMat4;
    function mat4(v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4): IMat4;
    function mat4(pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]): IMat4;
    function mat4(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number): IMat4;
}
module akra {
    var Vec2: {
        stackCeil: math.Vec2;
        stackSize: number;
        stackPosition: number;
        stack: math.Vec2[];
        new(): math.Vec2;
        new(fValue: number): math.Vec2;
        new(v2fVec: IVec2): math.Vec2;
        new(pArray: number[]): math.Vec2;
        new(fValue1: number, fValue2: number): math.Vec2;
    };
    var Vec3: {
        stackCeil: math.Vec3;
        stackSize: number;
        stackPosition: number;
        stack: math.Vec3[];
        new(): math.Vec3;
        new(fValue: number): math.Vec3;
        new(v3fVec: IVec3): math.Vec3;
        new(pArray: number[]): math.Vec3;
        new(fValue: number, v2fVec: IVec2): math.Vec3;
        new(v2fVec: IVec2, fValue: number): math.Vec3;
        new(fValue1: number, fValue2: number, fValue3: number): math.Vec3;
    };
    var Vec4: {
        stackCeil: math.Vec4;
        stackSize: number;
        stackPosition: number;
        stack: math.Vec4[];
        new(): math.Vec4;
        new(fValue: number): math.Vec4;
        new(v4fVec: IVec4): math.Vec4;
        new(pArray: number[]): math.Vec4;
        new(fValue: number, v3fVec: IVec3): math.Vec4;
        new(v2fVec1: IVec2, v2fVec2: IVec2): math.Vec4;
        new(v3fVec: IVec3, fValue: number): math.Vec4;
        new(fValue1: number, fValue2: number, v2fVec: IVec2): math.Vec4;
        new(fValue1: number, v2fVec: IVec2, fValue2: number): math.Vec4;
        new(v2fVec: IVec2, fValue1: number, fValue2: number): math.Vec4;
        new(fValue1: number, fValue2: number, fValue3: number, fValue4: number): math.Vec4;
    };
    var Mat3: {
        fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, m3fDestination?: IMat3): IMat3;
        fromYawPitchRoll(v3fAngles: IVec3, m3fDestination?: IMat3): IMat3;
        fromXYZ(fX: number, fY: number, fZ: number, m3fDestination?: IMat3): IMat3;
        fromXYZ(v3fAngles: IVec3, m3fDestination?: IMat3): IMat3;
        stackCeil: math.Mat3;
        stackSize: number;
        stackPosition: number;
        stack: math.Mat3[];
        new(): math.Mat3;
        new(fValue: number): math.Mat3;
        new(v3fVec: IVec3): math.Mat3;
        new(m3fMat: IMat3): math.Mat3;
        new(m4fMat: IMat4): math.Mat3;
        new(pArray: number[]): math.Mat3;
        new(fValue1: number, fValue2: number, fValue3: number): math.Mat3;
        new(v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3): math.Mat3;
        new(pArray1: number[], pArray2: number[], pArray3: number[]): math.Mat3;
        new(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number): math.Mat3;
    };
    var Mat4: {
        fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, m4fDestination?: IMat4): IMat4;
        fromYawPitchRoll(v3fAngles: IVec3, m4fDestination?: IMat4): IMat4;
        fromXYZ(fX: number, fY: number, fZ: number, m4fDestination?: IMat4): IMat4;
        fromXYZ(v3fAngles: IVec3, m4fDestination?: IMat4): IMat4;
        frustum(fLeft: number, fRight: number, fBottom: number, fTop: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        perspective(fFovy: number, fAspect: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        orthogonalProjectionAsymmetric(fLeft: number, fRight: number, fBottom: number, fTop: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        orthogonalProjection(fWidth: number, fHeight: number, fNear: number, fFar: number, m4fDestination?: IMat4): IMat4;
        lookAt(v3fEye: IVec3, v3fCenter: IVec3, v3fUp: IVec3, m4fDestination?: IMat4): IMat4;
        stackCeil: math.Mat4;
        stackSize: number;
        stackPosition: number;
        stack: math.Mat4[];
        new(): math.Mat4;
        new(fValue: number): math.Mat4;
        new(v4fVec: IVec4): math.Mat4;
        new(m3fMat: IMat3, v3fTranslation?: IVec3): math.Mat4;
        new(m4fMat: IMat4): math.Mat4;
        new(pArray: number[]): math.Mat4;
        new(pArray: Float32Array, bFlag: bool): math.Mat4;
        new(fValue1: number, fValue2: number, fValue3: number, fValue4: number): math.Mat4;
        new(v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4): math.Mat4;
        new(pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]): math.Mat4;
        new(fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number): math.Mat4;
    };
    var Quat4: {
        fromForwardUp(v3fForward: IVec3, v3fUp: IVec3, q4fDestination?: IQuat4): IQuat4;
        fromAxisAngle(v3fAxis: IVec3, fAngle: number, q4fDestination?: IQuat4): IQuat4;
        fromYawPitchRoll(fYaw: number, fPitch: number, fRoll: number, q4fDestination?: IQuat4): IQuat4;
        fromYawPitchRoll(v3fAngles: IVec3, q4fDestination?: IQuat4): IQuat4;
        fromXYZ(fX: number, fY: number, fZ: number, q4fDestination?: IQuat4): IQuat4;
        fromXYZ(v3fAngles: IVec3, q4fDestination?: IQuat4): IQuat4;
        stackCeil: math.Quat4;
        stackSize: number;
        stackPosition: number;
        stack: math.Quat4[];
        new(): math.Quat4;
        new(q4fQuat: IQuat4): math.Quat4;
        new(pArray: number[]): math.Quat4;
        new(fValue: number, fW: number): math.Quat4;
        new(v3fValue: IVec3, fW: number): math.Quat4;
        new(fX: number, fY: number, fZ: number, fW: number): math.Quat4;
    };
    var vec2: {
        (): IVec2;
        (fValue: number): IVec2;
        (v2fVec: IVec2): IVec2;
        (pArray: number[]): IVec2;
        (fValue1: number, fValue2: number): IVec2;
    };
    var vec3: {
        (): IVec3;
        (fValue: number): IVec3;
        (v3fVec: IVec3): IVec3;
        (pArray: number[]): IVec3;
        (fValue: number, v2fVec: IVec2): IVec3;
        (v2fVec: IVec2, fValue: number): IVec3;
        (fValue1: number, fValue2: number, fValue3: number): IVec3;
    };
    var vec4: {
        (): IVec4;
        (fValue: number): IVec4;
        (v4fVec: IVec4): IVec4;
        (pArray: number[]): IVec4;
        (fValue: number, v3fVec: IVec3): IVec4;
        (v2fVec1: IVec2, v2fVec2: IVec2): IVec4;
        (v3fVec: IVec3, fValue: number): IVec4;
        (fValue1: number, fValue2: number, v2fVec: IVec2): IVec4;
        (fValue1: number, v2fVec: IVec2, fValue2: number): IVec4;
        (v2fVec: IVec2, fValue1: number, fValue2: number): IVec4;
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number): IVec4;
    };
    var quat4: {
        (): IQuat4;
        (q4fQuat: IQuat4): IQuat4;
        (pArray: number[]): IQuat4;
        (fValue: number, fW: number): IQuat4;
        (v3fValue: IVec3, fW: number): IQuat4;
        (fX: number, fY: number, fZ: number, fW: number): IQuat4;
    };
    var mat3: {
        (): IMat3;
        (fValue: number): IMat3;
        (v3fVec: IVec3): IMat3;
        (m3fMat: IMat3): IMat3;
        (m4fMat: IMat4): IMat3;
        (pArray: number[]): IMat3;
        (fValue1: number, fValue2: number, fValue3: number): IMat3;
        (v3fVec1: IVec3, v3fVec2: IVec3, v3fVec3: IVec3): IMat3;
        (pArray1: number[], pArray2: number[], pArray3: number[]): IMat3;
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number): IMat3;
    };
    var mat4: {
        (): IMat4;
        (fValue: number): IMat4;
        (v4fVec: IVec4): IMat4;
        (m3fMat: IMat3, v3fTranslation?: IVec3): IMat4;
        (m4fMat: IMat4): IMat4;
        (pArray: number[]): IMat4;
        (pArray: Float32Array, bFlag: bool): IMat4;
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number): IMat4;
        (v4fVec1: IVec4, v4fVec2: IVec4, v4fVec3: IVec4, v4fVec4: IVec4): IMat4;
        (pArray1: number[], pArray2: number[], pArray3: number[], pArray4: number[]): IMat4;
        (fValue1: number, fValue2: number, fValue3: number, fValue4: number, fValue5: number, fValue6: number, fValue7: number, fValue8: number, fValue9: number, fValue10: number, fValue11: number, fValue12: number, fValue13: number, fValue14: number, fValue15: number, fValue16: number): IMat4;
    };
}
module akra.geometry {
    class Box implements IBox {
        public left: number;
        public top: number;
        public front: number;
        public right: number;
        public bottom: number;
        public back: number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public depth : number;
        constructor();
        constructor(pExtents: IBox);
        constructor(iLeft: number, iTop: number, iRight: number, iBottom: number);
        constructor(iLeft: number, iTop: number, iFront: number, iRight: number, iBottom: number, iBack: number);
        public contains(pDest: IBox): bool;
        public setPosition(iLeft: number, iTop: number, iWidth: number, iHeight: number, iFront?: number, iDepth?: number): void;
        public isEqual(pDest: IBox): bool;
        public toString(): string;
    }
}
module akra.pixelUtil {
    class PixelBox extends geometry.Box implements IPixelBox {
        public data: Uint8Array;
        public format: EPixelFormats;
        public rowPitch: number;
        public slicePitch: number;
        constructor();
        constructor(iWidth: number, iHeight: number, iDepth: number, ePixelFormat: EPixelFormats, pPixelData?: any);
        constructor(pExtents: IBox, ePixelFormat: EPixelFormats, pPixelData?: Uint8Array);
        public setConsecutive(): void;
        public getRowSkip(): number;
        public getSliceSkip(): number;
        public isConsecutive(): bool;
        public getConsecutiveSize(): number;
        public getSubBox(pDest: IBox): PixelBox;
        public getColorAt(pColor: IColor, x: number, y: number, z?: number): IColor;
        public setColorAt(pColor: IColor, x: number, y: number, z?: number): void;
        public scale(pDest: IPixelBox, eFilter?: EFilters): bool;
        public refresh(pExtents: IBox, ePixelFormat: EPixelFormats, pPixelData: Uint8Array): void;
        public toString(): string;
    }
}
module akra {
    interface IPixelFormatDescription {
        name: string;
        elemBytes: number;
        flags: number;
        /** Component type
        */
        componentType: EPixelComponentTypes;
        /** Component count
        */
        componentCount: number;
        rbits: number;
        gbits: number;
        bbits: number;
        abits: number;
        rmask: number;
        gmask: number;
        bmask: number;
        amask: number;
        rshift: number;
        gshift: number;
        bshift: number;
        ashift: number;
    }
    module pixelUtil {
        /**@inline*/ 
        function getDescriptionFor(eFmt: EPixelFormats): IPixelFormatDescription;
        /**@inline*/ 
        function getNumElemBytes(eFormat: EPixelFormats): number;
        /**@inline*/ 
        function getNumElemBits(eFormat: EPixelFormats): number;
        /** Returns the size in memory of a region with the given extents and pixel
        format with consecutive memory layout.
        @param width
        The width of the area
        @param height
        The height of the area
        @param depth
        The depth of the area
        @param format
        The format of the area
        @return
        The size in bytes
        @remarks
        In case that the format is non-compressed, this simply returns
        width*height*depth*PixelUtil::getNumElemBytes(format). In the compressed
        case, this does serious magic.
        */
        function getMemorySize(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats): number;
        /**@inline*/ 
        function getFlags(eFormat: EPixelFormats): number;
        /**@inline*/ 
        function hasAlpha(eFormat: EPixelFormats): bool;
        /**@inline*/ 
        function isFloatingPoint(eFormat: EPixelFormats): bool;
        /**@inline*/ 
        function isCompressed(eFormat: EPixelFormats): bool;
        /**@inline*/ 
        function isDepth(eFormat: EPixelFormats): bool;
        /**@inline*/ 
        function isNativeEndian(eFormat: EPixelFormats): bool;
        /**@inline*/ 
        function isLuminance(eFormat: EPixelFormats): bool;
        /** Return wether a certain image extent is valid for this image format.
        @param width
        The width of the area
        @param height
        The height of the area
        @param depth
        The depth of the area
        @param format
        The format of the area
        @remarks For non-compressed formats, this is always true. For DXT formats,
        only sizes with a width and height multiple of 4 and depth 1 are allowed.
        */
        function isValidExtent(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats): bool;
        /** Gives the number of bits (RGBA) for a format. See remarks.
        @remarks      For non-colour formats (dxt, depth) this returns [0,0,0,0].
        */
        function getBitDepths(eFormat: EPixelFormats): number[];
        /** Gives the masks for the R, G, B and A component
        @note			Only valid for native endian formats
        */
        function getBitMasks(eFormat: EPixelFormats): number[];
        /** Gives the bit shifts for R, G, B and A component
        @note			Only valid for native endian formats
        */
        function getBitShifts(eFormat: EPixelFormats): number[];
        /**@inline*/ 
        function getFormatName(eSrcFormat: EPixelFormats): string;
        /** Returns wether the format can be packed or unpacked with the packColour()
        and unpackColour() functions. This is generally not true for compressed and
        depth formats as they are special. It can only be true for formats with a
        fixed element size.
        @return
        true if yes, otherwise false
        */
        function isAccessible(eSrcFormat: EPixelFormats): bool;
        /**@inline*/ 
        function getComponentType(eFmt: EPixelFormats): EPixelComponentTypes;
        /**@inline*/ 
        function getComponentCount(eFmt: EPixelFormats): number;
        /**@inline*/ 
        function getComponentTypeBits(eFormat: EPixelFormats): number;
        /** Gets the format from given name.
        @param  name            The string of format name
        @param  accessibleOnly  If true, non-accessible format will treat as invalid format,
        otherwise, all supported format are valid.
        @param  caseSensitive   Should be set true if string match should use case sensitivity.
        @return                The format match the format name, or PF_UNKNOWN if is invalid name.
        */
        function getFormatFromName(sName: string, isAccessibleOnly?: bool, isCaseSensitive?: bool): EPixelFormats;
        /** Gets the BNF expression of the pixel-formats.
        @note                   The string returned by this function is intended to be used as a BNF expression
        to work with Compiler2Pass.
        @param  accessibleOnly  If true, only accessible pixel format will take into account, otherwise all
        pixel formats list in EPixelFormats enumeration will being returned.
        @return                A string contains the BNF expression.
        */
        function getBNFExpressionOfPixelFormats(isAccessibleOnly?: bool): string;
        /** Returns the similar format but acoording with given bit depths.
        @param fmt      The original foamt.
        @param integerBits Preferred bit depth (pixel bits) for integer pixel format.
        Available values: 0, 16 and 32, where 0 (the default) means as it is.
        @param floatBits Preferred bit depth (channel bits) for float pixel format.
        Available values: 0, 16 and 32, where 0 (the default) means as it is.
        @return        The format that similar original format with bit depth according
        with preferred bit depth, or original format if no conversion occurring.
        */
        function getFormatForBitDepths(eFmt: EPixelFormats, iIntegerBits: number, iFloatBits: number): EPixelFormats;
        /**@inline*/ 
        function packColour(cColour: IColor, ePf: EPixelFormats, pDest: Uint8Array): void;
        /** Pack a colour value to memory
        @param r,g,b,a	The four colour components, range 0x00 to 0xFF
        @param pf		Pixelformat in which to write the colour
        @param dest		Destination memory location
        */
        function packColourUint(r: number, g: number, b: number, a: number, ePf: EPixelFormats, pDest: Uint8Array): void;
        /** Pack a colour value to memory
        @param r,g,b,a	The four colour components, range 0.0f to 1.0f
        (an exception to this case exists for floating point pixel
        formats, which don't clamp to 0.0f..1.0f)
        @param pf		Pixelformat in which to write the colour
        @param dest		Destination memory location
        */
        function packColourFloat(r: number, g: number, b: number, a: number, ePf: EPixelFormats, pDest: Uint8Array): void;
        /** Unpack a colour value from memory
        @param colour	The colour is returned here
        @param pf		Pixelformat in which to read the colour
        @param src		Source memory location
        */
        function unpackColour(cColour: IColor, ePf: EPixelFormats, pSrc: Uint8Array): void;
        /** Unpack a colour value from memory
        @param r,g,b,a	The colour is returned here (as byte)
        @param pf		Pixelformat in which to read the colour
        @param src		Source memory location
        @remarks 	This function returns the colour components in 8 bit precision,
        this will lose precision when coming from PF_A2R10G10B10 or floating
        point formats.
        */
        function unpackColourUint(rgba: IColorIValue, ePf: EPixelFormats, pSrc: Uint8Array): void;
        /** Unpack a colour value from memory
        @param r,g,b,a	The colour is returned here (as float)
        @param pf		Pixelformat in which to read the colour
        @param src		Source memory location
        */
        function unpackColourFloat(rgba: IColorValue, ePf: EPixelFormats, pSrc: Uint8Array): void;
        /** Convert consecutive pixels from one format to another. No dithering or filtering is being done.
        Converting from RGB to luminance takes the R channel.  In case the source and destination format match,
        just a copy is done.
        @param	src			Pointer to source region
        @param	srcFormat	Pixel format of source region
        @param   dst			Pointer to destination region
        @param	dstFormat	Pixel format of destination region
        */
        function bulkPixelConversion(pSrc: Uint8Array, eSrcFormat: EPixelFormats, pDest: Uint8Array, eDstFormat: EPixelFormats, iCount: number): void;
        /** Convert pixels from one format to another. No dithering or filtering is being done. Converting
        from RGB to luminance takes the R channel.
        @param	src			PixelBox containing the source pixels, pitches and format
        @param	dst			PixelBox containing the destination pixels, pitches and format
        @remarks The source and destination boxes must have the same
        dimensions. In case the source and destination format match, a plain copy is done.
        */
        function bulkPixelConversion(pSrc: IPixelBox, pDest: IPixelBox): void;
        function calculateSizeForImage(nMipLevels: number, nFaces: number, iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats): number;
    }
}
module akra.webgl {
    var maxTextureSize: number;
    var maxCubeMapTextureSize: number;
    var maxViewPortSize: number;
    var maxTextureImageUnits: number;
    var maxVertexAttributes: number;
    var maxVertexTextureImageUnits: number;
    var maxCombinedTextureImageUnits: number;
    var maxColorAttachments: number;
    var stencilBits: number;
    var colorBits: number[];
    var alphaBits: number;
    var multisampleType: number;
    var shaderVersion: number;
    var hasNonPowerOf2Textures: bool;
    var isANGLE: bool;
    var pSupportedExtensionList: string[];
    function loadExtension(pWebGLContext: WebGLRenderingContext, sExtName: string): bool;
    var isEnabled: () => bool;
    function createContext(pCanvas?: HTMLCanvasElement, pOptions?: {
            antialias?: bool;
        }): WebGLRenderingContext;
    function hasExtension(sExtName: string): bool;
    function getWebGLUsage(iFlags: number): number;
    function getWebGLFormat(eFormat: EPixelFormats): number;
    function isWebGLFormatSupport(eFormat: EPixelFormats): bool;
    function getWebGLDataType(eFormat: EPixelFormats): number;
    function getWebGLInternalFormat(eFormat: EPixelFormats): number;
    function getWebGLPrimitiveType(eType: EPrimitiveTypes): number;
    function getClosestWebGLInternalFormat(eFormat: EPixelFormats, isHWGamma?: bool): number;
    /**
    * Convert GL format to EPixelFormat.
    */
    function getClosestAkraFormat(iGLFormat: number, iGLDataType: number): EPixelFormats;
    function optionalPO2(iValue: number): number;
    function convertToWebGLformat(pSource: IPixelBox, pDest: IPixelBox): void;
    function checkFBOAttachmentFormat(eFormat: EPixelFormats): bool;
    function checkReadPixelFormat(eFormat: EPixelFormats): bool;
    function getSupportedAlternative(eFormat: EPixelFormats): EPixelFormats;
}
module akra.util {
    class ApiInfo extends Singleton implements IApiInfo {
        private bWebGL;
        private bWebAudio;
        private bFile;
        private bFileSystem;
        private bWebWorker;
        private bTransferableObjects;
        private bLocalStorage;
        private bWebSocket;
        private bGamepad;
        /**@inline*/ 
        public webGL : bool;
        public transferableObjects : bool;
        /**@inline*/ 
        public file : bool;
        /**@inline*/ 
        public fileSystem : bool;
        /**@inline*/ 
        public webAudio : bool;
        /**@inline*/ 
        public webWorker : bool;
        /**@inline*/ 
        public localStorage : bool;
        /**@inline*/ 
        public webSocket : bool;
        /**@inline*/ 
        public gamepad : bool;
        constructor();
        private chechTransferableObjects();
    }
}
module akra.info {
    function canvas(pCanvas: HTMLCanvasElement): ICanvasInfo;
    function canvas(id: string): ICanvasInfo;
    var browser: IBrowserInfo;
    var api: IApiInfo;
    var screen: IScreenInfo;
    var uri: IURI;
}
module akra {
    interface IFileMeta {
        lastModifiedDate: string;
        size: number;
    }
    interface IFile {
        path: string;
        name: string;
        mode: number;
        onread: Function;
        onopen: Function;
        position: number;
        byteLength: number;
        open(sFilename: string, iMode: number, fnCallback?: Function): void;
        open(sFilename: string, sMode: string, fnCallback?: Function): void;
        open(sFilename: string, fnCallback?: Function): void;
        open(iMode: number, fnCallback?: Function): void;
        open(fnCallback?: Function): void;
        close(): void;
        clear(fnCallback?: Function): void;
        read(fnCallback?: Function): void;
        write(sData: string, fnCallback?: Function, sContentType?: string): void;
        write(pData: ArrayBuffer, fnCallback?: Function, sContentType?: string): void;
        move(sFilename: string, fnCallback?: Function): void;
        copy(sFilename: string, fnCallback?: Function): void;
        rename(sFilename: string, fnCallback?: Function): void;
        remove(fnCallback?: Function): void;
        atEnd(): number;
        seek(iOffset: number): number;
        isOpened(): bool;
        isExists(fnCallback: Function): void;
        isLocal(): bool;
        getMetaData(fnCallback: Function): void;
    }
}
module akra {
    interface IThread {
        onmessage: Function;
        onerror: Function;
        id: number;
        send(pData: Object, pTransferables?: any[]): void;
        send(pData: ArrayBuffer, pTransferables?: any[]): void;
        send(pData: ArrayBufferView, pTransferables?: any[]): void;
    }
}
module akra {
    interface IThread {
    }
    interface IThreadManager extends IManager {
        createThread(): bool;
        occupyThread(): IThread;
        releaseThread(iThread: number): bool;
        releaseThread(pThread: IThread): bool;
    }
}
module akra.util {
    enum EThreadStatuses {
        k_WorkerBusy,
        k_WorkerFree,
    }
    interface IThreadStats {
        status: EThreadStatuses;
        creationTime: number;
        releaseTime: number;
    }
    class ThreadManager implements IThreadManager {
        private _sDefaultScript;
        private _pWorkerList;
        private _pStatsList;
        constructor(sScript?: string);
        public createThread(): bool;
        public occupyThread(): IThread;
        public terminateThread(iThread: number): bool;
        public releaseThread(pThread: IThread): bool;
        public releaseThread(iThread: number): bool;
        public initialize(): bool;
        public destroy(): void;
    }
}
module akra.io {
    enum EFileActions {
        k_Open,
        k_Read,
        k_Write,
        k_Clear,
        k_Exists,
        k_Remove,
    }
    enum EFileTransferModes {
        k_Normal,
        k_Fast,
        k_Slow,
    }
    interface IFileCommand {
        act: EFileActions;
        name: string;
        mode: number;
        pos?: number;
        transfer?: EFileTransferModes;
        data?: any;
        contentType?: string;
    }
    var getLocalFileThreadManager: () => IThreadManager;
    var getRemoteFileThreadManager: () => IThreadManager;
    class TFile implements IFile {
        /**@protected*/ 
        public _iMode: number;
        /**@protected*/ 
        public _pUri: IURI;
        /**@protected*/ 
        public _nCursorPosition: number;
        /**@protected*/ 
        public _bOpened: bool;
        /**@protected*/ 
        public _eTransferMode: EFileTransferModes;
        /**@protected*/ 
        public _pFileMeta: IFileMeta;
        /**@protected*/ 
        public _isLocal: bool;
        /**@inline*/ 
        public path : string;
        /**@inline*/ 
        public name : string;
        /**@inline*/ 
        public mode : number;
        /**@inline*/ 
        public onread : Function;
        /**@inline*/ 
        public onopen : Function;
        /**@inline*/ 
        public position : number;
        /**@inline*/ 
        public byteLength : number;
        constructor(sFilename?: string, sMode?: string, fnCallback?: Function);
        constructor(sFilename?: string, iMode?: number, fnCallback?: Function);
        public open(sFilename: string, iMode: number, fnCallback?: Function): void;
        public open(sFilename: string, fnCallback?: Function): void;
        public open(iMode: number, fnCallback?: Function): void;
        public open(fnCallback?: Function): void;
        public close(): void;
        public clear(fnCallback?: Function): void;
        public read(fnCallback?: Function): void;
        public write(sData: string, fnCallback?: Function, sContentType?: string): void;
        public write(pData: ArrayBuffer, fnCallback?: Function, sContentType?: string): void;
        public move(sFilename: string, fnCallback?: Function): void;
        public copy(sFilename: string, fnCallback?: Function): void;
        public rename(sFilename: string, fnCallback?: Function): void;
        public remove(fnCallback?: Function): void;
        public atEnd(): number;
        public seek(iOffset: number): number;
        public isOpened(): bool;
        public isExists(fnCallback: Function): void;
        /**@inline*/ 
        public isLocal(): bool;
        public getMetaData(fnCallback: Function): void;
        private setAndValidateUri(sFilename);
        private update(fnCallback?);
        private execCommand(pCommand, fnCallback, pTransferables?);
        static defaultCallback: Function;
        static execCommand(isLocal: bool, pCommand: IFileCommand, fnCallback: Function, pTransferables?: any[]): void;
    }
}
/**
* FIle implementation via <Local filesystem>.
* ONLY FOR LOCAL FILES!!
*/
module akra.io {
    function getFileSystem(fnCallback: (pFileSystem: FileSystem) => void): void;
    class LocalFile implements IFile {
        private _pUri;
        private _iMode;
        private _pFile;
        private _pFileReader;
        private _pFileEntry;
        private _nCursorPosition;
        /**@inline*/ 
        public path : string;
        /**@inline*/ 
        public name : string;
        /**@inline*/ 
        public mode : number;
        /**@inline*/ 
        public onread : Function;
        /**@inline*/ 
        public onopen : Function;
        /**@inline*/ 
        public position : number;
        /**@inline*/ 
        public byteLength : number;
        constructor(sFilename?: string, sMode?: string, fnCallback?: Function);
        constructor(sFilename?: string, iMode?: number, fnCallback?: Function);
        public open(sFilename: string, iMode: number, fnCallback?: Function): void;
        public open(sFilename: string, fnCallback?: Function): void;
        public open(iMode: number, fnCallback?: Function): void;
        public open(fnCallback?: Function): void;
        public close(): void;
        public clear(fnCallback?: Function): void;
        public read(fnCallback?: Function): void;
        public write(sData: string, fnCallback?: Function, sContentType?: string): void;
        public write(pData: ArrayBuffer, fnCallback?: Function, sContentType?: string): void;
        public move(sFilename: string, fnCallback?: Function): void;
        public copy(sFilename: string, fnCallback?: Function): void;
        public rename(sFilename: string, fnCallback?: Function): void;
        public remove(fnCallback?: Function): void;
        public atEnd(): number;
        public seek(iOffset: number): number;
        public isOpened(): bool;
        public isExists(fnCallback: Function): void;
        public isLocal(): bool;
        public getMetaData(fnCallback: Function): void;
        public setFileEntry(pFileEntry: FileEntry): bool;
        public setFile(pFile: File): bool;
        private setAndValidateUri(sFilename);
        static errorHandler(e: FileError): void;
        static createDir(pRootDirEntry: DirectoryEntry, pFolders: string[], fnCallback): void;
        static defaultCallback: Function;
    }
}
/**
* FIle implementation via <Local Storage>.
* ONLY FOR LOCAL FILES!!
*/
module akra.io {
    class StorageFile extends TFile implements IFile {
        constructor(sFilename?: string, sMode?: string, fnCallback?: Function);
        constructor(sFilename?: string, iMode?: number, fnCallback?: Function);
        public clear(fnCallback?: Function): void;
        public read(fnCallback?: Function): void;
        public write(sData: string, fnCallback?: Function, sContentType?: string): void;
        public write(pData: ArrayBuffer, fnCallback?: Function, sContentType?: string): void;
        public isExists(fnCallback?: Function): void;
        public remove(fnCallback?: Function): void;
        private readData();
        private update(fnCallback);
    }
}
module akra.io {
    enum EIO {
        IN,
        OUT,
        ATE,
        APP,
        TRUNC,
        BINARY,
        BIN,
        TEXT,
    }
    function filemode(sMode: string): number;
    var fopen: (sUri: any, pMode: any) => IFile;
}
module akra {
    interface ICodec {
        getType(): string;
        getDataType(): string;
        magicNumberMatch(pMagicNumber: Uint8Array): bool;
        magicNumberToFileExt(pMagicNumber: Uint8Array): string;
        code(pInput: Uint8Array, pData: ICodecData): Uint8Array;
        decode(pData: Uint8Array, pCodecData: ICodecData): Uint8Array;
    }
    interface ICodecData {
        dataType: string;
    }
}
module akra {
    interface IImgCodec extends ICodec {
    }
    interface IImgData extends ICodecData {
        height: number;
        width: number;
        depth: number;
        size: number;
        numMipMaps: number;
        flags: number;
        cubeFlags: number;
        format: EPixelFormats;
        numFace: number;
    }
}
module akra {
    interface ICodecMap {
        [index: string]: ICodec;
    }
    class Codec implements ICodec {
        private static _pMapCodecs;
        static registerCodec(pCodec: ICodec): void;
        static isCodecRegistered(pCodec: ICodec): bool;
        static unRegisterCodec(pCodec: ICodec): void;
        static getExtension(): string[];
        static getCodec(sExt: string): ICodec;
        static getCodec(pMagicNumber: Uint8Array): ICodec;
        public magicNumberMatch(pMagicNumber: Uint8Array): bool;
        public magicNumberToFileExt(pMagicNumber: Uint8Array): string;
        public getType(): string;
        public getDataType(): string;
        public code(pInput: Uint8Array, pData: ICodecData): Uint8Array;
        public decode(pData: Uint8Array, pCodecData: ICodecData): Uint8Array;
    }
    class CodecData implements ICodecData {
        /**@inline*/ 
        public dataType : string;
    }
}
module akra {
    class ImgCodec extends Codec implements IImgCodec {
        public getDataType(): string;
    }
    class ImgData extends CodecData implements IImgData {
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iDepth: number;
        /**@protected*/ 
        public _iSize: number;
        /**@protected*/ 
        public _iCubeFlags: number;
        /**@protected*/ 
        public _nMipMaps: number;
        /**@protected*/ 
        public _iFlags: number;
        /**@protected*/ 
        public _eFormat: EPixelFormats;
        /**@inline*/ /**@inline*/ 
        public width : number;
        /**@inline*/ /**@inline*/ 
        public height : number;
        /**@inline*/ /**@inline*/ 
        public depth : number;
        /**@inline*/ 
        public size : number;
        /**@inline*/ /**@inline*/ 
        public numMipMaps : number;
        /**@inline*/ /**@inline*/ 
        public format : EPixelFormats;
        /**@inline*/ /**@inline*/ 
        public flags : number;
        /**@inline*/ /**@inline*/ 
        public cubeFlags : number;
        /**@inline*/ 
        public numFace : number;
        /**@inline*/ 
        public dataType : string;
    }
}
module akra.core.pool.resources {
    class Img extends ResourcePoolItem implements IImg {
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _iDepth: number;
        /**@protected*/ 
        public _nMipMaps: number;
        /**@protected*/ 
        public _iFlags: number;
        /**@protected*/ 
        public _iCubeFlags: number;
        /**@protected*/ 
        public _eFormat: EPixelFormats;
        /**@protected*/ 
        public _pBuffer: Uint8Array;
        /**@inline*/ 
        public byteLength : number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public depth : number;
        /**@inline*/ 
        public numFaces : number;
        /**@inline*/ 
        public numMipMaps : number;
        /**@inline*/ 
        public format : EPixelFormats;
        /**@inline*/ 
        public flags : number;
        /**@inline*/ 
        public cubeFlags : number;
        constructor();
        public createResource(): bool;
        public destroyResource(): bool;
        public restoreResource(): bool;
        public disableResource(): bool;
        public loadResource(sFilename?: string): bool;
        public saveResource(sFilename?: string): bool;
        public create(iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): IImg;
        public freeMemory(): void;
        public set(pSrc: IImg): IImg;
        public flipY(pDest?: IImg): IImg;
        public flipX(pDest?: IImg): IImg;
        public load(sFileName: string, fnCallBack?: Function): IImg;
        public load(pData: Uint8Array, sType: string, fnCallBack?: Function): IImg;
        public load(pCanvas: HTMLCanvasElement, fnCallBack?: Function): IImg;
        public loadRawData(pData: Uint8Array, iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): IImg;
        public loadDynamicImage(pData: Uint8Array, iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): IImg;
        public convert(eFormat: EPixelFormats): bool;
        public getRawSpan(): number;
        public getBPP(): number;
        public getPixelSize(): number;
        public getData(): Uint8Array;
        public hasFlag(eFlag: EImageFlags): bool;
        public hasAlpha(): bool;
        public isCompressed(): bool;
        public isLuminance(): bool;
        public getColorAt(pColor: IColor, x: number, y: number, z?: number): IColor;
        public setColorAt(pColor: IColor, x: number, y: number, z?: number): void;
        public getPixels(iFace?: number, iMipMap?: number): IPixelBox;
        public scale(pDest: IPixelBox, eFilter?: EFilters): bool;
        public resize(iWidth: number, iHeight: number, eFilter?: EFilters): bool;
        public generatePerlinNoise(fScale: number, iOctaves: number, fFalloff: number): void;
        public randomChannelNoise(iChannel: number, iMinRange: number, iMaxRange: number): void;
        static calculateSize(nMipMaps: number, nFaces: number, iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats): number;
        static getMaxMipmaps(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats): number;
    }
}
module akra.core.pool.resources {
    class Component extends ResourcePoolItem implements IAFXComponent {
        private _pTechnique;
        private _pComposer;
        constructor();
        public create(): void;
        /**@inline*/ 
        public getTechnique(): IAFXTechniqueInstruction;
        /**@inline*/ 
        public setTechnique(pTechnique: IAFXTechniqueInstruction): void;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getTotalPasses(): number;
        /**@inline*/ 
        public getHash(iShift: number, iPass: number): string;
    }
}
module akra {
    interface IRenderDataCollection {
    }
    interface IDataFlow {
    }
    interface IVertexDeclaration {
    }
    interface IVertexData {
    }
    enum ERenderDataTypes {
        ISOLATED,
        INDEXED,
        I2I,
        DIRECT,
    }
    enum ERenderDataOptions {
        ADVANCED_INDEX,
        SINGLE_INDEX,
        RENDERABLE,
    }
    interface IRenderDataType {
        new(): IRenderData;
    }
    interface IRenderData extends IReferenceCounter {
        buffer: IRenderDataCollection;
        /**
        * Allocate data for rendering.
        */
        allocateData(pDataDecl: IVertexElementInterface[], pData: ArrayBuffer, hasIndex?: bool): number;
        allocateData(pDataDecl: IVertexElementInterface[], pData: ArrayBufferView, hasIndex?: bool): number;
        allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBuffer, hasIndex?: bool): number;
        allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBufferView, hasIndex?: bool): number;
        /**
        * Remove data from this render data.
        */
        releaseData(iDataLocation: number): void;
        allocateAttribute(pAttrDecl: IVertexDeclaration, pData: ArrayBuffer): bool;
        allocateAttribute(pAttrDecl: IVertexDeclaration, pData: ArrayBufferView): bool;
        allocateIndex(pAttrDecl: IVertexDeclaration, pData: ArrayBuffer): bool;
        allocateIndex(pAttrDecl: IVertexDeclaration, pData: ArrayBufferView): bool;
        allocateIndex(pAttrDecl: IVertexElementInterface[], pData: ArrayBuffer): bool;
        allocateIndex(pAttrDecl: IVertexElementInterface[], pData: ArrayBufferView): bool;
        addIndexSet(usePreviousDataSet?: bool, ePrimType?: EPrimitiveTypes, sName?: string): number;
        getNumIndexSet(): number;
        getIndexSetName(iSet: number): string;
        selectIndexSet(iSet: number): bool;
        selectIndexSet(sName: string): bool;
        getIndexSet(): number;
        /**
        * Specifies uses advanced index.
        */
        hasAttributes(): bool;
        useAdvancedIndex(): bool;
        useSingleIndex(): bool;
        useMultiIndex(): bool;
        /** mark index set as renderable */
        setRenderable(iIndexSet: number, bValue: bool): void;
        isRenderable(iIndexSet: number): bool;
        /** Mark this RenderData as renderable. */
        isRenderable(): bool;
        setRenderable(bValue: bool): void;
        hasSemantics(sSemantics: string, bSearchComplete?: bool): bool;
        getDataLocation(iDataLocation: number): number;
        getDataLocation(sSemantics: string): number;
        getIndices(): IBufferData;
        getPrimitiveCount(): number;
        getAdvancedIndexData(sSemantics: string): IVertexData;
        index(sData: string, sSemantics: string, useSame?: bool, iBeginWith?: number): bool;
        index(iData: number, sSemantics: string, useSame?: bool, iBeginWith?: number): bool;
        toString(): string;
        _draw(pTechnique: IRenderTechnique, pViewport: IViewport, pRenderable: IRenderableObject, pSceneObject: ISceneObject): void;
        _getFlow(iDataLocation: number): IDataFlow;
        _getFlow(sSemantics: string, bSearchComplete?: bool): IDataFlow;
        _getData(iDataLocation: number, bSearchOnlyInCurrentMap?: bool): IVertexData;
        _getData(sSemanticsn: string, bSearchOnlyInCurrentMap?: bool): IVertexData;
        _addData(pVertexData: IVertexData, iFlow?: number, eType?: ERenderDataTypes): number;
        _setup(pCollection: IRenderDataCollection, iId: number, ePrimType?: EPrimitiveTypes, eOptions?: number): bool;
        _setIndexLength(iLength: number);
    }
}
module akra {
    interface IRenderDataCollection {
    }
    interface ISkeleton {
    }
    interface IRect3d {
    }
    interface ISphere {
    }
    interface IMeshSubset {
    }
    interface ISceneNode {
    }
    interface ISceneModel {
    }
    interface ISkin {
    }
    enum EMeshOptions {
        HB_READABLE,
        RD_ADVANCED_INDEX,
    }
    enum EMeshCloneOptions {
        GEOMETRY_ONLY,
        SHARED_GEOMETRY,
    }
    interface IMeshMap {
        [name: string]: IMesh;
    }
    interface IMesh extends IEventProvider {
        flexMaterials: IMaterial[];
        name: string;
        data: IRenderDataCollection;
        length: number;
        boundingBox: IRect3d;
        boundingSphere: ISphere;
        skeleton: ISkeleton;
        hasShadow: bool;
        getOptions(): number;
        getEngine(): IEngine;
        destroy(): void;
        clone(iCloneOptions: number): IMesh;
        /** @deprecated */
        replaceFlexMaterials(pFlexMaterials): void;
        /** @deprecated */
        getFlexMaterial(iMaterial: number): IMaterial;
        getFlexMaterial(csName: string): IMaterial;
        /** @deprecated */
        addFlexMaterial(sName: string, pMaterial?: IMaterial): bool;
        /** @deprecated */
        setFlexMaterial(iMaterial: number): bool;
        setFlexMaterial(csName: string): bool;
        createSubset(sName: string, ePrimType: EPrimitiveTypes, eOptions?: number);
        freeSubset(sName: string): bool;
        getSubset(sMesh: string): IMeshSubset;
        getSubset(i: number): IMeshSubset;
        appendSubset(sName: string, pData: IRenderData): IMeshSubset;
        setSkin(pSkin: ISkin): void;
        setSkeleton(pSkeleton: ISkeleton): void;
        createSkin(): ISkin;
        createBoundingBox(): bool;
        deleteBoundingBox(): bool;
        showBoundingBox(): bool;
        hideBoundingBox(): bool;
        createAndShowSubBoundingBox(): void;
        createBoundingSphere(): bool;
        deleteBoundingSphere(): bool;
        showBoundingSphere(): bool;
        hideBoundingSphere(): bool;
        createAndShowSubBoundingSphere(): void;
        isReadyForRender(): bool;
        toSceneModel(pParent: ISceneNode, sName?: string): ISceneModel;
        /** Updtae all submeshes(apply bone matricie for skinned submeshes) */
        update(): bool;
        _drawSubset(iSubset: number): void;
        _draw(): void;
        /** notify, when one of substets added or removed shadow */
        shadow(pSubset: IMeshSubset, bShadow: bool): void;
    }
}
module akra {
    interface IVertexBuffer {
    }
    interface IVertexDeclaration {
    }
    interface IRenderDataType {
    }
    interface IBuffer {
    }
    interface IReferenceCounter {
    }
    enum ERenderDataBufferOptions {
        VB_READABLE,
        RD_ADVANCED_INDEX,
        RD_SINGLE_INDEX,
        RD_RENDERABLE,
    }
    interface IRenderDataCollection extends IBuffer, IReferenceCounter {
        buffer: IVertexBuffer;
        byteLength: number;
        length: number;
        getEngine(): IEngine;
        getOptions(): number;
        getData(sUsage: string): IVertexData;
        getData(iOffset: number): IVertexData;
        getRenderData(iSubset: number): IRenderData;
        getEmptyRenderData(ePrimType: EPrimitiveTypes, eOptions?: ERenderDataBufferOptions): IRenderData;
        getDataLocation(sSemantics: string): number;
        allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBufferView, isCommon?: bool): number;
        allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBuffer, isCommon?: bool): number;
        allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBufferView, isCommon?: bool): number;
        allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBuffer, isCommon?: bool): number;
        destroy(): void;
        _draw(): void;
        _draw(iSubset: number): void;
        _allocateData(pVertexDecl: IVertexDeclaration, iSize: number): IVertexData;
        _allocateData(pVertexDecl: IVertexDeclaration, pData: ArrayBufferView): IVertexData;
        _allocateData(pVertexDecl: IVertexDeclaration, pData: ArrayBuffer): IVertexData;
        _allocateData(pDeclData: IVertexElementInterface[], iSize: number): IVertexData;
        _allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBufferView): IVertexData;
        _allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBuffer): IVertexData;
    }
}
module akra {
    interface IAnimationFrame {
    }
    interface ISkeleton {
    }
    interface ISceneNode {
    }
    interface IMat4 {
    }
    interface IAnimationTrack {
        targetName: string;
        totalFrames: number;
        target: ISceneNode;
        duration: number;
        /** Get keyframe by number */
        getKeyFrame(iFrame: number): IAnimationFrame;
        /** Set keyframe */
        keyFrame(pFrame: IAnimationFrame): bool;
        keyFrame(fTime: number, pMatrix: IMat4): bool;
        /** Find keyframe by time */
        findKeyFrame(fTime: number): number;
        /** Calculate frame by time */
        frame(fTime: number): IAnimationFrame;
        bind(sJoint: string, pSkeleton: ISkeleton);
        bind(pSkeleton: ISkeleton);
        bind(pNode: ISceneNode);
    }
}
module akra {
    interface IExplorerFunc {
    }
    interface IReferenceCounter {
    }
    enum EEntityTypes {
        UNKNOWN,
        NODE,
        JOINT,
        SCENE_NODE,
        CAMERA,
        SHADOW_CASTER,
        MODEL_ENTRY,
        LIGHT,
        SCENE_OBJECT,
        MODEL,
        TERRAIN,
        TERRAIN_ROAM,
        TERRAIN_SECTION,
        TERRAIN_SECTION_ROAM,
        TEXT3D,
        SPRITE,
        EMITTER,
        UI_NODE,
        OBJECTS_LIMIT,
    }
    interface IEntity extends IEventProvider, IReferenceCounter {
        name: string;
        parent: IEntity;
        sibling: IEntity;
        child: IEntity;
        rightSibling: IEntity;
        type: EEntityTypes;
        depth: number;
        root: IEntity;
        destroy(bRecursive?: bool, bPromoteChildren?: bool): void;
        findEntity(sName: string): IEntity;
        explore(fn: IExplorerFunc): void;
        childOf(pParent: IEntity): bool;
        siblingCount(): number;
        childCount(): number;
        children(): IEntity[];
        childAt(i: number): IEntity;
        descCount(): number;
        update(): bool;
        recursiveUpdate(): bool;
        recursivePreUpdate(): void;
        prepareForUpdate(): void;
        hasParent(): bool;
        hasChild(): bool;
        hasSibling(): bool;
        isASibling(pSibling: IEntity): bool;
        isAChild(pChild: IEntity): bool;
        isInFamily(pEntity: IEntity, bSearchEntireTree?: bool): bool;
        isUpdated(): bool;
        hasUpdatedSubNodes(): bool;
        addSibling(pSibling: IEntity): IEntity;
        addChild(pChild: IEntity): IEntity;
        removeChild(pChild: IEntity): IEntity;
        removeAllChildren(): void;
        attachToParent(pParent: IEntity): bool;
        detachFromParent(): bool;
        promoteChildren(): void;
        relocateChildren(pParent: IEntity): void;
        toString(isRecursive?: bool, iDepth?: number): string;
        attached(): void;
        detached(): void;
        childAdded(pChild: IEntity): void;
        childRemoved(pChild: IEntity): void;
    }
}
module akra {
    interface IVec3 {
    }
    interface IMat3 {
    }
    interface IMat4 {
    }
    interface IQuat4 {
    }
    enum ENodeInheritance {
        POSITION,
        ROTSCALE,
        ALL,
    }
    interface INodeMap {
        [index: string]: INode;
    }
    interface INode extends IEntity {
        localOrientation: IQuat4;
        localPosition: IVec3;
        localScale: IVec3;
        localMatrix: IMat4;
        worldMatrix: IMat4;
        worldPosition: IVec3;
        inverseWorldMatrix: IMat4;
        normalMatrix: IMat3;
        create(): bool;
        setInheritance(eInheritance: ENodeInheritance);
        getInheritance(): ENodeInheritance;
        isWorldMatrixNew(): bool;
        isLocalMatrixNew(): bool;
        setPosition(v3fPosition: IVec3): void;
        setPosition(fX: number, fY: number, fZ: number): void;
        addPosition(v3fPosition: IVec3): void;
        addPosition(fX: number, fY: number, fZ: number): void;
        addRelPosition(v3fPosition: IVec3): void;
        addRelPosition(fX: number, fY: number, fZ: number): void;
        setRotationByMatrix(m3fRotation: IMat3): void;
        setRotationByMatrix(m4fRotation: IMat4): void;
        setRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        setRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        setRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        setRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        setRotation(q4fRotation: IQuat4): void;
        addRelRotationByMatrix(m4fRotation: IMat4): void;
        addRelRotationByMatrix(m3fRotation: IMat3): void;
        addRelRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        addRelRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        addRelRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        addRelRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        addRelRotation(q4fRotation: IQuat4): void;
        addRotationByMatrix(m4fRotation: IMat4): void;
        addRotationByMatrix(m3fRotation: IMat3): void;
        addRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        addRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        addRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        addRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        addRotation(q4fRotation: IQuat4): void;
        scale(fScale: number): void;
        scale(v3fScale: IVec3): void;
        scale(fX: number, fY: number, fZ: number): void;
    }
}
module akra {
    interface ISceneNodeMap {
        [index: string]: ISceneNode;
    }
    interface ISceneNode extends INode {
        scene: IScene3d;
    }
}
module akra {
    interface INode {
    }
    interface IJoint {
    }
    interface IJointMap {
        [index: string]: IJoint;
    }
    interface ISkeleton {
        totalBones: number;
        totalNodes: number;
        name: string;
        root: IJoint;
        getRootJoint(): IJoint;
        getRootJoints(): IJoint[];
        getJointMap(): IJointMap;
        getNodeList(): ISceneNode[];
        addRootJoint(pJoint: IJoint): bool;
        update(): bool;
        findJoint(sName: string): IJoint;
        findJointByName(sName: string): IJoint;
        attachMesh(pMesh: IMesh): bool;
        detachMesh(): void;
    }
}
module akra {
    interface IEngine {
    }
    interface IJoint extends ISceneNode {
        boneName: string;
        create(): bool;
    }
}
module akra {
    interface IEntity {
    }
    interface IExplorerFunc {
        (pEntity: IEntity): bool;
    }
}
module akra.util {
    enum EEntityStates {
        k_Updated,
        k_DescendantsUpdtated,
        k_SiblingsUpdated,
    }
    class Entity extends ReferenceCounter implements IEntity {
        /**@protected*/ 
        public _sName: string;
        /**@protected*/ 
        public _pParent: IEntity;
        /**@protected*/ 
        public _pSibling: IEntity;
        /**@protected*/ 
        public _pChild: IEntity;
        /**@protected*/ 
        public _eType: EEntityTypes;
        /**@protected*/ 
        public _iStateFlags: number;
        /**@inline*/ /**@inline*/ 
        public name : string;
        /**@inline*/ /**@inline*/ 
        public parent : IEntity;
        /**@inline*/ /**@inline*/ 
        public sibling : IEntity;
        /**@inline*/ /**@inline*/ 
        public child : IEntity;
        /**@inline*/ 
        public type : EEntityTypes;
        public rightSibling : IEntity;
        constructor(eType: EEntityTypes);
        public depth : number;
        public root : IEntity;
        public destroy(bRecursive?: bool, bPromoteChildren?: bool): void;
        public findEntity(sName: string): IEntity;
        public explore(fn: IExplorerFunc): void;
        public childOf(pParent: IEntity): bool;
        public children(): IEntity[];
        public childAt(i: number): IEntity;
        /**
        * Returns the current number of siblings of this object.
        */
        public siblingCount(): number;
        public descCount(): number;
        /**
        * Returns the current number of children of this object
        */
        public childCount(): number;
        /**@inline*/ 
        public isUpdated(): bool;
        /**@inline*/ 
        public hasUpdatedSubNodes(): bool;
        public recursiveUpdate(): bool;
        public recursivePreUpdate(): void;
        public prepareForUpdate(): void;
        /**@inline*/ 
        public hasParent(): bool;
        /**@inline*/ 
        public hasChild(): bool;
        /**@inline*/ 
        public hasSibling(): bool;
        /**
        * Checks to see if the provided item is a sibling of this object
        */
        public isASibling(pSibling: IEntity): bool;
        /** Checks to see if the provided item is a child of this object. (one branch depth only) */
        public isAChild(pChild: IEntity): bool;
        /**
        * Checks to see if the provided item is a child or sibling of this object. If SearchEntireTree
        * is TRUE, the check is done recursivly through all siblings and children. SearchEntireTree
        * is FALSE by default.
        */
        public isInFamily(pEntity: IEntity, bSearchEntireTree?: bool): bool;
        /**
        * Adds the provided ModelSpace object to the descendant list of this object. The provided
        * ModelSpace object is removed from any parent it may already belong to.
        */
        public addSibling(pSibling: IEntity): IEntity;
        /**
        * Adds the provided ModelSpace object to the descendant list of this object. The provided
        * ModelSpace object is removed from any parent it may already belong to.
        */
        public addChild(pChild: IEntity): IEntity;
        /**
        * Removes a specified child object from this parent object. If the child is not the
        * FirstChild of this object, all of the Children are searched to find the object to remove.
        */
        public removeChild(pChild: IEntity): IEntity;
        /** Removes all Children from this parent object */
        public removeAllChildren(): void;
        /** Attaches this object ot a new parent. Same as calling the parent's addChild() routine. */
        public attachToParent(pParent: IEntity): bool;
        public detachFromParent(): bool;
        /**
        * Attaches this object's children to it's parent, promoting them up the tree
        */
        public promoteChildren(): void;
        public relocateChildren(pParent: IEntity): void;
        public update(): bool;
        public toString(isRecursive?: bool, iDepth?: number): string;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public attached(): void;
        public detached(): void;
        public childAdded(child): void;
        public childRemoved(child): void;
    }
}
module akra.scene {
    enum ENodeUpdateFlags {
        k_SetForDestruction,
        k_NewOrientation,
        k_NewWorldMatrix,
        k_NewLocalMatrix,
        k_RebuildInverseWorldMatrix,
        k_RebuildNormalMatrix,
    }
    class Node extends util.Entity implements INode {
        /**@protected*/ 
        public _m4fLocalMatrix: IMat4;
        /**@protected*/ 
        public _m4fWorldMatrix: IMat4;
        /**@protected*/ 
        public _m4fInverseWorldMatrix: IMat4;
        /**@protected*/ 
        public _m3fNormalMatrix: IMat3;
        /**@protected*/ 
        public _v3fWorldPosition: IVec3;
        /**@protected*/ 
        public _qRotation: IQuat4;
        /**@protected*/ 
        public _v3fTranslation: IVec3;
        /**@protected*/ 
        public _v3fScale: IVec3;
        /**@protected*/ 
        public _iUpdateFlags: number;
        /**@protected*/ 
        public _eInheritance: ENodeInheritance;
        public create(): bool;
        /**@inline*/ /**@inline*/ 
        public localOrientation : IQuat4;
        /**@inline*/ /**@inline*/ 
        public localPosition : IVec3;
        /**@inline*/ /**@inline*/ 
        public localScale : IVec3;
        /**@inline*/ /**@inline*/ 
        public localMatrix : IMat4;
        /**@inline*/ 
        public worldMatrix : IMat4;
        /**@inline*/ 
        public worldPosition : IVec3;
        public inverseWorldMatrix : IMat4;
        public normalMatrix : IMat3;
        public update(): bool;
        public prepareForUpdate(): void;
        /**@inline*/ 
        public setInheritance(eInheritance: ENodeInheritance): void;
        /**@inline*/ 
        public getInheritance(): ENodeInheritance;
        /**@inline*/ 
        public isWorldMatrixNew(): bool;
        /**@inline*/ 
        public isLocalMatrixNew(): bool;
        private recalcWorldMatrix();
        public setPosition(v3fPosition: IVec3): void;
        public setPosition(fX: number, fY: number, fZ: number): void;
        public addPosition(v3fPosition: IVec3): void;
        public addPosition(fX: number, fY: number, fZ: number): void;
        public addRelPosition(v3fPosition: IVec3): void;
        public addRelPosition(fX: number, fY: number, fZ: number): void;
        public setRotationByMatrix(m3fRotation: IMat3): void;
        public setRotationByMatrix(m4fRotation: IMat4): void;
        public setRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        public setRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        public setRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        public setRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        public setRotation(q4fRotation: IQuat4): void;
        public addRelRotationByMatrix(m3fRotation: IMat3): void;
        public addRelRotationByMatrix(m4fRotation: IMat4): void;
        public addRelRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        public addRelRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        public addRelRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        public addRelRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        public addRelRotation(q4fRotation: IQuat4): void;
        public addRotationByMatrix(m3fRotation: IMat3): void;
        public addRotationByMatrix(m4fRotation: IMat4): void;
        public addRotationByAxisAngle(v3fAxis: IVec3, fAngle: number): void;
        public addRotationByForwardUp(v3fForward: IVec3, v3fUp: IVec3): void;
        public addRotationByEulerAngles(fYaw: number, fPitch: number, fRoll: number): void;
        public addRotationByXYZAxis(fX: number, fY: number, fZ: number): void;
        public addRotation(q4fRotation: IQuat4): void;
        public scale(fScale: number): void;
        public scale(v3fScale: IVec3): void;
        public scale(fX: number, fY: number, fZ: number): void;
        public attachToParent(pParent: IEntity): bool;
        public detachFromParent(): bool;
        public toString(isRecursive?: bool, iDepth?: number): string;
        private static _v3fTemp;
        private static _v4fTemp;
        private static _m3fTemp;
        private static _m4fTemp;
        private static _q4fTemp;
    }
}
module akra.scene {
    class SceneNode extends Node implements ISceneNode {
        /**@protected*/ 
        public _pScene: IScene3d;
        /**@inline*/ /**@inline*/ 
        public scene : IScene3d;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        public create(): bool;
        public destroy(): void;
        public attachToParent(pParent: IEntity): bool;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
}
module akra.scene {
    class Joint extends SceneNode implements IJoint {
        private _sBone;
        constructor(pScene: IScene3d);
        /**@inline*/ /**@inline*/ 
        public boneName : string;
        public create(): bool;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
    /**@inline*/ 
    function isJoint(pEntity: IEntity): bool;
}
module akra.model {
    function createSkeleton(sName?: string): ISkeleton;
}
module akra {
    interface IMat4 {
    }
    interface IQuat4 {
    }
    interface IVec3 {
    }
    interface IAnimationFrame {
    }
    enum EAnimationInterpolations {
        MATRIX_LINEAR,
        LINEAR,
    }
    interface IAnimationFrame {
        time: number;
        weight: number;
        matrix: IMat4;
        rotation: IQuat4;
        scale: IVec3;
        translation: IVec3;
        toMatrix(): IMat4;
        toMatrixFromMatrix(): IMat4;
        reset(): IAnimationFrame;
        set(pFrame: IAnimationFrame): void;
        add(pFrame: IAnimationFrame, isFirst: bool): IAnimationFrame;
        addMatrix(pFrame: IAnimationFrame): IAnimationFrame;
        mult(fScalar: number): IAnimationFrame;
        normilize(): IAnimationFrame;
        normilizeMatrix(): IAnimationFrame;
        interpolate(pStartFrame: IAnimationFrame, pEndFrame: IAnimationFrame, fBlend: number): void;
        interpolateMatrix(pStartFrame: IAnimationFrame, pEndFrame: IAnimationFrame, fBlend: number): void;
    }
}
module akra.animation {
    class Frame implements IAnimationFrame {
        public time: number;
        public weight: number;
        public matrix: IMat4;
        public rotation: IQuat4;
        public scale: IVec3;
        public translation: IVec3;
        constructor();
        constructor(fTime: number, pMatrix: IMat4);
        constructor(fTime: number, pMatrix: IMat4, fWeight: number);
        public toMatrix(): IMat4;
        public toMatrixFromMatrix(): IMat4;
        public reset(): IAnimationFrame;
        public set(pFrame: IAnimationFrame): void;
        /**
        * Добавить данные к фрейму с их весом.
        * После данного метода фрейму потребуется нормализация!!!!
        */
        public add(pFrame: IAnimationFrame, isFirst: bool): IAnimationFrame;
        public addMatrix(pFrame: IAnimationFrame): IAnimationFrame;
        public mult(fScalar: number): IAnimationFrame;
        public normilize(): IAnimationFrame;
        public normilizeMatrix(): IAnimationFrame;
        public interpolate(pStartFrame: IAnimationFrame, pEndFrame: IAnimationFrame, fBlend: number): void;
        public interpolateMatrix(pStartFrame: IAnimationFrame, pEndFrame: IAnimationFrame, fBlend: number): void;
        static stackCeil : Frame;
        static stackSize: number;
        static stackPosition: number;
        static stack: Frame[];
    }
    /**@inline*/ 
    function animationFrame(): Frame;
    function createFrame(fTime?: number, pMatrix?: IMat4, fWeight?: number): IAnimationFrame;
}
module akra.animation {
    function createTrack(sTarget?: string): IAnimationTrack;
}
module akra {
    interface ISceneNode {
    }
    interface IJoint {
    }
    interface IAnimationFrame {
    }
    interface IAnimationTrack {
    }
    interface IAnimationTarget {
        target: ISceneNode;
        index: number;
        name: string;
        track?: IAnimationTrack;
    }
    enum EAnimationTypes {
        ANIMATION,
        LIST,
        CLIP,
        CONTAINER,
        BLEND,
    }
    interface IAnimationBase extends IEventProvider {
        duration: number;
        name: string;
        type: EAnimationTypes;
        play(fRealTime: number): void;
        stop(fRealTime: number): void;
        attach(pTarget: ISceneNode): void;
        frame(sName: string, fRealTime: number): IAnimationFrame;
        apply(fRealTime: number): void;
        addTarget(sName: string, pTarget: ISceneNode): IAnimationTarget;
        setTarget(sName: string, pTarget: ISceneNode): IAnimationTarget;
        getTarget(sTargetName: string): IAnimationTarget;
        getTargetByName(sName: string): IAnimationTarget;
        getTargetList(): IAnimationTarget[];
        targetNames(): string[];
        targetList(): ISceneNode[];
        jointList(): IJoint[];
        grab(pAnimationBase: IAnimationBase, bRewrite?: bool): void;
        createAnimationMask(): FloatMap;
        played(fTime: number): void;
        stoped(fTime: number): void;
    }
}
module akra {
    interface ISceneNode {
    }
    interface IAnimationFrame {
    }
    interface IAnimationTrack {
    }
    interface IAnimation extends IAnimationBase {
        totalTracks: number;
        push(pTrack: IAnimationTrack): void;
        attach(pTarget: ISceneNode): void;
        getTracks(): IAnimationTrack[];
        getTrack(i: number): IAnimationTrack;
        frame(sName: string, fTime: number): IAnimationFrame;
        extend(pAnimation: IAnimation): void;
    }
}
module akra.animation {
    interface IAnimationTargetMap {
        [index: string]: IAnimationTarget;
    }
    class Base implements IAnimationBase {
        /**@protected*/ 
        public _pTargetMap: IAnimationTargetMap;
        /**@protected*/ 
        public _pTargetList: IAnimationTarget[];
        /**@protected*/ 
        public _fDuration: number;
        /**@protected*/ 
        public _sName: string;
        /**@protected*/ 
        public _eType: EAnimationTypes;
        constructor(eType: EAnimationTypes, sName?: string);
        /**@inline*/ 
        public type : EAnimationTypes;
        /**@inline*/ /**@inline*/ 
        public duration : number;
        /**@inline*/ /**@inline*/ 
        public name : string;
        /**@inline*/ 
        public play(fRealTime: number): void;
        /**@inline*/ 
        public stop(fRealTime: number): void;
        public attach(pTarget: ISceneNode): void;
        public frame(sName: string, fRealTime: number): IAnimationFrame;
        public apply(fRealTime: number): void;
        public addTarget(sName: string, pTarget?: ISceneNode): IAnimationTarget;
        public setTarget(sName: string, pTarget: ISceneNode): IAnimationTarget;
        public getTarget(sTargetName: string): IAnimationTarget;
        /**@inline*/ 
        public getTargetList(): IAnimationTarget[];
        /**@inline*/ 
        public getTargetByName(sName: string): IAnimationTarget;
        public targetNames(): string[];
        public targetList(): ISceneNode[];
        public jointList(): IJoint[];
        public grab(pAnimationBase: IAnimationBase, bRewrite?: bool): void;
        public createAnimationMask(): FloatMap;
        public toString(): string;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public played(fRealTime): void;
        public stoped(fRealTime): void;
    }
}
module akra.animation {
    /**@inline*/ 
    function isAnimation(pAnimation: IAnimationBase): bool;
    function createAnimation(sName?: string): IAnimation;
}
module akra {
    interface IAnimationBase {
    }
    interface IEngine {
    }
    interface ISceneNode {
    }
    interface IAnimationController extends IEventProvider {
        totalAnimations: number;
        active: IAnimationBase;
        getEngine(): IEngine;
        setOptions(eOptions): void;
        addAnimation(pAnimation: IAnimationBase): bool;
        removeAnimation(pAnimation: string): bool;
        removeAnimation(pAnimation: number): bool;
        removeAnimation(pAnimation: IAnimationBase): bool;
        findAnimation(pAnimation: string): IAnimationBase;
        findAnimation(pAnimation: number): IAnimationBase;
        findAnimation(pAnimation: IAnimationBase): IAnimationBase;
        getAnimation(iAnim: number): IAnimationBase;
        setAnimation(iAnimation: number, pAnimation: IAnimationBase): void;
        attach(pTarget: ISceneNode): void;
        play(pAnimation: string, fRealTime: number): bool;
        play(pAnimation: number, fRealTime: number): bool;
        play(pAnimation: IAnimationBase, fRealTime: number): bool;
        animationAdded(pAnimation: IAnimationBase): void;
        update(fTime: number): void;
        toString(bFullInfo?: bool);
    }
}
module akra.animation {
    class Controller implements IAnimationController {
        private _pAnimations;
        private _iOptions;
        private _pActiveAnimation;
        private _pEngine;
        /**@inline*/ 
        public totalAnimations : number;
        /**@inline*/ 
        public active : IAnimationBase;
        constructor(pEngine: IEngine, iOptions?: number);
        /**@inline*/ 
        public getEngine(): IEngine;
        public setOptions(iOptions: number): void;
        public addAnimation(pAnimation: IAnimationBase): bool;
        public removeAnimation(pAnimation: string): bool;
        public removeAnimation(pAnimation: number): bool;
        public removeAnimation(pAnimation: IAnimationBase): bool;
        public findAnimation(pAnimation: string): IAnimationBase;
        public findAnimation(pAnimation: number): IAnimationBase;
        public findAnimation(pAnimation: IAnimationBase): IAnimationBase;
        /**@inline*/ 
        public getAnimation(iAnim: number): IAnimationBase;
        public setAnimation(iAnimation: number, pAnimation: IAnimationBase): void;
        public attach(pTarget: ISceneNode): void;
        public play(pAnimation: string, fRealTime: number): bool;
        public play(pAnimation: number, fRealTime: number): bool;
        public play(pAnimation: IAnimationBase, fRealTime: number): bool;
        public update(fTime: number): void;
        public toString(bFullInfo?: bool): string;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public animationAdded(pAnimation): void;
    }
    function createController(pEngine: IEngine, iOptions?: number): IAnimationController;
}
module akra {
    interface IAnimationBase {
    }
    interface IAnimationElement {
        animation: IAnimationBase;
        weight: number;
        mask: FloatMap;
        acceleration?: number;
        time: number;
        realTime: number;
    }
    interface IAnimationBlend extends IAnimationBase {
        totalAnimations: number;
        addAnimation(pAnimation: IAnimationBase, fWeight?: number, pMask?: FloatMap): number;
        setAnimation(iAnimation: number, pAnimation: IAnimationBase, fWeight?: number, pMask?: FloatMap): number;
        getAnimationIndex(sName: string): number;
        getAnimation(sName: string): IAnimationBase;
        getAnimation(iAnimation: number): IAnimationBase;
        getAnimationWeight(sName: string): number;
        getAnimationWeight(iAnimation: number): number;
        setWeights(...pWeight: number[]): bool;
        setWeightSwitching(fWeight: number, iAnimationFrom: number, iAnimationTo: number): bool;
        setAnimationWeight(iAnimation: number, fWeight: number): bool;
        setAnimationWeight(fWeight: number): bool;
        setAnimationMask(sName: string, pMask: FloatMap): bool;
        setAnimationMask(iAnimation: number, pMask: FloatMap): bool;
        getAnimationMask(sName: string): FloatMap;
        getAnimationMask(iAnimation: number): FloatMap;
        getAnimationAcceleration(sName: string): number;
        getAnimationAcceleration(iAnimation: number): number;
        createAnimationMask(iAnimation?: number): FloatMap;
        durationUpdated(fDuration: number);
    }
}
module akra.animation {
    /**@inline*/ 
    function isBlend(pAnimation: IAnimationBase): bool;
    function createBlend(sName?: string): IAnimationBlend;
}
module akra.core.pool.resources {
    class Collada extends ResourcePoolItem implements ICollada {
        constructor();
        public attachToScene(pNode: ISceneNode): IModelEntry;
        public parse(sXMLData: string, pOptions?: IColladaLoadOptions): bool;
        private polygonToTriangles(pXML, iStride);
        private polylistToTriangles(pXML, iStride);
        private trifanToTriangles(pXML, iStride);
        private tristripToTriangles(pXML, iStride);
        private eachNode(pXMLList, fnCallback, nMax?);
        private eachChild(pXML, fnCallback);
        private eachByTag(pXML, sTag, fnCallback, nMax?);
        private findNode(pNodes, sNode?, fnNodeCallback?);
        private COLLADATranslateMatrix(pXML);
        private COLLADARotateMatrix(pXML);
        private COLLADAScaleMatrix(pXML);
        private COLLADAData(pXML);
        private COLLADAGetSourceData(pSource, pFormat);
        private COLLADATransform(pXML, id?);
        private COLLADANewParam(pXML);
        private COLLADAAsset(pXML);
        private COLLADALibrary(pXML, pTemplate);
        private COLLADAAccessor(pXML);
        private COLLADAInput(pXML, iOffset?);
        private COLLADATechniqueCommon(pXML);
        private COLLADASource(pXML);
        private COLLADAVertices(pXML);
        private COLLADAJoints(pXML);
        private COLLADAPolygons(pXML, sType);
        private COLLADAVertexWeights(pXML);
        private COLLADAMesh(pXML);
        private COLLADAGeometrie(pXML);
        private COLLADASkin(pXML);
        private COLLADAController(pXML);
        private COLLADAImage(pXML);
        private COLLADASurface(pXML);
        private COLLADATexture(pXML);
        private COLLADASampler2D(pXML);
        private COLLADAPhong(pXML);
        private COLLADAEffectTechnique(pXML);
        private COLLADAProfileCommon(pXML);
        private COLLADAEffect(pXML);
        private COLLADAMaterial(pXML);
        private COLLADANode(pXML, iDepth?);
        private COLLADAVisualScene(pXML);
        private COLLADABindMaterial(pXML);
        private COLLADAInstanceEffect(pXML);
        private COLLADAInstanceController(pXML);
        private COLLADAInstanceGeometry(pXML);
        private COLLADAScene(pXML);
        private COLLADAAnimationSampler(pXML);
        private COLLADAAnimationChannel(pXML);
        private COLLADAAnimation(pXML);
        private source(sUrl);
        private link(sId, pTarget);
        private target(sPath);
        private buildAnimationTrack(pChannel);
        private buildAnimationTrackList(pAnimationData);
        private buildAnimation(pAnimationData);
        private buildAnimations(pAnimationsList?);
        private buildAssetTransform(pNode, pAsset?);
        private buildDeclarationFromAccessor(sSemantic, pAccessor);
        private buildDefaultMaterials(pMesh);
        private buildMaterials(pMesh, pGeometryInstance);
        private buildSkeleton(pSkeletonsList);
        private buildMesh(pGeometryInstance);
        private buildSkinMesh(pControllerInstance);
        private buildMeshInstance(pGeometries, pSceneNode?);
        private buildSkinMeshInstance(pControllers, pSceneNode?);
        private buildMeshes();
        private buildSceneNode(pNode, pParentNode);
        private buildJointNode(pNode, pParentNode);
        private buildNodes(pNodes, pParentNode?);
        private buildScene(pRootNode);
        private buildInititalPose(pNodes, pSkeleton);
        private buildInitialPoses(pPoseSkeletons?);
        private buildComplete();
        private setOptions(pUserOptions);
        private setXMLRoot(pXML);
        private getXMLRoot();
        private findMesh(sName);
        private addMesh(pMesh);
        private sharedBuffer(pBuffer?);
        private prepareInput(pInput);
        private isJointsVisualizationNeeded();
        public isVisualSceneLoaded(): bool;
        public isAnimationLoaded(): bool;
        private isSceneNeeded();
        private isAnimationNeeded();
        private isPoseExtractionNeeded();
        private isWireframeEnabled();
        private getSkeletonsOutput();
        private getVisualScene();
        private getImageOptions();
        private getAnimations();
        public getAsset(): IColladaAsset;
        private isLibraryLoaded(sLib);
        private isLibraryExists(sLib);
        private getLibrary(sLib);
        public getBasename(): string;
        public getFilename(): string;
        private setFilename(sName);
        private checkLibraries(pXML, pTemplates);
        private readLibraries(pXML, pTemplates);
        static DEFAULT_OPTIONS: IColladaLoadOptions;
        private static SCENE_TEMPLATE;
        private static ANIMATION_TEMPLATE;
        private static COLLADA_MATERIAL_NAMES;
        private _pModel;
        private _pOptions;
        private _pLinks;
        private _pLib;
        private _pCache;
        private _pAsset;
        private _pVisualScene;
        private _pAnimations;
        private _sFilename;
        private _pXMLRoot;
        public loadResource(sFilename?: string, pOptions?: IColladaLoadOptions): bool;
        public attachToScene(pScene: IScene3d, pController?: IAnimationController): IModelEntry;
        public attachToScene(pNode: ISceneNode, pController?: IAnimationController): IModelEntry;
    }
}
module akra.util {
    interface IOperation {
        type: EOperationType;
        rule?: IRule;
        index?: number;
    }
    interface IItem {
        isEqual(pItem: IItem, eType?: EParserType): bool;
        isParentItem(pItem: IItem): bool;
        isChildItem(pItem: IItem): bool;
        mark(): string;
        end(): string;
        nextMarked(): string;
        toString(): string;
        isExpected(sSymbol: string): bool;
        addExpected(sSymbol: string): bool;
        rule: IRule;
        position: number;
        index: number;
        state: IState;
        expectedSymbols: BoolMap;
        isNewExpected: bool;
        length: number;
    }
    interface IState {
        hasItem(pItem: IItem, eType: EParserType): IItem;
        hasParentItem(pItem: IItem): IItem;
        hasChildItem(pItem: IItem): IItem;
        hasRule(pRule: IRule, iPos: number): bool;
        isEmpty(): bool;
        isEqual(pState: IState, eType: EParserType): bool;
        push(pItem: IItem): void;
        tryPush_LR0(pRule: IRule, iPos: number): bool;
        tryPush_LR(pRule: IRule, iPos: number, sExpectedSymbol: string): bool;
        deleteNotBase(): void;
        getNextStateBySymbol(sSymbol: string): IState;
        addNextState(sSymbol: string, pState: IState): bool;
        toString(isBase: bool): string;
        items: IItem[];
        numBaseItems: number;
        index: number;
        nextStates: IStateMap;
    }
    interface IStateMap {
        [index: string]: IState;
    }
    class ParseTree implements IParseTree {
        private _pRoot;
        private _pNodes;
        private _pNodesCountStack;
        private _isOptimizeMode;
        /**@inline*/ /**@inline*/ 
        public root : IParseNode;
        constructor();
        public setRoot(): void;
        public setOptimizeMode(isOptimize: bool): void;
        public addNode(pNode: IParseNode): void;
        public reduceByRule(pRule: IRule, eCreate?: ENodeCreateMode): void;
        public toString(): string;
        public clone(): IParseTree;
        /**@inline*/ 
        public getNodes(): IParseNode[];
        /**@inline*/ 
        public getLastNode(): IParseNode;
        private addLink(pParent, pNode);
        private cloneNode(pNode);
        private toStringNode(pNode, sPadding?);
    }
    interface IOperationMap {
        [grammarSymbol: string]: IOperation;
        [stateIndex: number]: IOperation;
    }
    interface IOperationDMap {
        [stateIndex: number]: IOperationMap;
    }
    interface IRuleMap {
        [ruleIndex: number]: IRule;
        [ruleName: string]: IRule;
    }
    interface IRuleDMap {
        [ruleIndex: number]: IRuleMap;
        [ruleName: string]: IRuleMap;
    }
    interface IRuleFunctionMap {
        [grammarSymbolOrFuncName: string]: IRuleFunction;
    }
    interface IRuleFunctionDMap {
        [stateIndex: number]: IRuleFunctionMap;
    }
    interface IAdditionalFuncInfo {
        name: string;
        position: number;
        rule: IRule;
    }
    class Parser implements IParser {
        private _sSource;
        private _iIndex;
        private _sFileName;
        private _pSyntaxTree;
        private _pTypeIdMap;
        private _pLexer;
        private _pStack;
        private _pToken;
        private _fnFinishCallback;
        private _pCaller;
        private _pSymbolMap;
        private _pSyntaxTable;
        private _pReduceOperationsMap;
        private _pShiftOperationsMap;
        private _pSuccessOperation;
        private _pFirstTerminalsDMap;
        private _pFollowTerminalsDMap;
        private _pRulesDMap;
        private _pStateList;
        private _nRules;
        private _pAdditionalFuncInfoList;
        private _pAdditionalFunctionsMap;
        private _pAdidtionalFunctByStateDMap;
        private _eType;
        private _pGrammarSymbols;
        private _pRuleCreationModeMap;
        private _eParseMode;
        private _pStatesTempMap;
        private _pBaseItemList;
        private _pExpectedExtensionDMap;
        constructor();
        public isTypeId(sValue: string): bool;
        public returnCode(pNode: IParseNode): string;
        public init(sGrammar: string, eMode?: EParseMode, eType?: EParserType): bool;
        public parse(sSource: string, fnFinishCallback?: IFinishFunc, pCaller?: any): EParserCode;
        public setParseFileName(sFileName: string): void;
        public getParseFileName(): string;
        public pause(): EParserCode;
        public resume(): EParserCode;
        public printStates(isBaseOnly?: bool): void;
        public printState(iStateIndex: number, isBaseOnly?: bool): void;
        public getGrammarSymbols(): StringMap;
        /**@inline*/ 
        public getSyntaxTree(): IParseTree;
        public _saveState(): IParserState;
        public _loadState(pState: IParserState): void;
        /**@protected*/ 
        public addAdditionalFunction(sFuncName: string, fnRuleFunction: IRuleFunction): void;
        /**@protected*/ 
        public addTypeId(sIdentifier: string): void;
        /**@protected*/ 
        public defaultInit(): void;
        private _error(eCode, pErrorInfo);
        private clearMem();
        private hasState(pState, eType);
        private isTerminal(sSymbol);
        private pushState(pState);
        private pushBaseItem(pItem);
        private tryAddState(pState, eType);
        private hasEmptyRule(sSymbol);
        private pushInSyntaxTable(iIndex, sSymbol, pOperation);
        private addStateLink(pState, pNextState, sSymbol);
        private firstTerminal(sSymbol);
        private followTerminal(sSymbol);
        private firstTerminalForSet(pSet, pExpected);
        private generateRules(sGrammarSource);
        private generateFunctionByStateMap();
        private generateFirstState(eType);
        private generateFirstState_LR0();
        private generateFirstState_LR();
        private closure(pState, eType);
        private closure_LR0(pState);
        private closure_LR(pState);
        private nexeState(pState, sSymbol, eType);
        private nextState_LR0(pState, sSymbol);
        private nextState_LR(pState, sSymbol);
        private deleteNotBaseItems();
        private closureForItem(pRule, iPos);
        private addLinkExpected(pItem, pItemX);
        private determineExpected(pTestState, sSymbol);
        private generateLinksExpected();
        private expandExpected();
        private generateStates(eType);
        private generateStates_LR0();
        private generateStates_LR();
        private generateStates_LALR();
        private calcBaseItem();
        private printExpectedTable();
        private addReducing(pState);
        private addShift(pState);
        private buildSyntaxTable();
        private readToken();
        private operationAdditionalAction(iStateIndex, sGrammarSymbol);
        private resumeParse();
        private statesToString(isBaseOnly?);
        private operationToString(pOperation);
        private ruleToString(pRule);
        private convertGrammarSymbol(sSymbol);
    }
}
module akra.util {
    class EffectParser extends Parser {
        private _pIncludedFilesMap;
        constructor();
        /**@protected*/ 
        public defaultInit(): void;
        public _addIncludedFile(sFileName: string): void;
        private _addType();
        private normalizeIncludePath(sFile);
        private _includeCode();
        public _saveState(): IParserState;
        public _loadState(pState: IParserState): void;
    }
    var parser: EffectParser;
    function initAFXParser(sGrammar: string): void;
}
module akra.core.pool.resources {
    class EffectData extends ResourcePoolItem {
        private _pSyntaxTree;
        public loadResource(sFileName?: string): bool;
        public _initFromParsedEffect(eCode: EParserCode, sFileName: string): void;
        public _initFromBinaryData(pData: Uint8Array, sFileName: string): void;
    }
}
module akra.core.pool.resources {
    class HardwareBuffer extends ResourcePoolItem implements IHardwareBuffer {
        /**@protected*/ 
        public _iFlags: number;
        /**@protected*/ 
        public _isLocked: bool;
        /**@protected*/ 
        public _iLockStart: number;
        /**@protected*/ 
        public _iLockSize: number;
        /**@protected*/ 
        public _pBackupCopy: HardwareBuffer;
        /**@protected*/ 
        public _pBackupUpdated: bool;
        /**@protected*/ 
        public _bIgnoreHardwareUpdate: bool;
        public byteLength: number;
        public length: number;
        constructor();
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public isDynamic(): bool;
        /**@inline*/ 
        public isStatic(): bool;
        /**@inline*/ 
        public isStream(): bool;
        /**@inline*/ 
        public isReadable(): bool;
        /**@inline*/ 
        public isBackupPresent(): bool;
        /**@inline*/ 
        public isSoftware(): bool;
        /**@inline*/ 
        public isAligned(): bool;
        /**@inline*/ 
        public isLocked(): bool;
        public clone(pSrc: IHardwareBuffer): bool;
        /**@inline*/ 
        public getFlags(): number;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: Uint8Array, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public copyData(pSrcBuffer: IHardwareBuffer, iSrcOffset: number, iDstOffset: number, iSize: number, bDiscardWholeBuffer?: bool): bool;
        public create(iSize: number, iFlags?: number): bool;
        public destroy(): void;
        public resize(iSize: number): bool;
        public lock(iLockFlags: number): any;
        public lock(iOffset: number, iSize: number, iLockFlags?: number): any;
        public unlock(): void;
        public restoreFromBackup(): bool;
        public createResource(): bool;
        public destroyResource(): bool;
        public restoreResource(): bool;
        public disableResource(): bool;
        /**@protected*/ 
        public lockImpl(iOffset: number, iSize: number, iLockFlags: number): any;
        /**@protected*/ 
        public unlockImpl(): void;
        /**@protected*/ 
        public copyBackupToRealImpl(pRealData: any, pBackupData: any, iLockFlags: number): void;
    }
}
module akra.webgl {
    class WebGLPixelBuffer extends core.pool.resources.HardwareBuffer implements IPixelBuffer {
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _iDepth: number;
        /**@protected*/ 
        public _iRowPitch: number;
        /**@protected*/ 
        public _iSlicePitch: number;
        /**@protected*/ 
        public _eFormat: EPixelFormats;
        /**@protected*/ 
        public _pCurrentLock: IPixelBox;
        /**@protected*/ 
        public _pLockedBox: IBox;
        /**@protected*/ 
        public _iCurrentLockFlags: number;
        /**@protected*/ 
        public _pBuffer: IPixelBox;
        /**@protected*/ 
        public _iWebGLInternalFormat: number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public depth : number;
        /**@inline*/ 
        public format : number;
        constructor();
        /**@protected*/ 
        public upload(pData: IPixelBox, pDestBox: IBox): void;
        /**@protected*/ 
        public download(pData: IPixelBox): void;
        public _bindToFramebuffer(pAttachment: number, iZOffset: number): void;
        public _getWebGLFormat(): number;
        public _clearRTT(iZOffset: number): void;
        public reset(): void;
        public reset(iSize: number): void;
        public reset(iWidth: number, iHeight: number): void;
        public create(iFlags: number): bool;
        public create(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats, iFlags: number): bool;
        public destroy(): void;
        public destroyResource(): bool;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: Uint8Array, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public writeData(pData: ArrayBuffer, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public blit(pSource: IPixelBuffer): bool;
        public blit(pSource: IPixelBuffer, pSrcBox: IBox, pDestBox: IBox): bool;
        public blitFromMemory(pSource: IPixelBox): bool;
        public blitFromMemory(pSource: IPixelBox, pDestBox: IBox): bool;
        public blitToMemory(pDest: IPixelBox): bool;
        public blitToMemory(pSrcBox: IBox, pDest: IPixelBox): bool;
        public getRenderTarget(): IRenderTarget;
        public lock(iLockFlags: number): any;
        public lock(iOffset: number, iSize: number, iLockFlags?: number): any;
        public lock(pLockBox: IBox, iLockFlags?: number): IPixelBox;
        /**@protected*/ 
        public allocateBuffer(): void;
        /**@protected*/ 
        public freeBuffer(): void;
        /**@protected*/ 
        public lockImpl(iOffset: number, iSize: number, iLockFlags: number): any;
        /**@protected*/ 
        public lockImpl(pLockBox: IBox, iLockFlags: number): IPixelBox;
        /**@protected*/ 
        public unlockImpl(): void;
    }
}
module akra.core.pool.resources {
    enum ETextureForcedFormatFlags {
        FORCEMIPLEVELS,
        FORCEFORMAT,
        FORCESIZE,
    }
    class Texture extends ResourcePoolItem implements ITexture {
        /**@protected*/ 
        public _iFlags: number;
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _iDepth: number;
        /**@protected*/ 
        public _eFormat: EPixelFormats;
        /**@protected*/ 
        public _nMipLevels: number;
        /**@protected*/ 
        public _nRequestedMipLevels: number;
        /**@protected*/ 
        public _eTextureType: ETextureTypes;
        /**@protected*/ 
        public _pParams: IntMap;
        /**@protected*/ 
        public _isInternalResourceCreated: bool;
        /**@protected*/ 
        public _isMipmapsHardwareGenerated: bool;
        constructor();
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public depth : number;
        /**@inline*/ 
        public format : EPixelFormats;
        /**@inline*/ 
        public textureType : ETextureTypes;
        /**@inline*/ 
        public mipLevels : number;
        /**@inline*/ 
        public getFlags(): number;
        /**@inline*/ 
        public setFlags(iFlags: ETextureFlags): void;
        /**@inline*/ 
        public isTexture2D(): bool;
        /**@inline*/ 
        public isTextureCube(): bool;
        /**@inline*/ 
        public isCompressed(): bool;
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public calculateSize(): number;
        /**@inline*/ 
        public getNumFaces(): number;
        /**@inline*/ 
        public getSize(): number;
        public reset(): void;
        public reset(iSize: number): void;
        public reset(iWidth: number, iHeight: number): void;
        public getBuffer(iFace?: number, iMipmap?: number): IPixelBuffer;
        public create(iWidth: number, iHeight: number, iDepth: number, cFillColor?: IColor, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        public create(iWidth: number, iHeight: number, iDepth: number, pPixels?: Array, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        public create(iWidth: number, iHeight: number, iDepth: number, pPixels?: ArrayBufferView, eFlags?: ETextureFlags, nMipLevels?: number, nFaces?: number, eTextureType?: ETextureTypes, eFormat?: EPixelFormats): bool;
        public loadResource(sFilename?: string): bool;
        public _onImageLoad(pImage: IImg): void;
        public destroyResource(): bool;
        public setFilter(eParam: ETextureParameters, eValue: ETextureFilters): bool;
        public setWrapMode(eParam: ETextureParameters, eValue: ETextureWrapModes): bool;
        public getFilter(eParam: ETextureParameters): ETextureFilters;
        public getWrapMode(eParam: ETextureParameters): ETextureWrapModes;
        /**@protected*/ 
        public _setFilterInternalTexture(eParam: ETextureParameters, eValue: ETextureFilters): bool;
        /**@protected*/ 
        public _setWrapModeInternalTexture(eParam: ETextureParameters, eValue: ETextureWrapModes): bool;
        /**@protected*/ 
        public _getFilterInternalTexture(eParam: ETextureParameters): ETextureFilters;
        /**@protected*/ 
        public _getWrapModeInternalTexture(eParam: ETextureParameters): ETextureWrapModes;
        public loadRawData(pData: Uint8Array, iWidth: number, iHeight: number, iDepth?: number, eFormat?: EPixelFormats, nFaces?: number, nMipMaps?: number): bool;
        public loadImage(pImage: IImg): bool;
        public loadImages(pImages: IImg[]): bool;
        public _loadImages(pImageList: IImg[]): bool;
        public _loadImages(pImage: IImg): bool;
        public convertToImage(pDestImage: IImg, bIncludeMipMaps: bool): void;
        public copyToTexture(pTarget: ITexture): void;
        public createInternalTexture(cFillColor?: IColor): bool;
        public freeInternalTexture(): bool;
        /**@protected*/ 
        public _createInternalTextureImpl(cFillColor?: IColor): bool;
        /**@protected*/ 
        public freeInternalTextureImpl(): bool;
        public setPixelRGBA(i1: number, i2: number, iTextureWidth: number, iTextureHeight: number, pBuffer: Uint8Array): void;
    }
}
module akra {
    interface IDepthBuffer extends IRenderResource {
        bitDepth: number;
        width: number;
        height: number;
        create(iBitDepth: number, iWidth: number, iHeight: number, bManual: bool): void;
        isManual(): bool;
        isCompatible(pTarget: IRenderTarget): bool;
        _notifyRenderTargetAttached(pTarget: IRenderTarget): void;
        _notifyRenderTargetDetached(pTarget: IRenderTarget): void;
    }
}
module akra {
    interface IFPSStat {
        last: number;
        avg: number;
        best: number;
        worst: number;
    }
    interface ITimeStat {
        best: number;
        worst: number;
    }
    interface IFrameStats {
        fps: IFPSStat;
        time: ITimeStat;
        polygonsCount: number;
    }
}
module akra {
    interface IRect3d {
    }
    interface IRenderableObject {
    }
    interface IViewport {
    }
    interface ISceneObject extends ISceneNode {
        worldBounds: IRect3d;
        totalRenderable: number;
        hasShadow: bool;
        localBounds: IRect3d;
        getRenderable(i?: number): IRenderableObject;
        getObjectFlags(): number;
        accessLocalBounds(): IRect3d;
        isWorldBoundsNew(): bool;
        prepareForRender(pViewport: IViewport): void;
        worldBoundsUpdated(): void;
    }
}
module akra {
    interface IViewport {
    }
    interface IVec3 {
    }
    interface IMat4 {
    }
    interface IRect3d {
    }
    interface IFrustum {
    }
    interface ISceneBuilder {
    }
    interface IObjectArray {
    }
    enum ECameraParameters {
        CONST_ASPECT,
    }
    enum ECameraTypes {
        PERSPECTIVE,
        ORTHO,
        OFFSET_ORTHO,
    }
    interface ICamera extends ISceneNode {
        viewMatrix: IMat4;
        projectionMatrix: IMat4;
        projViewMatrix: IMat4;
        targetPos: IVec3;
        fov: number;
        aspect: number;
        nearPlane: number;
        farPlane: number;
        viewDistance: number;
        searchRect: IRect3d;
        frustum: IFrustum;
        setParameter(eParam: ECameraParameters, pValue: any): void;
        isConstantAspect(): bool;
        setProjParams(fFOV: number, fAspect: number, fNearPlane: number, fFarPlane: number): void;
        setOrthoParams(fWidth: number, fHeight: number, fNearPlane: number, fFarPlane: number): void;
        setOffsetOrthoParams(fMinX: number, fMaxX: number, fMinY: number, fMaxY: number, fNearPlane: number, fFarPlane: number): void;
        isProjParamsNew(): bool;
        recalcProjMatrix(): void;
        lookAt(v3fFrom: IVec3, v3fCenter: IVec3, v3fUp?: IVec3);
        lookAt(v3fCenter: IVec3, v3fUp?: IVec3);
        display(iList?: number): IObjectArray;
        _renderScene(pViewport: IViewport): void;
        _keepLastViewport(pViewport: IViewport): void;
        _getLastViewport(): IViewport;
        _getNumRenderedFaces(): number;
        _notifyRenderedFaces(nFaces: number): void;
    }
}
module akra {
    interface ITexture {
    }
    interface IPixelBox {
    }
    enum EFramebuffer {
        FRONT,
        BACK,
        AUTO,
    }
    enum EStatFlags {
        NONE,
        FPS,
        AVG_FPS,
        BEST_FPS,
        WORST_FPS,
        TRIANGLE_COUNT,
        ALL,
    }
    interface IRenderTarget extends IEventProvider {
        name: string;
        width: number;
        height: number;
        colorDepth: number;
        totalViewports: number;
        priority: number;
        getRenderer(): IRenderer;
        getDepthBuffer(): IDepthBuffer;
        attachDepthBuffer(pBuffer: IDepthBuffer): bool;
        attachDepthPixelBuffer(pBuffer: IPixelBuffer): bool;
        attachDepthTexture(pTexture: ITexture): bool;
        detachDepthBuffer(): void;
        detachDepthTexture(): void;
        detachDepthPixelBuffer(): void;
        destroy(): void;
        update(): void;
        updateStats(): void;
        getCustomAttribute(sName: string): any;
        addViewport(pCamera: ICamera, csRenderMethod?: string, iZIndex?: number, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number): IViewport;
        addViewport(pCamera: ICamera, eType?: number, iZIndex?: number, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number): IViewport;
        getViewport(iIndex: number): IViewport;
        getViewportByZIndex(iZIndex: number): IViewport;
        hasViewportByZIndex(iZIndex: number): bool;
        removeViewport(iZIndex: number): bool;
        removeAllViewports(): number;
        getPolygonCount(): number;
        getStatistics(): IFrameStats;
        getLastFPS(): number;
        getAverageFPS(): number;
        getBestFPS(): number;
        getWorstFPS(): number;
        getBestFrameTime(): number;
        getWorstFrameTime(): number;
        resetStatistics(): void;
        isActive(): bool;
        setActive(isActive?: bool): void;
        setAutoUpdated(isAutoUpdate?: bool): void;
        isAutoUpdated(): bool;
        isPrimary(): bool;
        readPixels(ppDest?: IPixelBox, eFramebuffer?: EFramebuffer): IPixelBox;
        _beginUpdate(): void;
        _updateViewport(iZIndex: number, bUpdateStatistics?: bool): void;
        _updateViewport(pViewport: IViewport, bUpdateStatistics?: bool): void;
        _updateAutoUpdatedViewports(bUpdateStatistics?: bool): void;
        _endUpdate(): void;
        preUpdate(): void;
        postUpdate(): void;
        viewportPreUpdate(pViewport: IViewport): void;
        viewportPostUpdate(pViewport: IViewport): void;
        viewportAdded(pViewport: IViewport): void;
        viewportRemoved(pViewport: IViewport): void;
        resized(): void;
        cameraRemoved(pCamera: ICamera): void;
    }
}
module akra {
    interface IRenderTexture extends IRenderTarget {
        copyContentsToMemory(pDest: IPixelBox, pBuffer: EFramebuffer): void;
        suggestPixelFormat(): EPixelFormats;
    }
}
module akra {
    interface IAFXObject {
        getName(): string;
        getId(): IAFXIdInstruction;
    }
    interface IAFXVariable extends IAFXObject {
        setName(sName: string): void;
        setType(pType: IAFXVariableTypeInstruction): void;
        getType(): IAFXVariableTypeInstruction;
        initializeFromInstruction(pInstruction: IAFXVariableDeclInstruction): void;
    }
    interface IAFXType extends IAFXObject {
        isBase(): bool;
        initializeFromInstruction(pInstruction: IAFXTypeDeclInstruction): bool;
    }
    interface IAFXFunction extends IAFXObject {
        getHash(): string;
    }
    interface IAFXPass extends IAFXObject {
    }
    interface IAFXTechnique extends IAFXObject {
    }
    interface IAFXEffectStats {
        time: number;
    }
    interface IAFXEffect {
        analyze(pTree: IParseTree): bool;
        setAnalyzedFileName(sFileName: string): void;
        getStats(): IAFXEffectStats;
        clear(): void;
        getTechniqueList(): IAFXTechniqueInstruction[];
    }
}
module akra {
    interface IAFXPreRenderState {
    }
}
module akra {
    interface IAFXSamplerState {
    }
    interface IVertexData {
    }
    interface ITexture {
    }
    interface IMat2 {
    }
    interface IMat3 {
    }
    interface IMat4 {
    }
    interface IVec2 {
    }
    interface IVec3 {
    }
    interface IVec4 {
    }
    interface IQuat4 {
    }
    interface IBufferMap {
    }
    interface IShaderProgram extends IRenderResource {
        create(csVertex?: string, csPixel?: string): bool;
        compile(csVertex?: string, csPixel?: string): bool;
        isLinked(): bool;
        isValid(): bool;
        isActive(): bool;
        setFloat(sName: string, fValue: number): void;
        setInt(sName: string, iValue: number): void;
        setVec2(sName: string, v2fValue: IVec2): void;
        setVec2(sName: string, x: number, y: number): void;
        setVec2i(sName: string, v2iValue: IVec2): void;
        setVec2i(sName: string, x: number, y: number): void;
        setVec3(sName: string, v3fValue: IVec3): void;
        setVec3(sName: string, x: number, y: number, z: number): void;
        setVec3i(sName: string, v3iValue: IVec3): void;
        setVec3i(sName: string, x: number, y: number, z: number): void;
        setVec4(sName: string, v4fValue: IVec4): void;
        setVec4(sName: string, x: number, y: number, z: number, w: number): void;
        setVec4i(sName: string, v4iValue: IVec4): void;
        setVec4i(sName: string, x: number, y: number, z: number, w: number): void;
        setMat3(sName: string, m3fValue: IMat3): void;
        setMat4(sName: string, m4fValue: IMat4): void;
        setFloat32Array(sName: string, pValue: Float32Array): void;
        setInt32Array(sName: string, pValue: Int32Array): void;
        setVec2Array(sName: string, pValue: IVec2[]): void;
        setVec2iArray(sName: string, pValue: IVec2[]): void;
        setVec3Array(sName: string, pValue: IVec3[]): void;
        setVec3iArray(sName: string, pValue: IVec3[]): void;
        setVec4Array(sName: string, pValue: IVec4[]): void;
        setVec4iArray(sName: string, pValue: IVec4[]): void;
        setMat3Array(sName: string, pValue: IMat3[]): void;
        setMat4Array(sName: string, pValue: IMat4[]): void;
        setStruct(sName: string, pData: Object): void;
        setSampler(sName: string, pSampler: IAFXSamplerState): void;
        setSamplerArray(sName: string, pSamplerList: IAFXSamplerState[]): void;
        setTexture(sName: string, pData: ITexture): void;
        applyVertexData(sName: string, pData: IVertexData): void;
        applyBufferMap(pMap: IBufferMap): void;
        setVertexBuffer(sName: string, pBuffer: IVertexBuffer): void;
        _getActiveUniformNames(): string[];
        _getActiveAttributeNames(): string[];
    }
}
module akra.fx {
    class VariableBlendContainer {
        /**@protected*/ 
        public _pVarListMap: IAFXVariableDeclListMap;
        /**@protected*/ 
        public _pVarKeys: string[];
        /**@protected*/ 
        public _pVarBlendTypeMap: IAFXVariableTypeMap;
        /**@inline*/ 
        public keys : string[];
        /**@inline*/ 
        public getVarList(sKey: string): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public getBlendType(sKey: string): IAFXVariableTypeInstruction;
        constructor();
        public addVariable(pVariable: IAFXVariableDeclInstruction, eBlendMode: EAFXBlendMode): bool;
        public hasVariableWithName(sName: string): bool;
        /**@inline*/ 
        public hasVariable(pVar: IAFXVariableDeclInstruction): bool;
        /**@inline*/ 
        public getVariableByName(sName: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public getDeclCodeForVar(sName: string): string;
    }
    class ComplexTypeBlendContainer {
        private _pTypeListMap;
        private _pTypeKeys;
        /**@inline*/ 
        public keys : string[];
        /**@inline*/ 
        public types : IAFXTypeMap;
        constructor();
        public addComplexType(pComplexType: IAFXTypeInstruction): bool;
        public addFromVarConatiner(pContainer: VariableBlendContainer): bool;
    }
    class ExtSystemDataContainer {
        /**@protected*/ 
        public _pExtSystemMacrosList: IAFXSimpleInstruction[];
        /**@protected*/ 
        public _pExtSystemTypeList: IAFXTypeDeclInstruction[];
        /**@protected*/ 
        public _pExtSystemFunctionList: IAFXFunctionDeclInstruction[];
        /**@inline*/ 
        public macroses : IAFXSimpleInstruction[];
        /**@inline*/ 
        public types : IAFXTypeDeclInstruction[];
        /**@inline*/ 
        public functions : IAFXFunctionDeclInstruction[];
        constructor();
        public addFromFunction(pFunction: IAFXFunctionDeclInstruction): void;
    }
    interface IDataFlowMap {
        [index: string]: IDataFlow;
    }
    interface IAFXVaribaleListMap {
        [index: string]: IAFXVariableDeclInstruction[];
    }
    class AttributeBlendContainer extends VariableBlendContainer {
        private _pSlotBySemanticMap;
        private _pFlowsBySemanticMap;
        private _pFlowBySlots;
        private _pHashBySlots;
        private _pTypesBySlots;
        private _pVBByBufferSlots;
        private _pHashByBufferSlots;
        private _pBufferSlotBySlots;
        private _pOffsetVarsBySemanticMap;
        private _pOffsetDefaultMap;
        /**@protected*/ 
        public _sHash: string;
        /**@inline*/ 
        public semantics : string[];
        /**@inline*/ 
        public totalSlots : number;
        /**@inline*/ 
        public totalBufferSlots : number;
        constructor();
        /**@inline*/ 
        public getOffsetVarsBySemantic(sName: string): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public getOffsetDefault(sName: string): number;
        /**@inline*/ 
        public getSlotBySemantic(sSemantic: string): number;
        /**@inline*/ 
        public getBufferSlotBySemantic(sSemantic: string): number;
        /**@inline*/ 
        public getAttributeList(sSemantic: string): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public getFlowBySemantic(sSemantic: string): IDataFlow;
        /**@inline*/ 
        public getFlowBySlot(iSlot: number): IDataFlow;
        /**@inline*/ 
        public getTypeBySlot(iSlot: number): IAFXTypeInstruction;
        /**@inline*/ 
        public getType(sSemantic: string): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public addAttribute(pVariable: IAFXVariableDeclInstruction): bool;
        /**@inline*/ 
        public hasAttrWithSemantic(sSemantic: string): bool;
        /**@inline*/ 
        public getAttribute(sSemantic: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public hasTexcoord(iSlot: number): bool;
        /**@inline*/ 
        public getTexcoordVar(iSlot: number): IAFXVariableDeclInstruction;
        public clear(): void;
        public generateOffsetMap(): void;
        public initFromBufferMap(pMap: util.BufferMap): bool;
        /**@inline*/ 
        public getHash(): string;
    }
}
module akra.fx {
    class SamplerBlender {
        /**@protected*/ 
        public _pSlotList: util.ObjectArray[];
        /**@protected*/ 
        public _nActiveSlots: number;
        /**@protected*/ 
        public _pIdToSlotMap: IntMap;
        /**@protected*/ 
        public _pIdList: number[];
        /**@inline*/ 
        public slots : util.ObjectArray[];
        /**@inline*/ 
        public totalActiveSlots : number;
        constructor();
        /**@inline*/ 
        public getSamplersBySlot(iSlot: number): util.ObjectArray;
        public clear(): void;
        public addTextureSlot(id: number): void;
        /**@inline*/ 
        public addObjectToSlotById(pObject: any, id: number): void;
        public addObjectToSlotIdAuto(pObject: any, id: number): void;
        public getHash(): string;
    }
}
module akra {
    interface IAFXPassInputBlend {
    }
    interface IBufferMap {
    }
    interface IAFXPassInputBlend {
    }
    interface IShaderInput {
    }
    interface IAFXMakerMap {
        [index: string]: IAFXMaker;
        [index: number]: IAFXMaker;
    }
    interface IAFXMaker extends IUnique {
        shaderProgram: IShaderProgram;
        attributeSemantics: string[];
        attributeNames: string[];
        _create(sVertex: string, sPixel: string): bool;
        isUniformExists(sName: string): bool;
        isAttrExists(sName: string): bool;
        isArray(sName: string): bool;
        getType(sName: string): EAFXShaderVariableType;
        getLength(sName: string): number;
        setUniform(sName: string, pValue: any): void;
        _make(pPassInput: IAFXPassInputBlend, pBufferMap: IBufferMap): IShaderInput;
        _initInput(pPassInput: IAFXPassInputBlend, pBlend: fx.SamplerBlender, pAttrs: fx.AttributeBlendContainer): bool;
        _createDataPool(): IShaderInput;
        _getShaderInput(): IShaderInput;
        _releaseShaderInput(pPool: IShaderInput): void;
    }
}
module akra {
    interface IAFXPassBlendMap {
        [index: number]: IAFXPassBlend;
        [index: string]: IAFXPassBlend;
    }
    interface IAFXPassBlend extends IUnique {
        initFromPassList(pPassList: IAFXPassInstruction[]): bool;
        generateFXMaker(pPassInput: IAFXPassInputBlend, pSurfaceMaterial: ISurfaceMaterial, pBuffer: IBufferMap): IAFXMaker;
    }
}
module akra {
    interface IRenderPass extends IUnique {
        setForeign(sName: string, fValue: number): void;
        setTexture(sName: string, pTexture: ITexture): void;
        setUniform(sName: string, pValue: any): void;
        setStruct(sName: string, pValue: any): void;
        setSamplerTexture(sName: string, sTexture: string): void;
        setSamplerTexture(sName: string, pTexture: ITexture): void;
        getRenderTarget(): IRenderTarget;
        setRenderTarget(pTarget: IRenderTarget): void;
        getPassInput(): IAFXPassInputBlend;
        setPassInput(pInput: IAFXPassInputBlend, isNeedRelocate: bool): void;
        blend(sComponentName: string, iPass: number): bool;
        activate(): void;
        deactivate(): void;
        isActive(): bool;
    }
}
module akra {
    interface IRenderPass {
    }
    interface IRenderMethod {
    }
    interface IAFXComponentBlend {
    }
    interface IRenderTechnique extends IEventProvider {
        totalPasses: number;
        modified: number;
        data: IAFXComponentBlend;
        destroy(): void;
        getPass(n: number): IRenderPass;
        getMethod(): IRenderMethod;
        setMethod(pMethod: IRenderMethod);
        isReady(): bool;
        setState(sName: string, pValue: any): void;
        setForeign(sName: string, pValue: any): void;
        setStruct(sName: string, pValue: any): void;
        setTextureBySemantics(sName: string, pValue: any): void;
        setShadowSamplerArray(sName: string, pValue: any): void;
        setVec2BySemantic(sName: string, pValue: any): void;
        addComponent(iComponentHandle: number, iShift?: number, iPass?: number, isSet?: bool): bool;
        addComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number, isSet?: bool): bool;
        addComponent(sComponent: string, iShift?: number, iPass?: number, isSet?: bool): bool;
        delComponent(iComponentHandle: number, iShift?: number, iPass?: number): bool;
        delComponent(sComponent: string, iShift?: number, iPass?: number): bool;
        delComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number): bool;
        hasComponent(sComponent: string, iShift: number, iPass: number): bool;
        hasGlobalPostEffect(): bool;
        isPostEffectPass(iPass: number): bool;
        isLastPass(iPass: number): bool;
        isFirstPass(iPass: number): bool;
        isFreeze(): bool;
        updatePasses(bSaveOldUniformValue: bool): void;
        _blockPass(iPass: number): void;
        _setGlobalPostEffectsFrom(iPass: number): void;
        _setComposer(pComposer: IAFXComposer): void;
        _renderTechnique(pViewport: IViewport, pRenderable: IRenderableObject, pSceneObject: ISceneObject): void;
        render(iPass: number): void;
    }
}
module akra {
    interface IRect2d {
    }
    interface IColor {
    }
    interface IRenderTarget {
    }
    interface ICamera {
    }
    enum EViewportTypes {
        DEFAULT,
        DSVIEWPORT,
        SHADOWVIEWPORT,
    }
    interface IViewport extends IEventProvider {
        left: number;
        top: number;
        width: number;
        height: number;
        actualLeft: number;
        actualTop: number;
        actualWidth: number;
        actualHeight: number;
        zIndex: number;
        backgroundColor: IColor;
        depthClear: number;
        update(): void;
        destroy(): void;
        newFrame(): void;
        clear(iBuffers?: number, cColor?: IColor, fDepth?: number, iStencil?: number): void;
        getTarget(): IRenderTarget;
        getCamera(): ICamera;
        setCamera(pCamera: ICamera): bool;
        setDimensions(fLeft: number, fTop: number, fWidth: number, fHeight: number): bool;
        setDimensions(pRect: IRect2d): bool;
        getActualDimensions(): IRect2d;
        setClearEveryFrame(isClear: bool, iBuffers?: number): void;
        getClearEveryFrame(): bool;
        getClearBuffers(): number;
        setDepthParams(bDepthTest: bool, bDepthWrite: bool, eDepthFunction: ECompareFunction): void;
        setCullingMode(eCullingMode: ECullingMode): void;
        setAutoUpdated(bValue?: bool): void;
        isAutoUpdated(): bool;
        isUpdated(): bool;
        _clearUpdatedFlag(): void;
        _updateImpl(): void;
        _getNumRenderedPolygons(): number;
        _updateDimensions(pDimensions: IRect2d): void;
        _getViewportState(): IViewportState;
        viewportDimensionsChanged(): void;
        viewportCameraChanged(): void;
    }
}
module akra {
    enum ERenderDataTypes {
        UNKNOWN,
        MESH_SUBSET,
        SCREEN,
    }
    interface IRenderableObject extends IEventProvider {
        renderMethod: IRenderMethod;
        hasShadow: bool;
        type: ERenderDataTypes;
        effect: IEffect;
        surfaceMaterial: ISurfaceMaterial;
        data: IRenderData;
        material: IMaterial;
        getGuid(): number;
        getRenderer(): IRenderer;
        getTechnique(sName?: string): IRenderTechnique;
        getTechniqueDefault(): IRenderTechnique;
        destroy(): void;
        addRenderMethod(pMethod: IRenderMethod, csName?: string): bool;
        addRenderMethod(csMethod: string, csName?: string): bool;
        switchRenderMethod(csName: string): bool;
        switchRenderMethod(pMethod: IRenderMethod): bool;
        removeRenderMethod(csName: string): bool;
        getRenderMethod(csName?: string): IRenderMethod;
        getRenderMethodDefault(): IRenderMethod;
        isReadyForRender(): bool;
        isAllMethodsLoaded(): bool;
        render(pViewport: IViewport, csMethod?: string, pSceneObject?: ISceneObject): void;
        _setRenderData(pData: IRenderData): void;
        _setup(pRenderer: IRenderer, csDefaultMethod?: string): void;
        _draw(): void;
        _setVisible(bVisible: bool): void;
        /** Notify, when shadow added or removed. */
        shadow(bValue: bool): void;
        /** Notify, before object start rendendering */
        beforeRender(pViewport: IViewport): void;
    }
}
module akra {
    interface IBufferData {
        byteOffset: number;
        byteLength: number;
        buffer: IBuffer;
    }
}
module akra {
    interface IBufferDataModifier {
    }
    interface IVertexDeclaration {
    }
    interface IVertexBuffer {
    }
    interface IEventProvider {
    }
    interface IVertexData extends IBufferData, IBuffer, IEventProvider {
        stride: number;
        startIndex: number;
        id: number;
        getVertexDeclaration(): data.VertexDeclaration;
        setVertexDeclaration(pDecl: IVertexDeclaration): bool;
        getVertexElementCount(): number;
        hasSemantics(sSemantics: string): bool;
        destroy(): void;
        extend(pDecl: IVertexDeclaration, pData?: ArrayBufferView): bool;
        resize(nCount: number, pDecl?: IVertexDeclaration): bool;
        resize(nCount: number, iStride?: number): bool;
        applyModifier(sUsage: string, fnModifier: IBufferDataModifier): bool;
        setData(pData: ArrayBufferView, iOffset: number, iSize?: number, nCountStart?: number, nCount?: number): bool;
        setData(pData: ArrayBufferView, sUsage?: string, iSize?: number, nCountStart?: number, nCount?: number): bool;
        getData(): ArrayBuffer;
        getData(iOffset: number, iSize: number, iFrom?: number, iCount?: number): ArrayBuffer;
        getData(sUsage: string): ArrayBuffer;
        getData(sUsage: string, iFrom: number, iCount: number): ArrayBuffer;
        getTypedData(sUsage: string, iFrom?: number, iCount?: number): ArrayBufferView;
        getBufferHandle(): number;
        toString(): string;
    }
}
module akra {
    interface IVertexData {
    }
    interface IVertexElement {
    }
    interface IVertexDeclaration {
    }
    enum EVertexBufferTypes {
        UNKNOWN,
        VBO,
        TBO,
    }
    interface IVertexBuffer extends IHardwareBuffer, IRenderResource {
        type: EVertexBufferTypes;
        getVertexData(i: number): IVertexData;
        getVertexData(iOffset: number, iCount: number, pElements: IVertexElement[]): IVertexData;
        getVertexData(iOffset: number, iCount: number, pDecl: IVertexDeclaration): IVertexData;
        getEmptyVertexData(iCount: number, pElements: IVertexElement[], ppVertexDataIn?: IVertexData): IVertexData;
        getEmptyVertexData(iCount: number, pDecl: IVertexDeclaration, ppVertexDataIn?: IVertexData): IVertexData;
        getEmptyVertexData(iCount: number, pSize: number, ppVertexDataIn?: IVertexData): IVertexData;
        freeVertexData(pVertexData: IVertexData): bool;
        freeVertexData(): bool;
        create(iByteSize: number, iFlags?: number, pData?: Uint8Array): bool;
        allocateData(pElements: IVertexElement[], pData: ArrayBufferView): IVertexData;
        allocateData(pDecl: IVertexDeclaration, pData: ArrayBufferView): IVertexData;
    }
}
module akra {
    interface IIndexData {
    }
    interface IIndexBuffer extends IHardwareBuffer, IRenderResource {
        create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        getIndexData(iOffset: number, iCount: number, ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes): IIndexData;
        getEmptyIndexData(iCount: number, ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes): IIndexData;
        freeIndexData(pIndexData: IIndexData): bool;
        allocateData(ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes, pData: ArrayBufferView): IIndexData;
    }
}
module akra {
    interface IShaderInput {
    }
    interface IRenderEntry {
        viewport: IViewport;
        renderTarget: IRenderTarget;
        maker: IAFXMaker;
        input: IShaderInput;
        bufferMap: IBufferMap;
        clear(): void;
    }
}
module akra {
    enum ECanvasTypes {
        TYPE_UNKNOWN,
        TYPE_2D,
        TYPE_3D,
    }
    interface ICanvas {
        type: ECanvasTypes;
        isFullscreen(): bool;
        setFullscreen(isFullscreen?: bool): void;
    }
}
module akra {
    interface ICanvas3d extends ICanvas, IRenderTarget {
        left: number;
        top: number;
        create(sName: string, iWidth: number, iHeight: number, isFullscreen?: bool): bool;
        destroy(): void;
        setFullscreen(isFullscreen?: bool): void;
        setVisible(bVisible?: bool): void;
        setDeactivateOnFocusChange(bDeactivate?: bool): void;
        isFullscreen(): bool;
        isVisible(): bool;
        isDeactivatedOnFocusChange(): bool;
        resize(iWidth: number, iHeight: number): void;
    }
}
module akra {
    interface IVec2 {
    }
    interface ICircle {
    }
    interface IRect2d {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
        left: number;
        top: number;
        width: number;
        height: number;
        set(): IRect2d;
        set(pRect: IRect2d): IRect2d;
        set(v2fVec: IVec2): IRect2d;
        set(fSizeX: number, fSizeY: number): IRect2d;
        set(fX0: number, fX1: number, fY0: number, fY1: number): IRect2d;
        setFloor(pRect: IRect2d): IRect2d;
        setCeil(pRect: IRect2d): IRect2d;
        clear(): IRect2d;
        addSelf(fValue: number): IRect2d;
        addSelf(v2fVec: IVec2): IRect2d;
        subSelf(fValue: number): IRect2d;
        subSelf(v2fVec: IVec2): IRect2d;
        multSelf(fValue: number): IRect2d;
        multSelf(v2fVec: IVec2): IRect2d;
        divSelf(fValue: number): IRect2d;
        divSelf(v2fVec: IVec2): IRect2d;
        offset(v2fOffset: IVec2): IRect2d;
        offset(fOffsetX: number, fOffsetY: number): IRect2d;
        expand(fValue: number): IRect2d;
        expand(v2fValue: IVec2): IRect2d;
        expand(fValueX: number, fValueY: number): IRect2d;
        expandX(fValue: number): IRect2d;
        expandY(fValue: number): IRect2d;
        resize(v2fSize: IVec2): IRect2d;
        resize(fSizeX: number, fSizeY: number): IRect2d;
        resizeX(fSize: number): IRect2d;
        resizeY(fSize: number): IRect2d;
        resizeMax(v2fSpan: IVec2): IRect2d;
        resizeMax(fSpanX: number, fSpanY: number): IRect2d;
        resizeMaxX(fSpan: number): IRect2d;
        resizeMaxY(fSpan: number): IRect2d;
        resizeMin(v2fSpan: IVec2): IRect2d;
        resizeMin(fSpanX: number, fSpanY: number): IRect2d;
        resizeMinX(fSpan: number): IRect2d;
        resizeMinY(fSpan: number): IRect2d;
        unionPoint(v2fPoint: IVec2): IRect2d;
        unionPoint(fX: number, fY: number): IRect2d;
        unionRect(pRect: IRect2d): IRect2d;
        negate(pDestination?: IRect2d): IRect2d;
        normalize(): IRect2d;
        isEqual(pRect: IRect2d): bool;
        isClear(): bool;
        isValid(): bool;
        isPointInRect(v2fPoint: IVec2): bool;
        midPoint(v2fDestination?: IVec2): IVec2;
        midX(): number;
        midY(): number;
        size(v2fDestination?: IVec2): IVec2;
        sizeX(): number;
        sizeY(): number;
        minPoint(v2fDestination?: IVec2): IVec2;
        maxPoint(v2fDestination?: IVec2): IVec2;
        area(): number;
        corner(iIndex: number, v2fDestination?: IVec2): IVec2;
        createBoundingCircle(pCircle?: ICircle): ICircle;
        toString(): string;
    }
}
module akra {
    interface IVec2 {
    }
    interface ICircle {
        radius: number;
        center: IVec2;
        set(): ICircle;
        set(pCircle: ICircle): ICircle;
        set(v2fCenter: IVec2, fRadius: number): ICircle;
        set(fCenterX: number, fCenterY: number, fRadius: number): ICircle;
        clear(): ICircle;
        isEqual(pCircle: ICircle): bool;
        isClear(): bool;
        isValid(): bool;
        offset(v2fOffset: IVec2): ICircle;
        expand(fInc: number): ICircle;
        normalize(): ICircle;
    }
}
module akra.geometry {
    class Circle implements ICircle {
        public center: IVec2;
        public radius: number;
        constructor();
        constructor(pCircle: ICircle);
        constructor(v2fCenter: IVec2, fRadius: number);
        constructor(fCenterX: number, fCenterY: number, fRadius: number);
        public set(): ICircle;
        public set(pCircle: ICircle): ICircle;
        public set(v2fCenter: IVec2, fRadius: number): ICircle;
        public set(fCenterX: number, fCenterY: number, fRadius: number): ICircle;
        /**@inline*/ 
        public clear(): ICircle;
        /**@inline*/ 
        public isEqual(pCircle: ICircle): bool;
        /**@inline*/ 
        public isClear(): bool;
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public offset(v2fOffset: IVec2): ICircle;
        /**@inline*/ 
        public expand(fInc: number): ICircle;
        /**@inline*/ 
        public normalize(): ICircle;
    }
}
module akra.geometry {
    class Rect2d implements IRect2d {
        public x0: number;
        public x1: number;
        public y0: number;
        public y1: number;
        /**@inline*/ 
        public left : number;
        /**@inline*/ 
        public top : number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        constructor();
        constructor(pRect: IRect2d);
        constructor(v2fVec: IVec2);
        constructor(fSizeX: number, fSizeY: number);
        constructor(fX0: number, fX1: number, fY0: number, fY1: number);
        public set(): IRect2d;
        public set(pRect: IRect2d): IRect2d;
        public set(v2fVec: IVec2): IRect2d;
        public set(fSizeX: number, fSizeY: number): IRect2d;
        public set(fX0: number, fX1: number, fY0: number, fY1: number): IRect2d;
        public setFloor(pRect: IRect2d): IRect2d;
        public setCeil(pRect: IRect2d): IRect2d;
        /**@inline*/ 
        public clear(): IRect2d;
        public addSelf(fValue: number): IRect2d;
        public addSelf(v2fVec: IVec2): IRect2d;
        public subSelf(fValue: number): IRect2d;
        public subSelf(v2fVec: IVec2): IRect2d;
        public multSelf(fValue: number): IRect2d;
        public multSelf(v2fVec: IVec2): IRect2d;
        public divSelf(fValue: number): IRect2d;
        public divSelf(v2fVec: IVec2): IRect2d;
        public offset(v2fOffset: IVec2): IRect2d;
        public offset(fOffsetX: number, fOffsetY: number): IRect2d;
        public expand(fValue: number): IRect2d;
        public expand(v2fValue: IVec2): IRect2d;
        public expand(fValueX: number, fValueY: number): IRect2d;
        public expandX(fValue: number): IRect2d;
        public expandY(fValue: number): IRect2d;
        public resize(v2fSize: IVec2): IRect2d;
        public resize(fSizeX: number, fSizeY: number): IRect2d;
        /**@inline*/ 
        public resizeX(fSize: number): IRect2d;
        /**@inline*/ 
        public resizeY(fSize: number): IRect2d;
        public resizeMax(v2fSpan: IVec2): IRect2d;
        public resizeMax(fSpanX: number, fSpanY: number): IRect2d;
        /**@inline*/ 
        public resizeMaxX(fSpan: number): IRect2d;
        /**@inline*/ 
        public resizeMaxY(fSpan: number): IRect2d;
        public resizeMin(v2fSpan: IVec2): IRect2d;
        public resizeMin(fSpanX: number, fSpanY: number): IRect2d;
        /**@inline*/ 
        public resizeMinX(fSpan: number): IRect2d;
        /**@inline*/ 
        public resizeMinY(fSpan: number): IRect2d;
        public unionPoint(v2fPoint: IVec2): IRect2d;
        public unionPoint(fX: number, fY: number): IRect2d;
        public unionRect(pRect: IRect2d): IRect2d;
        public negate(pDestination?: IRect2d): IRect2d;
        public normalize(): IRect2d;
        /**@inline*/ 
        public isEqual(pRect: IRect2d): bool;
        /**@inline*/ 
        public isClear(): bool;
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public isPointInRect(v2fPoint: IVec2): bool;
        public midPoint(v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public midX(): number;
        /**@inline*/ 
        public midY(): number;
        public size(v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public sizeX(): number;
        /**@inline*/ 
        public sizeY(): number;
        public minPoint(v2fDestination?: IVec2): IVec2;
        public maxPoint(v2fDestination?: IVec2): IVec2;
        /**@inline*/ 
        public area(): number;
        /**
        * counter-clockwise
        * x0,y0 -> x1,y0 -> x1,y1 -> x0,y1;
        */
        public corner(iIndex: number, v2fDestination?: IVec2): IVec2;
        public createBoundingCircle(pCircle?: ICircle): ICircle;
        public toString(): string;
    }
}
module akra {
    /** ObjectArray interface */
    interface IObjectArray {
        /** number of element in array */
        length: number;
        /** lock array for writing */
        lock(): void;
        /**
        * unlock array.
        */
        unlock(): void;
        /**
        * Is arrat can be modified?
        */
        isLocked(): bool;
        /**
        * Remove all elements from array;
        * @param {Bool=false} bRemoveLinks Remove old pointers to data.
        */
        clear(bRemoveLinks?: bool): IObjectArray;
        /** Get value of <n> element. */
        value(n: number): any;
        /** Set value for <n> element. */
        set(n: number, data: any): IObjectArray;
        /** Fill ObjectArray from any <Array> */
        fromArray(elements: any[], iOffset?: number, iSize?: number): IObjectArray;
        /** Push element to end of array */
        push(element: any): IObjectArray;
        /** Get & remove last element in array */
        pop(): any;
        /** Complitly remove all data from array */
        release(): IObjectArray;
        /** Swap elements in array */
        swap(i: number, j: number): IObjectArray;
        takeAt(iPos): any;
    }
}
module akra.util {
    class ObjectArray implements IObjectArray {
        /**@protected*/ 
        public _pData: any[];
        /**@protected*/ 
        public _bLock: bool;
        /**@protected*/ 
        public _iLength: number;
        /**@inline*/ 
        public length : number;
        constructor(pElements?: any[]);
        /**@inline*/ 
        public lock(): void;
        /**@inline*/ 
        public unlock(): void;
        /**@inline*/ 
        public isLocked(): bool;
        public clear(bRemoveLinks?: bool): IObjectArray;
        public release(): IObjectArray;
        /**@inline*/ 
        public value(n: number): any;
        private extend(n);
        public set(n: number, pData: any): IObjectArray;
        public fromArray(pElements: any[], iOffset?: number, iSize?: number): IObjectArray;
        /**@inline*/ 
        public push(pElement: any): IObjectArray;
        /**@inline*/ 
        public pop(): any;
        /**@inline*/ 
        public swap(i: number, j: number): IObjectArray;
        public takeAt(iPos): any;
        public indexOf(pObject: any): number;
    }
}
module akra {
    var ObjectArray: new(pElements?: any[]) => util.ObjectArray;
}
module akra.render {
    class Viewport implements IViewport {
        /**@protected*/ 
        public _pCamera: ICamera;
        /**@protected*/ 
        public _pTarget: IRenderTarget;
        /**@protected*/ 
        public _fRelLeft: number;
        /**@protected*/ 
        public _fRelTop: number;
        /**@protected*/ 
        public _fRelWidth: number;
        /**@protected*/ 
        public _fRelHeight: number;
        /**@protected*/ 
        public _iActLeft: number;
        /**@protected*/ 
        public _iActTop: number;
        /**@protected*/ 
        public _iActWidth: number;
        /**@protected*/ 
        public _iActHeight: number;
        /**@protected*/ 
        public _iZIndex: number;
        /**@protected*/ 
        public _pViewportState: IViewportState;
        /**@protected*/ 
        public _bClearEveryFrame: bool;
        /**@protected*/ 
        public _bNewFrame: bool;
        /**@protected*/ 
        public _bUpdated: bool;
        /**@protected*/ 
        public _iVisibilityMask: number;
        /**@protected*/ 
        public sMaterialSchemeName: string;
        /**@protected*/ 
        public _isAutoUpdated: bool;
        /**@protected*/ 
        public _csDefaultRenderMethod: string;
        /**@inline*/ 
        public zIndex : number;
        /**@inline*/ 
        public left : number;
        /**@inline*/ 
        public top : number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public actualLeft : number;
        /**@inline*/ 
        public actualTop : number;
        /**@inline*/ 
        public actualWidth : number;
        /**@inline*/ 
        public actualHeight : number;
        /**@inline*/ /**@inline*/ 
        public backgroundColor : IColor;
        /**@inline*/ /**@inline*/ 
        public depthClear : number;
        constructor(pCamera: ICamera, pTarget: IRenderTarget, csRenderMethod?: string, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number, iZIndex?: number);
        public destroy(): void;
        /**@inline*/ 
        public newFrame(): void;
        public clear(iBuffers?: number, cColor?: IColor, fDepth?: number, iStencil?: number): void;
        /**@inline*/ 
        public getTarget(): IRenderTarget;
        /**@inline*/ 
        public getCamera(): ICamera;
        public setCamera(pCamera: ICamera): bool;
        /**@protected*/ 
        public _setCamera(pCamera: ICamera): void;
        public setDimensions(fLeft: number, fTop: number, fWidth: number, fHeight: number): bool;
        public setDimensions(pRect: IRect2d): bool;
        public getActualDimensions(): IRect2d;
        public setClearEveryFrame(isClear: bool, iBuffers?: number): void;
        /**@inline*/ 
        public getClearEveryFrame(): bool;
        /**@inline*/ 
        public getClearBuffers(): number;
        public setDepthParams(bDepthTest: bool, bDepthWrite: bool, eDepthFunction: ECompareFunction): void;
        public setCullingMode(eCullingMode: ECullingMode): void;
        /**@inline*/ 
        public setAutoUpdated(bValue?: bool): void;
        /**@inline*/ 
        public isAutoUpdated(): bool;
        public _updateDimensions(): void;
        public update(): void;
        public _updateImpl(): void;
        /**@protected*/ 
        public renderAsNormal(csMethod: string, pCamera: ICamera): void;
        /**@inline*/ 
        public isUpdated(): bool;
        /**@inline*/ 
        public _clearUpdatedFlag(): void;
        public _getNumRenderedPolygons(): number;
        /**@inline*/ 
        public _getViewportState(): IViewportState;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public viewportDimensionsChanged(): void;
        public viewportCameraChanged(): void;
    }
}
module akra {
    interface IDSViewport extends IViewport {
        setSkybox(pSkyTexture: ITexture): void;
        setFXAA(bValue?: bool): void;
    }
}
module akra {
    interface IShaderInput {
        [index: string]: any;
    }
}
module akra.render {
    interface IUniform {
    }
    class LightData {
        public DIFFUSE: IVec4;
        public AMBIENT: IVec4;
        public SPECULAR: IVec4;
        public POSITION: IVec3;
        public ATTENUATION: IVec3;
        public set(pLightParam: ILightParameters, v3fPosition: IVec3): LightData;
    }
    class UniformOmni implements IUniform {
        public LIGHT_DATA: LightData;
        public setLightData(pLightParam: ILightParameters, v3fPosition: IVec3): UniformOmni;
        static stackCeil : UniformOmni;
        static stackSize: number;
        static stackPosition: number;
        static stack: UniformOmni[];
    }
    class UniformProject implements IUniform {
        public LIGHT_DATA: LightData;
        public SHADOW_MATRIX: IMat4;
        public setLightData(pLightParam: ILightParameters, v3fPosition: IVec3): UniformProject;
        public setMatrix(m4fMatrix: IMat4): UniformProject;
        static stackCeil : UniformProject;
        static stackSize: number;
        static stackPosition: number;
        static stack: UniformProject[];
    }
    class UniformProjectShadow implements IUniform {
        public LIGHT_DATA: LightData;
        public TO_LIGHT_SPACE: IMat4;
        public REAL_PROJECTION_MATRIX: IMat4;
        public OPTIMIZED_PROJECTION_MATRIX: IMat4;
        public SHADOW_SAMPLER: IAFXSamplerState;
        public setLightData(pLightParam: ILightParameters, v3fPosition: IVec3): UniformProjectShadow;
        public setMatrix(m4fToLightSpace: IMat4, m4fRealProj: IMat4, m4fOptimizedProj: IMat4): UniformProjectShadow;
        public setSampler(sTexture: string): UniformProjectShadow;
        static stackCeil : UniformProjectShadow;
        static stackSize: number;
        static stackPosition: number;
        static stack: UniformProjectShadow[];
    }
    class UniformOmniShadow implements IUniform {
        public LIGHT_DATA: LightData;
        public TO_LIGHT_SPACE: IMat4[];
        public OPTIMIZED_PROJECTION_MATRIX: IMat4[];
        public SHADOW_SAMPLER: IAFXSamplerState[];
        public setLightData(pLightParam: ILightParameters, v3fPosition: IVec3): UniformOmniShadow;
        public setMatrix(m4fToLightSpace: IMat4, m4fOptimizedProj: IMat4, index: number): UniformOmniShadow;
        public setSampler(sTexture: string, index: number): UniformOmniShadow;
        static stackCeil : UniformOmniShadow;
        static stackSize: number;
        static stackPosition: number;
        static stack: UniformOmniShadow[];
    }
    interface UniformMap {
        omni: UniformOmni[];
        project: UniformProject[];
        omniShadows: UniformOmniShadow[];
        projectShadows: UniformProjectShadow[];
        textures: ITexture[];
        samplersOmni: IAFXSamplerState[];
        samplersProject: IAFXSamplerState[];
    }
}
module akra {
    interface ILightPoint {
    }
    interface IShadowCaster {
    }
    interface ITexture {
    }
    interface IRenderTarget {
    }
    interface ICamera {
    }
    interface IOmniLight extends ILightPoint {
        getShadowCaster(): IShadowCaster[];
        getDepthTextureCube(): ITexture[];
        getRenderTarget(iFace: number): IRenderTarget;
        _prepareForLighting(pCamera: ICamera): bool;
    }
}
module akra {
    interface ILightPoint {
    }
    interface ICamera {
    }
    interface IProjectLight extends ILightPoint {
        getShadowCaster(): IShadowCaster;
        getDepthTexture(): ITexture;
        getRenderTarget(): IRenderTarget;
        _prepareForLighting(pCamera: ICamera): bool;
    }
}
module akra {
    interface ILightPoint {
    }
    interface IObjectArray {
    }
    interface IMat4 {
    }
    interface IShadowCaster extends ICamera {
        lightPoint: ILightPoint;
        face: number;
        affectedObjects: IObjectArray;
        optimizedProjection: IMat4;
        isShadowCasted: bool;
        _optimizeProjectionMatrix(): void;
    }
}
module akra.render {
    class RenderPass implements IRenderPass {
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        private _pTechnique;
        private _pRenderTarget;
        private _iPassNumber;
        private _pInput;
        private _isActive;
        constructor(pTechnique: IRenderTechnique, iPass: number);
        /**@inline*/ 
        public setForeign(sName: string, fValue: number): void;
        /**@inline*/ 
        public setTexture(sName: string, pTexture: ITexture): void;
        /**@inline*/ 
        public setUniform(sName: string, pValue: any): void;
        /**@inline*/ 
        public setStruct(sName: string, pValue: any): void;
        /**@inline*/ 
        public setSamplerTexture(sName: string, sTexture: string): void;
        /**@inline*/ 
        public setSamplerTexture(sName: string, pTexture: ITexture): void;
        public getRenderTarget(): IRenderTarget;
        public setRenderTarget(pTarget: IRenderTarget): void;
        public getPassInput(): IAFXPassInputBlend;
        public setPassInput(pInput: IAFXPassInputBlend, isNeedRelocate: bool): void;
        public blend(sComponentName: string, iPass: number): bool;
        /**@inline*/ 
        public activate(): void;
        /**@inline*/ 
        public deactivate(): void;
        /**@inline*/ 
        public isActive(): bool;
        private relocateOldInput(pNewInput);
    }
}
module akra.render {
    class RenderTechnique implements IRenderTechnique {
        private _pMethod;
        private _isFreeze;
        private _pComposer;
        private _pPassList;
        private _pPassBlackList;
        private _iCurrentPass;
        private _pCurrentPass;
        private _iGlobalPostEffectsStart;
        /**@inline*/ 
        public modified : number;
        public totalPasses : number;
        public data : IAFXComponentBlend;
        constructor(pMethod?: IRenderMethod);
        public destroy(): void;
        /**@inline*/ 
        public getPass(iPass: number): IRenderPass;
        public getMethod(): IRenderMethod;
        public setMethod(pMethod: IRenderMethod): void;
        public setState(sName: string, pValue: any): void;
        public setForeign(sName: string, pValue: any): void;
        public setStruct(sName: string, pValue: any): void;
        public setTextureBySemantics(sName: string, pValue: any): void;
        public setShadowSamplerArray(sName: string, pValue: any): void;
        public setVec2BySemantic(sName: string, pValue: any): void;
        public isReady(): bool;
        public addComponent(iComponentHandle: number, iShift?: number, iPass?: number, isSet?: bool): bool;
        public addComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number, isSet?: bool): bool;
        public addComponent(sComponent: string, iShift?: number, iPass?: number, isSet?: bool): bool;
        public delComponent(iComponentHandle: number, iShift?: number, iPass?: number): bool;
        public delComponent(sComponent: string, iShift?: number, iPass?: number): bool;
        public delComponent(pComponent: IAFXComponent, iShift?: number, iPass?: number): bool;
        public hasComponent(sComponent: string, iShift: number, iPass: number): bool;
        public hasGlobalPostEffect(): bool;
        public isPostEffectPass(iPass: number): bool;
        public isLastPass(iPass: number): bool;
        public isFirstPass(iPass: number): bool;
        public isFreeze(): bool;
        public updatePasses(bSaveOldUniformValue: bool): void;
        public _setComposer(pComposer: IAFXComposer): void;
        public _renderTechnique(pViewport: IViewport, pRenderable: IRenderableObject, pSceneObject: ISceneObject): void;
        public _updateMethod(pMethod: IRenderMethod): void;
        public _blockPass(iPass: number): void;
        public _setGlobalPostEffectsFrom(iPass: number): void;
        private informComposer();
        private activatePass(iPass);
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public render(iPass): void;
    }
}
module akra {
    interface IVec3 {
    }
    interface ICircle {
    }
    interface ISphere {
        center: IVec3;
        radius: number;
        circle: ICircle;
        z: number;
        set(): ISphere;
        set(pSphere: ISphere): ISphere;
        set(v3fCenter: IVec3, fRadius: number): ISphere;
        set(fCenterX: number, fCenterY: number, fCenterZ: number, fRadius: number): ISphere;
        clear(): ISphere;
        isEqual(pSphere: ISphere): bool;
        isClear(): bool;
        isValid(): bool;
        offset(v3fOffset: IVec3): ISphere;
        expand(fInc: number): ISphere;
        normalize(): ISphere;
        transform(m4fMatrix: IMat4): ISphere;
    }
}
module akra.geometry {
    class Sphere implements ISphere {
        public center: IVec3;
        public radius: number;
        constructor();
        constructor(pSphere: ISphere);
        constructor(v3fCenter: IVec3, fRadius: number);
        constructor(fCenterX: number, fCenterY: number, fCenterZ: number, fRadius: number);
        public circle : ICircle;
        public z : number;
        public set(): ISphere;
        public set(pSphere: ISphere): ISphere;
        public set(v3fCenter: IVec3, fRadius: number): ISphere;
        public set(fCenterX: number, fCenterY: number, fCenterZ: number, fRadius: number): ISphere;
        /**@inline*/ 
        public clear(): ISphere;
        /**@inline*/ 
        public isEqual(pSphere: ISphere): bool;
        /**@inline*/ 
        public isClear(): bool;
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public offset(v3fOffset: IVec3): ISphere;
        /**@inline*/ 
        public expand(fInc: number): ISphere;
        /**@inline*/ 
        public normalize(): ISphere;
        public transform(m4fMatrix: IMat4): ISphere;
    }
}
module akra {
    interface IRect2d {
    }
    interface IVec3 {
    }
    interface IRect3d {
        x0: number;
        x1: number;
        y0: number;
        y1: number;
        z0: number;
        z1: number;
        rect2d: IRect2d;
        set(): IRect3d;
        set(pRect: IRect3d): IRect3d;
        set(v3fSize: IVec3): IRect3d;
        set(fSizeX: number, fSizeY: number, fSizeZ: number): IRect3d;
        set(v3fMinPoint: IVec3, v3fMaxPoint: IVec3): IRect3d;
        set(fX0: number, fX1: number, fY0: number, fY1: number, fZ0: number, fZ1: number): IRect3d;
        setFloor(pRect: IRect3d): IRect3d;
        setCeil(pRect: IRect3d): IRect3d;
        clear(): IRect3d;
        addSelf(fValue: number): IRect3d;
        addSelf(v3fVec: IVec3): IRect3d;
        subSelf(fValue: number): IRect3d;
        subSelf(v3fVec: IVec3): IRect3d;
        multSelf(fValue: number): IRect3d;
        multSelf(v3fVec: IVec3): IRect3d;
        divSelf(fValue: number): IRect3d;
        divSelf(v3fVec: IVec3): IRect3d;
        offset(v3fOffset: IVec3): IRect3d;
        offset(fOffsetX: number, fOffsetY: number, fOffsetZ: number): IRect3d;
        expand(fValue: number): IRect3d;
        expand(v3fVec: IVec3): IRect3d;
        expand(fValueX: number, fValueY: number, fValueZ: number): IRect3d;
        expandX(fValue: number): IRect3d;
        expandY(fValue: number): IRect3d;
        expandZ(fValue: number): IRect3d;
        resize(v3fSize: IVec3): IRect3d;
        resize(fSizeX: number, fSizeY: number, fSizeZ: number): IRect3d;
        resizeX(fSize: number): IRect3d;
        resizeY(fSize: number): IRect3d;
        resizeZ(fSize: number): IRect3d;
        resizeMax(v3fSpan: IVec3): IRect3d;
        resizeMax(fSpanX: number, fSpanY: number, fSpanZ: number): IRect3d;
        resizeMaxX(fSpan: number): IRect3d;
        resizeMaxY(fSpan: number): IRect3d;
        resizeMaxZ(fSpan: number): IRect3d;
        resizeMin(v3fSpan: IVec3): IRect3d;
        resizeMin(fSpanX: number, fSpanY: number, fSpanZ: number): IRect3d;
        resizeMinX(fSpan: number): IRect3d;
        resizeMinY(fSpan: number): IRect3d;
        resizeMinZ(fSpan: number): IRect3d;
        unionPoint(v3fPoint: IVec3): IRect3d;
        unionPoint(fX: number, fY: number, fZ: number): IRect3d;
        unionRect(pRect: IRect3d): IRect3d;
        negate(pDestination?: IRect3d): IRect3d;
        normalize(): IRect3d;
        transform(m4fMatrix: IMat4): IRect3d;
        isEqual(pRect: IRect3d): bool;
        isClear(): bool;
        isValid(): bool;
        isPointInRect(v3fPoint: IVec3): bool;
        midPoint(v3fDestination?: IVec3): IVec3;
        midX(): number;
        midY(): number;
        midZ(): number;
        size(v3fDestination: IVec3): IVec3;
        sizeX(): number;
        sizeY(): number;
        sizeZ(): number;
        minPoint(v3fDestination?: IVec3): IVec3;
        maxPoint(v3fDestination?: IVec3): IVec3;
        volume(): number;
        corner(iIndex: number, v3fDestination?: IVec3): IVec3;
        createBoundingSphere(pSphere?: ISphere): ISphere;
        toString(): string;
    }
}
module akra.geometry {
    class Rect3d implements IRect3d {
        public x0: number;
        public x1: number;
        public y0: number;
        public y1: number;
        public z0: number;
        public z1: number;
        constructor();
        constructor(pRect: IRect3d);
        constructor(v3fSize: IVec3);
        constructor(fSizeX: number, fSizeY: number, fSizeZ: number);
        constructor(v3fMinPoint: IVec3, v3fMaxPoint: IVec3);
        constructor(fX0: number, fX1: number, fY0: number, fY1: number, fZ0: number, fZ1: number);
        public rect2d : IRect2d;
        public set(): IRect3d;
        public set(pRect: IRect3d): IRect3d;
        public set(v3fSize: IVec3): IRect3d;
        public set(fSizeX: number, fSizeY: number, fSizeZ: number): IRect3d;
        public set(v3fMinPoint: IVec3, v3fMaxPoint: IVec3): IRect3d;
        public set(fX0: number, fX1: number, fY0: number, fY1: number, fZ0: number, fZ1: number): IRect3d;
        public setFloor(pRect: IRect3d): IRect3d;
        public setCeil(pRect: IRect3d): IRect3d;
        /**@inline*/ 
        public clear(): IRect3d;
        public addSelf(fValue: number): IRect3d;
        public addSelf(v3fVec: IVec3): IRect3d;
        public subSelf(fValue: number): IRect3d;
        public subSelf(v3fVec: IVec3): IRect3d;
        public multSelf(fValue: number): IRect3d;
        public multSelf(v3fVec: IVec3): IRect3d;
        public divSelf(fValue: number): IRect3d;
        public divSelf(v3fVec: IVec3): IRect3d;
        public offset(v3fOffset: IVec3): IRect3d;
        public offset(fOffsetX: number, fOffsetY: number, fOffsetZ: number): IRect3d;
        public expand(fValue: number): IRect3d;
        public expand(v3fVec: IVec3): IRect3d;
        public expand(fValueX: number, fValueY: number, fValueZ: number): IRect3d;
        /**@inline*/ 
        public expandX(fValue: number): IRect3d;
        /**@inline*/ 
        public expandY(fValue: number): IRect3d;
        /**@inline*/ 
        public expandZ(fValue: number): IRect3d;
        public resize(v3fSize: IVec3): IRect3d;
        public resize(fSizeX: number, fSizeY: number, fSizeZ: number): IRect3d;
        /**@inline*/ 
        public resizeX(fSize: number): IRect3d;
        /**@inline*/ 
        public resizeY(fSize: number): IRect3d;
        /**@inline*/ 
        public resizeZ(fSize: number): IRect3d;
        public resizeMax(v3fSpan: IVec3): IRect3d;
        public resizeMax(fSpanX: number, fSpanY: number, fSpanZ: number): IRect3d;
        /**@inline*/ 
        public resizeMaxX(fSpan: number): IRect3d;
        /**@inline*/ 
        public resizeMaxY(fSpan: number): IRect3d;
        /**@inline*/ 
        public resizeMaxZ(fSpan: number): IRect3d;
        public resizeMin(v3fSpan: IVec3): IRect3d;
        public resizeMin(fSpanX: number, fSpanY: number, fSpanZ: number): IRect3d;
        /**@inline*/ 
        public resizeMinX(fSpan: number): IRect3d;
        /**@inline*/ 
        public resizeMinY(fSpan: number): IRect3d;
        /**@inline*/ 
        public resizeMinZ(fSpan: number): IRect3d;
        public unionPoint(v3fPoint: IVec3): IRect3d;
        public unionPoint(fX: number, fY: number, fZ: number): IRect3d;
        public unionRect(pRect: IRect3d): IRect3d;
        public negate(pDestination?: IRect3d): IRect3d;
        public normalize(): IRect3d;
        public transform(m4fMatrix: IMat4): IRect3d;
        /**@inline*/ 
        public isEqual(pRect: IRect3d): bool;
        /**@inline*/ 
        public isClear(): bool;
        /**@inline*/ 
        public isValid(): bool;
        /**@inline*/ 
        public isPointInRect(v3fPoint: IVec3): bool;
        public midPoint(v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public midX(): number;
        /**@inline*/ 
        public midY(): number;
        /**@inline*/ 
        public midZ(): number;
        public size(v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public sizeX(): number;
        /**@inline*/ 
        public sizeY(): number;
        /**@inline*/ 
        public sizeZ(): number;
        public minPoint(v3fDestination?: IVec3): IVec3;
        public maxPoint(v3fDestination?: IVec3): IVec3;
        /**@inline*/ 
        public volume(): number;
        /**
        * counter-clockwise and from bottom
        * x0,y0,z0 -> x1,y0,z0 -> x1,y1,z0 -> x0,y1,z0 ->
        * x0,y0,z1 -> x1,y0,z1 -> x1,y1,z1 -> x0,y1,z1
        */
        public corner(iIndex: number, v3fDestination?: IVec3): IVec3;
        public createBoundingSphere(pSphere?: ISphere): ISphere;
        public toString(): string;
        static stackCeil : Rect3d;
        static stackSize: number;
        static stackPosition: number;
        static stack: Rect3d[];
    }
}
module akra.scene {
    enum ESceneObjectFlags {
        k_NewLocalBounds,
        k_NewWorldBounds,
    }
    class SceneObject extends SceneNode implements ISceneObject {
        /**@protected*/ 
        public _iObjectFlags: number;
        /**@protected*/ 
        public _pLocalBounds: IRect3d;
        /**@protected*/ 
        public _pWorldBounds: IRect3d;
        /**@protected*/ 
        public _hasShadow: bool;
        /**@inline*/ 
        public totalRenderable : number;
        /**@inline*/ /**@inline*/ 
        public worldBounds : IRect3d;
        /**@inline*/ 
        public localBounds : IRect3d;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        /**@inline*/ 
        public getRenderable(i?: number): IRenderableObject;
        public accessLocalBounds(): IRect3d;
        /**@inline*/ 
        public isWorldBoundsNew(): bool;
        public destroy(): void;
        public prepareForUpdate(): void;
        public update(): bool;
        private recalcWorldBounds();
        /**@inline*/ /**@inline*/ 
        public hasShadow : bool;
        public getObjectFlags(): number;
        /**@inline*/ 
        public prepareForRender(pViewport: IViewport): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
        public worldBoundsUpdated(): void;
    }
    /**@inline*/ 
    function isSceneObject(pEntity: IEntity): bool;
}
module akra {
    interface IVec3 {
    }
    interface IPlane3d {
        normal: IVec3;
        distance: number;
        set(): IPlane3d;
        set(pPlane: IPlane3d): IPlane3d;
        set(v3fNormal: IVec3, fDistance: number): IPlane3d;
        set(v3fPoint1: IVec3, v3fPoint2: IVec3, v3fPoint3: IVec3): IPlane3d;
        clear(): IPlane3d;
        negate(): IPlane3d;
        normalize(): IPlane3d;
        isEqual(pPlane: IPlane3d): bool;
        projectPointToPlane(v3fPoint: IVec3, v3fDestination?: IVec3): IVec3;
        solveForX(fY: number, fZ: number): number;
        solveForY(fX: number, fZ: number): number;
        solveForZ(fX: number, fY: number): number;
        signedDistance(v3fPoint: IVec3): number;
    }
}
module akra.geometry {
    class Plane3d implements IPlane3d {
        public normal: IVec3;
        public distance: number;
        constructor();
        constructor(pPlane: IPlane3d);
        constructor(v3fNormal: IVec3, fDistance: number);
        constructor(v3fPoint1: IVec3, v3fPoint2: IVec3, v3fPoint3: IVec3);
        public set(): IPlane3d;
        public set(pPlane: IPlane3d): IPlane3d;
        public set(v3fNormal: IVec3, fDistance: number): IPlane3d;
        public set(v3fPoint1: IVec3, v3fPoint2: IVec3, v3fPoint3: IVec3): IPlane3d;
        /**@inline*/ 
        public clear(): IPlane3d;
        /**@inline*/ 
        public negate(): IPlane3d;
        public normalize(): IPlane3d;
        public isEqual(pPlane: IPlane3d): bool;
        public projectPointToPlane(v3fPoint: IVec3, v3fDestination?: IVec3): IVec3;
        public solveForX(fY: number, fZ: number): number;
        public solveForY(fX: number, fZ: number): number;
        public solveForZ(fX: number, fY: number): number;
        public signedDistance(v3fPoint: IVec3): number;
    }
}
module akra {
    interface IVec2 {
    }
    interface ICircle {
    }
    interface IPlane2d {
        normal: IVec2;
        distance: number;
        set(): IPlane2d;
        set(pPlane: IPlane2d): IPlane2d;
        set(v2fNormal: IVec2, fDistance: number): IPlane2d;
        set(v2fPoint1: IVec2, v2fPoint2: IVec2): IPlane2d;
        clear(): IPlane2d;
        negate(): IPlane2d;
        normalize(): IPlane2d;
        isEqual(pPlane: IPlane2d): bool;
        projectPointToPlane(v2fPoint: IVec2, v2fDestination?: IVec2): IVec2;
        solveForX(fY: number): number;
        solveForY(fX: number): number;
        signedDistance(v2fPoint): number;
    }
}
module akra.geometry {
    class Plane2d implements IPlane2d {
        public normal: IVec2;
        public distance: number;
        constructor();
        constructor(pPlane: IPlane2d);
        constructor(v2fNormal: IVec2, fDistance: number);
        constructor(v2fPoint1: IVec2, v2fPoint2: IVec2);
        public set(): IPlane2d;
        public set(pPlane: IPlane2d): IPlane2d;
        public set(v2fNormal: IVec2, fDistance: number): IPlane2d;
        public set(v2fPoint1: IVec2, v2fPoint2: IVec2): IPlane2d;
        /**@inline*/ 
        public clear(): IPlane2d;
        /**@inline*/ 
        public negate(): IPlane2d;
        public normalize(): IPlane2d;
        /**@inline*/ 
        public isEqual(pPlane: IPlane2d): bool;
        public projectPointToPlane(v2fPoint: IVec2, v2fDestination?: IVec2): IVec2;
        public solveForX(fY: number): number;
        public solveForY(fX: number): number;
        /**@inline*/ 
        public signedDistance(v2fPoint: IVec2): number;
    }
}
module akra {
    enum EVolumeClassifications {
        NO_RELATION,
        EQUAL,
        A_CONTAINS_B,
        B_CONTAINS_A,
        INTERSECTING,
    }
    enum EPlaneClassifications {
        /**
        * ax+by+cz+d=0
        * PLANE_FRONT - объект находится перед плоскостью, то есть по направлению нормали
        * PLANE_BACK - объект находится за плостостью, то есть против направления нормали
        */
        PLANE_FRONT,
        PLANE_BACK,
        PLANE_INTERSECT,
    }
}
module akra.geometry {
    function planeClassifyCircle(pPlane: IPlane2d, pCircle: ICircle): EPlaneClassifications;
    function planeClassifySphere(pPlane: IPlane3d, pSphere: ISphere): EPlaneClassifications;
    function planeClassifyRect2d(pPlane: IPlane2d, pRect: IRect2d): EPlaneClassifications;
    function planeClassifyRect3d(pPlane: IPlane3d, pRect: IRect3d): EPlaneClassifications;
    function planeClassify(pPlane: IPlane2d, pCircle: ICircle): EPlaneClassifications;
    function planeClassify(pPlane: IPlane3d, pSphere: ISphere): EPlaneClassifications;
    function planeClassify(pPlane: IPlane2d, pRect: IRect2d): EPlaneClassifications;
    function planeClassify(pPlane: IPlane3d, pRect: IRect3d): EPlaneClassifications;
    function classifyRect2d(pRectA: IRect2d, pRectB: IRect2d): EVolumeClassifications;
    function classifyRect3d(pRectA: IRect3d, pRectB: IRect3d): EVolumeClassifications;
    function classifyFrustumRect3d(pFrustum: IFrustum, pRect: IRect3d): EVolumeClassifications;
}
module akra {
    interface IMat4 {
    }
    interface IVec3 {
    }
    interface IRect3 {
    }
    interface ISphere {
    }
    interface IRect3d {
    }
    interface IFrustum {
        leftPlane: IPlane3d;
        rightPlane: IPlane3d;
        topPlane: IPlane3d;
        bottomPlane: IPlane3d;
        nearPlane: IPlane3d;
        farPlane: IPlane3d;
        frustumVertices: IVec3[];
        set(): IFrustum;
        set(pFrustum: IFrustum): IFrustum;
        set(pLeftPlane: IPlane3d, pRightPlane: IPlane3d, pTopPlane: IPlane3d, pBottomPlane: IPlane3d, pNearPlane: IPlane3d, pFarPlane: IPlane3d): IFrustum;
        calculateFrustumVertices(): IVec3[];
        extractFromMatrix(m4fProjection: IMat4, m4fWorld?: IMat4, pSearchRect?: IRect3d): IFrustum;
        isEqual(pFrustum: IFrustum): bool;
        getPlanePoints(sPlaneKey: string, pDestination?: IVec3[]): IVec3[];
        testPoint(v3fPoint: IVec3): bool;
        testRect(pRect: IRect3): bool;
        testSphere(pSphere: ISphere): bool;
        testFrustum(pFrustum: IFrustum): bool;
    }
}
module akra.geometry {
    class Frustum implements IFrustum {
        public leftPlane: IPlane3d;
        public rightPlane: IPlane3d;
        public topPlane: IPlane3d;
        public bottomPlane: IPlane3d;
        public nearPlane: IPlane3d;
        public farPlane: IPlane3d;
        public _pFrustumVertices: IVec3[];
        constructor();
        constructor(pFrustum: IFrustum);
        constructor(pLeftPlane: IPlane3d, pRightPlane: IPlane3d, pTopPlane: IPlane3d, pBottomPlane: IPlane3d, pNearPlane: IPlane3d, pFarPlane: IPlane3d);
        /**@inline*/ 
        public frustumVertices : IVec3[];
        public set(): IFrustum;
        public set(pFrustum: IFrustum): IFrustum;
        public set(pLeftPlane: IPlane3d, pRightPlane: IPlane3d, pTopPlane: IPlane3d, pBottomPlane: IPlane3d, pNearPlane: IPlane3d, pFarPlane: IPlane3d): IFrustum;
        public calculateFrustumVertices(): IVec3[];
        public extractFromMatrix(m4fProjection: IMat4, m4fWorld?: IMat4, pSearchRect?: IRect3d): IFrustum;
        /**@inline*/ 
        public isEqual(pFrustum: IFrustum): bool;
        public getPlanePoints(sPlaneKey: string, pDestination?: IVec3[]): IVec3[];
        public testPoint(v3fPoint: IVec3): bool;
        public testRect(pRect: IRect3d): bool;
        public testSphere(pSphere: ISphere): bool;
        public testFrustum(pFrustum: IFrustum): bool;
        static frustumPlanesKeys: string[];
    }
}
module akra.scene.objects {
    enum ECameraFlags {
        k_NewProjectionMatrix,
        k_NewProjectionParams,
    }
    class DLTechnique {
        public list: IDisplayList;
        public camera: ICamera;
        private _pPrevResult;
        constructor(pList: IDisplayList, pCamera: ICamera);
        /**@inline*/ 
        public findObjects(pResultArray: IObjectArray, bQuickSearch?: bool): IObjectArray;
    }
    class Camera extends SceneNode implements ICamera {
        /**@protected*/ 
        public _eCameraType: ECameraTypes;
        /**@protected*/ 
        public _iCameraOptions: number;
        /**@protected*/ 
        public _iUpdateProjectionFlags: number;
        /**@protected*/ 
        public _m4fView: IMat4;
        /**@protected*/ 
        public _m4fProj: IMat4;
        /**@protected*/ 
        public _m4fProjView: IMat4;
        /**@protected*/ 
        public _m4fRenderStageProj: IMat4;
        /**@protected*/ 
        public _m4fRenderStageProjView: IMat4;
        /**@protected*/ 
        public _pSearchRect: IRect3d;
        /**@protected*/ 
        public _v3fTargetPos: IVec3;
        /**@protected*/ 
        public _fFOV: number;
        /**@protected*/ 
        public _fAspect: number;
        /**@protected*/ 
        public _fNearPlane: number;
        /**@protected*/ 
        public _fFarPlane: number;
        /**@protected*/ 
        public _fWidth: number;
        /**@protected*/ 
        public _fHeight: number;
        /**@protected*/ 
        public _fMinX: number;
        /**@protected*/ 
        public _fMaxX: number;
        /**@protected*/ 
        public _fMinY: number;
        /**@protected*/ 
        public _fMaxY: number;
        /**@protected*/ 
        public _pFrustum: IFrustum;
        /**@protected*/ 
        public _pLastViewport: IViewport;
        /**@protected*/ 
        public _pDLTechniques: DLTechnique[];
        /**@protected*/ 
        public _pDLResultStorage: IObjectArray[];
        /**@inline*/ 
        public viewMatrix : IMat4;
        /**@inline*/ 
        public projectionMatrix : IMat4;
        /**@inline*/ 
        public projViewMatrix : IMat4;
        /**@inline*/ 
        public targetPos : IVec3;
        /**@inline*/ /**@inline*/ 
        public fov : number;
        /**@inline*/ /**@inline*/ 
        public aspect : number;
        /**@inline*/ /**@inline*/ 
        public nearPlane : number;
        /**@inline*/ /**@inline*/ 
        public farPlane : number;
        /**@inline*/ 
        public viewDistance : number;
        /**@inline*/ 
        public searchRect : IRect3d;
        /**@inline*/ 
        public frustum : IFrustum;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        public create(): bool;
        /**@inline*/ 
        public isProjParamsNew(): bool;
        public recalcProjMatrix(): void;
        public prepareForUpdate(): void;
        public display(iList?: number): IObjectArray;
        public setParameter(eParam: ECameraParameters, pValue: any): void;
        public isConstantAspect(): bool;
        public setProjParams(fFOV: number, fAspect: number, fNearPlane: number, fFarPlane: number): void;
        public setOrthoParams(fWidth: number, fHeight: number, fNearPlane: number, fFarPlane: number): void;
        public setOffsetOrthoParams(fMinX: number, fMaxX: number, fMinY: number, fMaxY: number, fNearPlane: number, fFarPlane: number): void;
        private recalcMatrices();
        public update(): bool;
        public lookAt(v3fFrom: IVec3, v3fCenter: IVec3, v3fUp?: IVec3): void;
        public lookAt(v3fCenter: IVec3, v3fUp?: IVec3): void;
        public _renderScene(pViewport: IViewport): void;
        public _keepLastViewport(pViewport: IViewport): void;
        public _getLastViewport(): IViewport;
        public _getNumRenderedFaces(): number;
        public _notifyRenderedFaces(nFaces: number): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
        public _addDisplayList(pScene: IScene3d, pList: IDisplayList, index: number): void;
        public _removeDisplayList(pScene: IScene3d, pList: IDisplayList, index: number): void;
        public preRenderScene(): void;
        public postRenderScene(): void;
    }
    /**@inline*/ 
    function isCamera(pNode: IEntity): bool;
}
module akra.scene.light {
    class ShadowCaster extends objects.Camera implements IShadowCaster {
        /**@protected*/ 
        public _pLightPoint: ILightPoint;
        /**@protected*/ 
        public _iFace: number;
        /**@protected*/ 
        public _pAffectedObjects: IObjectArray;
        /**@protected*/ 
        public _m4fOptimizedProj: IMat4;
        /**@protected*/ 
        public _isShadowCasted: bool;
        /**@inline*/ 
        public lightPoint : ILightPoint;
        /**@inline*/ 
        public face : number;
        /**@inline*/ 
        public affectedObjects : IObjectArray;
        /**@inline*/ 
        public optimizedProjection : IMat4;
        /**@inline*/ /**@inline*/ 
        public isShadowCasted : bool;
        constructor(pLightPoint: ILightPoint, iFace?: number);
        public _optimizeProjectionMatrix(): void;
    }
    function isShadowCaster(pEntity: IEntity): bool;
}
module akra.render {
    class ShadowViewport extends Viewport implements IViewport {
        constructor(pCamera: ICamera, pTarget: IRenderTarget, csRenderMethod?: string, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number, iZIndex?: number);
        public _updateImpl(): void;
        private prepareRenderableForShadows(pRenderable);
    }
}
module akra.render {
    interface IRenderTechniqueMap {
        [key: string]: IRenderTechnique;
    }
    class RenderableObject implements IRenderableObject {
        /**@protected*/ 
        public _pRenderData: IRenderData;
        /**@protected*/ 
        public _pRenderer: IRenderer;
        /**@protected*/ 
        public _pTechnique: IRenderTechnique;
        /**@protected*/ 
        public _pTechniqueMap: IRenderTechniqueMap;
        /**@protected*/ 
        public _bShadow: bool;
        /**@protected*/ 
        public _bVisible: bool;
        /**@protected*/ 
        public _eRenderableType: ERenderDataTypes;
        /**@inline*/ 
        public type : ERenderDataTypes;
        constructor(eType?: ERenderDataTypes);
        /**@inline*/ /**@inline*/ 
        public renderMethod : IRenderMethod;
        /**@inline*/ 
        public effect : IEffect;
        /**@inline*/ 
        public surfaceMaterial : ISurfaceMaterial;
        /**@inline*/ 
        public material : IMaterial;
        /**@inline*/ 
        public data : IRenderData;
        /**@inline*/ /**@inline*/ 
        public hasShadow : bool;
        /**@inline*/ 
        public _setRenderData(pData: IRenderData): void;
        public _setup(pRenderer: IRenderer, csDefaultMethod?: string): void;
        /**@inline*/ 
        public getRenderer(): IRenderer;
        public destroy(): void;
        public addRenderMethod(pMethod: IRenderMethod, csName?: string): bool;
        public addRenderMethod(csMethod: string, csName?: string): bool;
        public switchRenderMethod(pMethod: IRenderMethod): bool;
        public switchRenderMethod(csName: string): bool;
        public removeRenderMethod(csName: string): bool;
        /**@inline*/ 
        public getRenderMethod(csName?: string): IRenderMethod;
        /**@inline*/ 
        public getRenderMethodDefault(): IRenderMethod;
        /**@inline*/ 
        public isReadyForRender(): bool;
        public isAllMethodsLoaded(): bool;
        public render(pViewport: IViewport, csMethod?: string, pSceneObject?: ISceneObject): void;
        /**@inline*/ 
        public getTechnique(sName?: string): IRenderTechnique;
        /**@inline*/ 
        public getTechniqueDefault(): IRenderTechnique;
        public _draw(): void;
        /**@inline*/ 
        public _setVisible(bVisible: bool): void;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public shadow(bValue): void;
        public beforeRender(pViewport): void;
    }
    /**@inline*/ 
    function isMeshSubset(pObject: IRenderableObject): bool;
    /**@inline*/ 
    function isScreen(pObject: IRenderableObject): bool;
}
module akra.render {
    class Screen extends RenderableObject {
        /**@protected*/ 
        public _pBuffer: IRenderDataCollection;
        constructor(pRenderer: IRenderer);
    }
}
module akra.render {
    class DSViewport extends Viewport implements IDSViewport {
        private _pDefereedColorTextures;
        private _pDeferredDepthTexture;
        private _pDeferredView;
        private _pDeferredSkyTexture;
        private _pLightDL;
        private _pLightingUnifoms;
        private _pLightPoints;
        constructor(pCamera: ICamera, pTarget: IRenderTarget, csRenderMethod?: string, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number, iZIndex?: number);
        public _updateDimensions(): void;
        public _updateImpl(): void;
        public prepareForDeferredShading(): void;
        public setSkybox(pSkyTexture: ITexture): bool;
        public setFXAA(bValue?: bool): void;
        public destroy(): void;
        public _onRender(pTechnique: IRenderTechnique, iPass: number): void;
        /**@inline*/ 
        private resetUniforms();
        private createLightingUniforms(pCamera, pLightPoints, pUniforms);
    }
}
module akra.render {
    class RenderTarget implements IRenderTarget {
        /**@protected*/ 
        public _sName: string;
        /**@protected*/ 
        public _pRenderer: IRenderer;
        /**@protected*/ 
        public _iPriority: number;
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _iColorDepth: number;
        /**@protected*/ 
        public _pDepthBuffer: IDepthBuffer;
        /**@protected*/ 
        public _pDepthPixelBuffer: IPixelBuffer;
        /**@protected*/ 
        public _pFrameStats: IFrameStats;
        /**@protected*/ 
        public _pTimer: IUtilTimer;
        /**@protected*/ 
        public _fLastSecond: number;
        /**@protected*/ 
        public _fLastTime: number;
        /**@protected*/ 
        public _iFrameCount: number;
        /**@protected*/ 
        public _isActive: bool;
        /**@protected*/ 
        public _isAutoUpdate: bool;
        /**@protected*/ 
        public _bHwGamma: bool;
        /**@protected*/ 
        public _pViewportList: IViewport[];
        /**@inline*/ /**@inline*/ 
        public name : string;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public colorDepth : number;
        /**@inline*/ 
        public totalViewports : number;
        /**@inline*/ 
        public totalFrames : number;
        /**@inline*/ 
        public priority : number;
        constructor(pRenderer: IRenderer);
        /**@inline*/ 
        public getRenderer(): IRenderer;
        public destroy(): void;
        public getDepthBuffer(): IDepthBuffer;
        public attachDepthBuffer(pBuffer: IDepthBuffer): bool;
        public attachDepthPixelBuffer(pBuffer: IPixelBuffer): bool;
        public detachDepthPixelBuffer(): void;
        public detachDepthBuffer(): void;
        public attachDepthTexture(pTexture: ITexture): bool;
        public detachDepthTexture(): void;
        public _detachDepthBuffer(): void;
        public _beginUpdate(): void;
        public _updateAutoUpdatedViewports(bUpdateStatistics?: bool): void;
        public _endUpdate(): void;
        public _updateViewport(iZIndex: number, bUpdateStatistics?: bool): void;
        public _updateViewport(pViewportPtr: IViewport, bUpdateStatistics?: bool): void;
        public addViewport(pCamera: ICamera, csRenderMethod?: string, iZIndex?: number, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number): IViewport;
        public addViewport(pCamera: ICamera, eType?: number, iZIndex?: number, fLeft?: number, fTop?: number, fWidth?: number, fHeight?: number): IViewport;
        public removeViewport(iZIndex: number): bool;
        public removeAllViewports(): number;
        /**@inline*/ 
        public getStatistics(): IFrameStats;
        /**@inline*/ 
        public getLastFPS(): number;
        /**@inline*/ 
        public getAverageFPS(): number;
        /**@inline*/ 
        public getBestFPS(): number;
        /**@inline*/ 
        public getWorstFPS(): number;
        /**@inline*/ 
        public getPolygonCount(): number;
        /**@inline*/ 
        public getBestFrameTime(): number;
        /**@inline*/ 
        public getWorstFrameTime(): number;
        public resetStatistics(): void;
        public updateStats(): void;
        public getCustomAttribute(sName: string): any;
        public getViewport(iIndex: number): IViewport;
        public getViewportByZIndex(iZIndex: number): IViewport;
        /**@inline*/ 
        public hasViewportByZIndex(iZIndex: number): bool;
        /**@inline*/ 
        public isActive(): bool;
        public setActive(bValue?: bool): void;
        /**@inline*/ 
        public setAutoUpdated(isAutoUpdate?: bool): void;
        public _notifyCameraRemoved(pCamera: ICamera): void;
        /**@inline*/ 
        public isAutoUpdated(): bool;
        /**@inline*/ 
        public isPrimary(): bool;
        public update(): void;
        public readPixels(ppDest?: IPixelBox, eFramebuffer?: EFramebuffer): IPixelBox;
        /**@protected*/ 
        public updateImpl(): void;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public preUpdate(): void;
        public viewportPreUpdate(pViewport): void;
        public viewportPostUpdate(pViewport): void;
        public viewportAdded(pViewport): void;
        public viewportRemoved(pViewport): void;
        public postUpdate(): void;
        public resized(): void;
        public cameraRemoved(pCamera): void;
    }
}
module akra.render {
    class RenderEntry implements IRenderEntry {
        public viewport: IViewport;
        public renderTarget: IRenderTarget;
        public maker: IAFXMaker;
        public input: IShaderInput;
        public bufferMap: IBufferMap;
        public clear(): void;
    }
}
module akra.render {
    class RenderQueue implements IRenderQueue {
        /**@protected*/ 
        public _pRenderer: IRenderer;
        /**@protected*/ 
        public _pEntryList: util.ObjectArray;
        constructor(pRenderer: IRenderer);
        public execute(): void;
        public push(pEntry: IRenderEntry): void;
        /**@inline*/ 
        public createEntry(): IRenderEntry;
        /**@inline*/ 
        public releaseEntry(pEntry: IRenderEntry): void;
        static createEntry(): IRenderEntry;
        static releaseEntry(pEntry: IRenderEntry): void;
        static pool: util.ObjectArray;
    }
}
module akra.render {
    var SShaderPrefixes: {
        k_Sampler: string;
        k_Header: string;
        k_Attribute: string;
        k_Offset: string;
        k_Texture: string;
        k_Texcoord: string;
        k_Texmatrix: string;
        k_Temp: string;
        k_BlendType: string;
    };
    var ZEROSAMPLER: number;
    var SSystemSemantics: {
        MODEL_MATRIX: string;
        VIEW_MATRIX: string;
        PROJ_MATRIX: string;
        NORMAL_MATRIX: string;
        BIND_MATRIX: string;
        RENDER_OBJECT_ID: string;
    };
    interface IRenderTargetPriorityMap {
        [priority: number]: IRenderTarget[];
    }
    class Renderer implements IRenderer {
        /**@protected*/ 
        public _isActive: bool;
        /**@protected*/ 
        public _pEngine: IEngine;
        /**@protected*/ 
        public _pRenderTargets: IRenderTarget[];
        /**@protected*/ 
        public _pPrioritisedRenderTargets: IRenderTargetPriorityMap;
        /**@protected*/ 
        public _pRenderQueue: RenderQueue;
        /**@protected*/ 
        public _pActiveViewport: IViewport;
        /**@protected*/ 
        public _pActiveRenderTarget: IRenderTarget;
        /**@protected*/ 
        public _bLockRenderTarget: bool;
        constructor(pEngine: IEngine);
        /**@inline*/ 
        public getEngine(): IEngine;
        public hasCapability(eCapability: ERenderCapabilities): bool;
        public debug(bValue?: bool, useApiTrace?: bool): bool;
        public isDebug(): bool;
        public isValid(): bool;
        /**@inline*/ 
        public getError(): string;
        public _beginRender(): void;
        public _renderEntry(pEntry: IRenderEntry): void;
        public _endRender(): void;
        public clearFrameBuffer(iBuffer: number, cColor: IColor, fDepth: number, iStencil: number): void;
        public attachRenderTarget(pTarget: IRenderTarget): bool;
        public detachRenderTarget(pTarget: IRenderTarget): bool;
        public destroyRenderTarget(pTarget: IRenderTarget): void;
        public getActiveProgram(): IShaderProgram;
        /**@inline*/ 
        public _disableAllTextureUnits(): void;
        /**@inline*/ 
        public _disableTextureUnitsFrom(iUnit: number): void;
        public _initRenderTargets(): void;
        public _updateAllRenderTargets(): void;
        public _setViewport(pViewport: IViewport): void;
        public _setViewportForRender(pViewport: IViewport): void;
        public _getViewport(): IViewport;
        public _setRenderTarget(pTarget: IRenderTarget): void;
        public _setCullingMode(eMode: ECullingMode): void;
        public _setDepthBufferParams(bDepthTest: bool, bDepthWrite: bool, eDepthFunction: ECompareFunction, fClearDepth?: number): void;
        public getDefaultCanvas(): ICanvas3d;
        /**@inline*/ 
        public createEntry(): IRenderEntry;
        /**@inline*/ 
        public releaseEntry(pEntry: IRenderEntry): void;
        /**@inline*/ 
        public pushEntry(pEntry: IRenderEntry): void;
        /**@inline*/ 
        public executeQueue(): void;
        /**@protected*/ /**@inline*/ 
        public lockRenderTarget(): void;
        /**@protected*/ /**@inline*/ 
        public unlockRenderTarget(): void;
        /**@protected*/ /**@inline*/ 
        public isLockRenderTarget(): bool;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public active(pEngine: IEngine): void;
        public inactive(pEngine: IEngine): void;
    }
}
module akra.util {
    class UtilTimer implements IUtilTimer {
        private isTimerInitialized;
        private isTimerStopped;
        private fTicksPerSec;
        private iStopTime;
        private iLastElapsedTime;
        private iBaseTime;
        /**@inline*/ 
        public absoluteTime : number;
        /**@inline*/ 
        public appTime : number;
        /**@inline*/ 
        public elapsedTime : number;
        /**@inline*/ 
        public start(): bool;
        /**@inline*/ 
        public stop(): bool;
        /**@inline*/ 
        public reset(): bool;
        public execCommand(eCommand: EUtilTimerCommands): number;
        static start(): UtilTimer;
    }
}
module akra.render {
    class Canvas3d extends RenderTarget implements ICanvas3d {
        /**@protected*/ 
        public _isFullscreen: bool;
        /**@protected*/ 
        public _isPrimary: bool;
        /**@protected*/ 
        public _bAutoDeactivatedOnFocusChange: bool;
        public left: number;
        public top: number;
        public type : ECanvasTypes;
        constructor(pRenderer: IRenderer);
        public create(sName: string, iWidth: number, iHeight: number, isFullscreen?: bool): bool;
        public destroy(): void;
        public setFullscreen(isFullscreen?: bool): void;
        public setVisible(bVisible?: bool): void;
        public setDeactivateOnFocusChange(bDeactivate?: bool): void;
        /**@inline*/ 
        public isFullscreen(): bool;
        public isVisible(): bool;
        public isClosed(): bool;
        public isPrimary(): bool;
        public isDeactivatedOnFocusChange(): bool;
        public resize(iWidth: number, iHeight: number): void;
    }
}
module akra.webgl {
    class WebGLCanvas extends render.Canvas3d {
        /**@protected*/ 
        public _pCanvas: HTMLCanvasElement;
        /**@protected*/ 
        public _pCanvasCreationInfo: ICanvasInfo;
        /**@protected*/ 
        public _iRealWidth: number;
        /**@protected*/ 
        public _iRealHeight: number;
        public left : number;
        public top : number;
        constructor(pRenderer: IRenderer);
        public create(sName?: string, iWidth?: number, iHeight?: number, isFullscreen?: bool): bool;
        public destroy(): void;
        public getCustomAttribute(sName: string): any;
        public setFullscreen(isFullscreen?: bool): void;
        /**@inline*/ 
        public isVisible(): bool;
        public setVisible(bVisible?: bool): void;
        public resize(iWidth?: number, iHeight?: number): void;
        public readPixels(ppDest?: IPixelBox, eFramebuffer?: EFramebuffer): IPixelBox;
        static fullscreenLock: bool;
    }
}
module akra.webgl {
    interface WebGLUniformLocationMap {
        [index: string]: WebGLUniformLocation;
    }
    class WebGLShaderProgram extends core.pool.ResourcePoolItem implements IShaderProgram {
        /**@protected*/ 
        public _pWebGLRenderer: WebGLRenderer;
        /**@protected*/ 
        public _pWebGLContext: WebGLRenderingContext;
        /**@protected*/ 
        public _pWebGLProgram: WebGLProgram;
        /**@protected*/ 
        public _pWebGLUniformLocations: WebGLUniformLocationMap;
        /**@protected*/ 
        public _pWebGLAttributeLocations: IntMap;
        /**@protected*/ 
        public _pWebGLAttributesInfo: WebGLActiveInfo[];
        /**@protected*/ 
        public _iTotalAttributes: number;
        public create(csVertex?: string, csPixel?: string): bool;
        public destroy(): void;
        public compile(csVertex?: string, csPixel?: string): bool;
        /**@inline*/ 
        public totalAttributes : number;
        /**@inline*/ 
        public _getActiveUniformNames(): string[];
        /**@inline*/ 
        public _getActiveAttributeNames(): string[];
        /**@inline*/ 
        public _getActiveAttribLocations(): IntMap;
        public isLinked(): bool;
        public isValid(): bool;
        public isActive(): bool;
        /**@inline*/ 
        public setFloat(sName: string, fValue: number): void;
        /**@inline*/ 
        public setInt(sName: string, iValue: number): void;
        public setVec2(sName: string, v2fValue: IVec2): void;
        public setVec2(sName: string, x: number, y: number): void;
        public setVec2i(sName: string, v2iValue: IVec2): void;
        public setVec2i(sName: string, x: number, y: number): void;
        public setVec3(sName: string, v3fValue: IVec3): void;
        public setVec3(sName: string, x: number, y: number, z: number): void;
        public setVec3i(sName: string, v3iValue: IVec3): void;
        public setVec3i(sName: string, x: number, y: number, z: number): void;
        public setVec4(sName: string, v4fValue: IVec4): void;
        public setVec4(sName: string, x: number, y: number, z: number, w: number): void;
        public setVec4i(sName: string, v4iValue: IVec4): void;
        public setVec4i(sName: string, x: number, y: number, z: number, w: number): void;
        /**@inline*/ 
        public setMat3(sName: string, m3fValue: IMat3): void;
        public setMat4(sName: string, m4fValue: IMat4): void;
        /**@inline*/ 
        public setFloat32Array(sName: string, pValue: Float32Array): void;
        /**@inline*/ 
        public setInt32Array(sName: string, pValue: Int32Array): void;
        static uniformBuffer: ArrayBuffer;
        /**@inline*/ 
        public setVec2Array(sName: string, pValue: IVec2[]): void;
        /**@inline*/ 
        public setVec2iArray(sName: string, pValue: IVec2[]): void;
        /**@inline*/ 
        public setVec3Array(sName: string, pValue: IVec3[]): void;
        /**@inline*/ 
        public setVec3iArray(sName: string, pValue: IVec3[]): void;
        /**@inline*/ 
        public setVec4Array(sName: string, pValue: IVec4[]): void;
        /**@inline*/ 
        public setVec4iArray(sName: string, pValue: IVec4[]): void;
        /**@inline*/ 
        public setMat3Array(sName: string, pValue: IMat3[]): void;
        /**@inline*/ 
        public setMat4Array(sName: string, pValue: IMat4[]): void;
        /**@inline*/ 
        public setStruct(sName: string, pData: Object): void;
        /**@inline*/ 
        public setSampler(sName: string, pSampler: IAFXSamplerState): void;
        /**@inline*/ 
        public setVertexBuffer(sName: string, pBuffer: IVertexBuffer): void;
        /**@inline*/ 
        public setSamplerArray(sName: string, pList: IAFXSamplerState[]): void;
        /**@inline*/ 
        public setTexture(sName: string, pData: ITexture): void;
        private applySamplerState(pSampler);
        public applyVertexData(sName: string, pData: IVertexData): bool;
        /**@inline*/ 
        public applyBufferMap(pMap: IBufferMap): void;
        /**@inline*/ 
        public getWebGLAttributeLocation(sName: string): number;
        /**@inline*/ 
        public getWebGLUniformLocations(): WebGLUniformLocationMap;
        /**@inline*/ 
        public getWebGLUniformLocation(sName: string): WebGLUniformLocation;
        /**@inline*/ 
        public getWebGLProgram(): WebGLProgram;
        /**@protected*/ 
        public createWebGLShader(eType: number, csCode: string): WebGLShader;
        /**@protected*/ 
        public obtainWebGLUniforms(): void;
        /**@protected*/ 
        public obtainWebGLAttributes(): void;
    }
}
module akra.webgl {
    class WebGLRenderer extends render.Renderer {
        private _pCanvas;
        private _pWebGLContext;
        private _pWebGLFramebufferList;
        private _pDefaultCanvas;
        private _pWebGLInternalContext;
        private _nActiveAttributes;
        private _iSlot;
        constructor(pEngine: IEngine);
        constructor(pEngine: IEngine, sCanvas: string);
        constructor(pEngine: IEngine, pCanvas: HTMLCanvasElement);
        public debug(bValue?: bool, useApiTrace?: bool): bool;
        public _beginRender(): void;
        public _renderEntry(pEntry: IRenderEntry): void;
        public _endRender(): void;
        public _setViewport(pViewport: IViewport): void;
        public _setRenderTarget(pTarget: IRenderTarget): void;
        public _setCullingMode(eMode: ECullingMode): void;
        public _setDepthBufferParams(bDepthTest: bool, bDepthWrite: bool, eDepthFunction: ECompareFunction, fClearDepth?: number): void;
        public isDebug(): bool;
        /**@inline*/ 
        public getHTMLCanvas(): HTMLCanvasElement;
        /**@inline*/ 
        public getWebGLContext(): WebGLRenderingContext;
        /**@inline*/ 
        public bindWebGLBuffer(eTarget: number, pBuffer: WebGLBuffer): void;
        /**@inline*/ 
        public createWebGLBuffer(): WebGLBuffer;
        /**@inline*/ 
        public deleteWebGLBuffer(pBuffer: WebGLBuffer): void;
        /**@inline*/ 
        public bindWebGLTexture(eTarget: number, pTexture: WebGLTexture): void;
        /**@inline*/ 
        public activateWebGLTexture(iWebGLSlot: number): void;
        /**@inline*/ 
        public getNextTextureSlot(): number;
        /**@inline*/ 
        public getTextureSlot(): number;
        /**@inline*/ 
        public createWebGLTexture(): WebGLTexture;
        /**@inline*/ 
        public deleteWebGLTexture(pTexture: WebGLTexture): void;
        /**@inline*/ 
        public createWebGLFramebuffer(): WebGLFramebuffer;
        /**@inline*/ 
        public bindWebGLFramebuffer(eTarget: number, pBuffer: WebGLFramebuffer): void;
        /**@inline*/ 
        public bindWebGLFramebufferTexture2D(eTarget: number, eAttachment: number, eTexTarget: number, pTexture: WebGLTexture, iMipLevel?: number): void;
        /**@inline*/ 
        public deleteWebGLFramebuffer(pBuffer: WebGLFramebuffer): void;
        /**@inline*/ 
        public createWebGLRenderbuffer(): WebGLRenderbuffer;
        /**@inline*/ 
        public bindWebGLRenderbuffer(eTarget: number, pBuffer: WebGLRenderbuffer): void;
        /**@inline*/ 
        public deleteWebGLRenderbuffer(pBuffer: WebGLRenderbuffer): void;
        /**@inline*/ 
        public createWebGLProgram(): WebGLProgram;
        /**@inline*/ 
        public deleteWebGLProgram(pProgram: WebGLProgram): void;
        /**@inline*/ 
        public useWebGLProgram(pProgram: WebGLProgram): void;
        public enableWebGLVertexAttribs(iTotal: number): void;
        public disableAllWebGLVertexAttribs(): void;
        public getDefaultCanvas(): ICanvas3d;
        public clearFrameBuffer(iBuffers: number, cColor: IColor, fDepth: number, iStencil: number): void;
        private convertCompareFunction(eFunc);
    }
}
module akra.webgl {
    function computeLog(iValue: number): number;
    class WebGLTextureBuffer extends WebGLPixelBuffer implements IPixelBuffer {
        /**@protected*/ 
        public _eTarget: number;
        /**@protected*/ 
        public _eFaceTarget: number;
        /**@protected*/ 
        public _pWebGLTexture: WebGLTexture;
        /**@protected*/ 
        public _iFace: number;
        /**@protected*/ 
        public _iLevel: number;
        /**@protected*/ 
        public _bSoftwareMipmap: bool;
        /**@protected*/ 
        public _pRTTList: IRenderTexture[];
        constructor();
        public _clearRTT(iZOffset: number): void;
        public reset(): void;
        public reset(iSize: number): void;
        public reset(iWidth: number, iHeight: number): void;
        private notifyResized();
        public create(iFlags: number): bool;
        public create(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats, iFlags: number): bool;
        public create(eTarget: number, pTexture: WebGLTexture, iWidth: number, iHeight: number, iInternalFormat: number, iFormat: number, iFace: number, iLevel: number, iFlags: number, bSoftwareMipmap: bool): bool;
        public destroy(): void;
        /**@protected*/ 
        public upload(pData: IPixelBox, pDestBox: IBox): void;
        /**@protected*/ 
        public download(pData: IPixelBox): void;
        /**@protected*/ 
        public buildMipmaps(pData: IPixelBox): void;
        public _bindToFramebuffer(iAttachment: number, iZOffset: number): void;
        public _copyFromFramebuffer(iZOffset: number): void;
        /**@inline*/ 
        public _getTarget(): number;
        /**@inline*/ 
        public _getWebGLTexture(): WebGLTexture;
        public blit(pSource: IPixelBuffer): bool;
        public blit(pSource: IPixelBuffer, pSrcBox: IBox, pDestBox: IBox): bool;
        public blitFromTexture(pSource: WebGLTextureBuffer, pSrcBox: IBox, pDestBox: IBox): bool;
        public blitFromMemory(pSource: IPixelBox): bool;
        public blitFromMemory(pSource: IPixelBox, pDestBox?: IBox): bool;
        public getRenderTarget(): IRenderTarget;
        public getRenderTarget(iZOffest: number): IRenderTarget;
        public resize(iSize: number): bool;
    }
}
module akra.webgl {
    class WebGLInternalTexture extends core.pool.resources.Texture {
        private _pSurfaceList;
        private _pWebGLTexture;
        /**@inline*/ 
        public getWebGLTexture(): WebGLTexture;
        constructor();
        public _getWebGLTextureTarget(): number;
        private _getWebGLTextureParameter(eParam);
        private _getWebGLTextureParameterValue(eValue);
        public reset(): void;
        public reset(iSize: number): void;
        public reset(iWidth: number, iHeight: number): void;
        /**@protected*/ 
        public _setFilterInternalTexture(eParam: ETextureParameters, eValue: ETextureFilters): bool;
        /**@protected*/ 
        public _setWrapModeInternalTexture(eParam: ETextureParameters, eValue: ETextureWrapModes): bool;
        /**@protected*/ 
        public _getFilterInternalTexture(eParam: ETextureParameters): ETextureFilters;
        /**@protected*/ 
        public _getWrapModeInternalTexture(eParam: ETextureParameters): ETextureWrapModes;
        /**@protected*/ 
        public _createInternalTextureImpl(cFillColor?: IColor): bool;
        /**@protected*/ 
        public freeInternalTextureImpl(): bool;
        private _createSurfaceList();
        public getBuffer(iFace?: number, iMipmap?: number): IPixelBuffer;
        public createRenderTexture(): bool;
    }
}
module akra {
    interface IBufferDataModifier {
        (pData: ArrayBufferView): void;
    }
}
module akra.data {
    class VertexData implements IVertexData {
        private _pVertexBuffer;
        private _iOffset;
        private _iStride;
        private _iLength;
        private _pVertexDeclaration;
        private _iId;
        /**@inline*/ 
        public id : number;
        /**@inline*/ 
        public length : number;
        /**@inline*/ 
        public byteOffset : number;
        /**@inline*/ 
        public byteLength : number;
        /**@inline*/ 
        public buffer : IVertexBuffer;
        /**@inline*/ 
        public stride : number;
        /**@inline*/ 
        public startIndex : number;
        constructor(pVertexBuffer: IVertexBuffer, id: number, iOffset: number, iCount: number, nSize: number);
        constructor(pVertexBuffer: IVertexBuffer, id: number, iOffset: number, iCount: number, pDecl: IVertexDeclaration);
        public getVertexDeclaration(): VertexDeclaration;
        public setVertexDeclaration(pDecl: IVertexDeclaration): bool;
        /**@inline*/ 
        public getVertexElementCount(): number;
        public hasSemantics(sUsage: string): bool;
        public destroy(): void;
        public extend(pDecl: IVertexDeclaration, pData?: ArrayBufferView): bool;
        public resize(nCount: number, pDecl?: IVertexDeclaration): bool;
        public resize(nCount: number, iStride?: number): bool;
        public applyModifier(sUsage: string, fnModifier: IBufferDataModifier): bool;
        public setData(pData: ArrayBufferView, iOffset: number, iSize?: number, nCountStart?: number, nCount?: number): bool;
        public setData(pData: ArrayBufferView, sUsage?: string, iSize?: number, nCountStart?: number, nCount?: number): bool;
        public getData(): ArrayBuffer;
        public getData(iOffset: number, iSize: number, iFrom?: number, iCount?: number): ArrayBuffer;
        public getData(sUsage: string): ArrayBuffer;
        public getData(sUsage: string, iFrom: number, iCount: number): ArrayBuffer;
        public getTypedData(sUsage: string, iFrom?: number, iCount?: number): ArrayBufferView;
        /**@inline*/ 
        public getBufferHandle(): number;
        public toString(): string;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public relocation(pTarget, iFrom, iTo): void;
    }
}
module akra.core.pool.resources {
    class MemoryBuffer extends HardwareBuffer {
        /**@protected*/ 
        public _pData: Uint8Array;
        /**@inline*/ 
        public byteLength : number;
        public create(iByteSize: number, iFlags?: number): bool;
        public destroy(): void;
        public resize(iSize: number): bool;
        public lockImpl(iOffset: number, iLength: number, iLockFlags: number): Uint8Array;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
    }
}
module akra.core.pool.resources {
    class VertexBuffer extends HardwareBuffer implements IVertexBuffer {
        /**@protected*/ 
        public _pVertexDataArray: IVertexData[];
        /**@protected*/ 
        public _iDataCounter: number;
        /**@inline*/ 
        public type : EVertexBufferTypes;
        /**@inline*/ 
        public length : number;
        constructor();
        public create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        public destroy(): void;
        public getVertexData(i: number): IVertexData;
        public getVertexData(iOffset: number, iCount: number, pElements: IVertexElement[]): IVertexData;
        public getVertexData(iOffset: number, iCount: number, pDecl: IVertexDeclaration): IVertexData;
        public getEmptyVertexData(iCount: number, pElements: IVertexElement[], ppVertexDataIn?: IVertexData): IVertexData;
        public getEmptyVertexData(iCount: number, pDecl: IVertexDeclaration, ppVertexDataIn?: IVertexData): IVertexData;
        public getEmptyVertexData(iCount: number, pSize: number, ppVertexDataIn?: IVertexData): IVertexData;
        public freeVertexData(): bool;
        public allocateData(pElements: IVertexElementInterface[], pData: ArrayBufferView): IVertexData;
        public allocateData(pDecl: IVertexDeclaration, pData: ArrayBufferView): IVertexData;
    }
    /**@inline*/ 
    function isVBO(pBuffer: IVertexBuffer): bool;
    /**@inline*/ 
    function isTBO(pBuffer: IVertexBuffer): bool;
}
module akra.webgl {
    class WebGLVertexBuffer extends core.pool.resources.VertexBuffer implements IVertexBuffer {
        /**@protected*/ 
        public _iByteSize: number;
        /**@protected*/ 
        public _pWebGLBuffer: WebGLBuffer;
        private _pLockData;
        /**@protected*/ 
        public _sCS: string;
        /**@inline*/ 
        public type : EVertexBufferTypes;
        /**@inline*/ 
        public byteLength : number;
        constructor();
        public create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        public destroy(): void;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: Uint8Array, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public resize(iSize: number): bool;
        /**@inline*/ 
        public getWebGLBuffer(): WebGLBuffer;
        /**@protected*/ 
        public lockImpl(iOffset: number, iSize: number, iLockFlags: number): any;
        /**@protected*/ 
        public unlockImpl(): void;
        /**@protected*/ 
        public copyBackupToRealImpl(pRealData: Uint8Array, pBackupData: Uint8Array, iLockFlags: number): void;
    }
}
module akra.webgl {
    class WebGLVertexTexture extends core.pool.resources.VertexBuffer implements IVertexBuffer {
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _pWebGLTexture: WebGLTexture;
        /**@protected*/ 
        public _eWebGLFormat: number;
        /**@protected*/ 
        public _eWebGLType: number;
        /**@protected*/ 
        public _ePixelFormat: EPixelFormats;
        /**@protected*/ 
        public _bForceUpdateBackupCopy: bool;
        /**@protected*/ 
        public _pHeader: IVertexData;
        private _pLockData;
        /**@inline*/ 
        public type : EVertexBufferTypes;
        /**@inline*/ 
        public byteLength : number;
        /**@inline*/ 
        public getWebGLTexture(): WebGLTexture;
        constructor();
        public create(iByteSize: number, iFlags?: number, pData?: Uint8Array): bool;
        public create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        public destroy(): void;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: Uint8Array, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public resize(iSize: number): bool;
        /**@protected*/ 
        public lockImpl(iOffset: number, iSize: number, iLockFlags: number): any;
        /**@protected*/ 
        public unlockImpl(): void;
        /**@protected*/ 
        public copyBackupToRealImpl(pRealData: Uint8Array, pBackupData: Uint8Array, iLockFlags: number): void;
        /**@protected*/ 
        public _header(iTextureSizeX?: number, iTextureSizeY?: number): Float32Array;
        static _pWebGLBuffer1: WebGLBuffer;
        static _pWebGLBuffer2: WebGLBuffer;
        static _pWebGLBuffer3: WebGLBuffer;
    }
}
module akra {
    interface IIndexData extends IBufferData, IBuffer {
        type: EDataTypes;
        length: number;
        bytesPerIndex: number;
        id: number;
        getData(iOffset: number, iSize: number): ArrayBuffer;
        getTypedData(iStart: number, iCount: number): ArrayBufferView;
        setData(pData: ArrayBufferView): bool;
        setData(pData: ArrayBufferView, iOffset: number): bool;
        setData(pData: ArrayBufferView, iOffset: number, iCount: number): bool;
        destroy(): void;
        getPrimitiveType(): EPrimitiveTypes;
        getPrimitiveCount(): number;
        getBufferHandle(): number;
    }
}
module akra.data {
    class IndexData implements IIndexData {
        private _pIndexBuffer;
        private _iOffset;
        private _iLength;
        private _ePrimitiveType;
        private _eElementsType;
        private _iId;
        /**@inline*/ 
        public id : number;
        /**@inline*/ 
        public type : number;
        /**@inline*/ 
        public length : number;
        /**@inline*/ 
        public bytesPerIndex : number;
        /**@inline*/ 
        public byteOffset : number;
        /**@inline*/ 
        public byteLength : number;
        /**@inline*/ 
        public buffer : IIndexBuffer;
        constructor(pIndexBuffer: IIndexBuffer, id: number, iOffset: number, iCount: number, ePrimitiveType?: EPrimitiveTypes, eElementsType?: EDataTypes);
        public getData(iOffset: number, iSize: number): ArrayBuffer;
        public getTypedData(iStart: number, iCount: number): ArrayBufferView;
        public setData(pData: ArrayBufferView, iOffset?: number, iCount?: number): bool;
        public destroy(): void;
        /**@inline*/ 
        public getPrimitiveType(): EPrimitiveTypes;
        /**@inline*/ 
        public getPrimitiveCount(iIndexCount?: number): number;
        /**@inline*/ 
        public getBufferHandle(): number;
        static getPrimitiveCount(eType: EPrimitiveTypes, nVertices: number): number;
    }
}
module akra.core.pool.resources {
    class IndexBuffer extends HardwareBuffer implements IIndexBuffer {
        /**@protected*/ 
        public _pIndexDataArray: IIndexData[];
        /**@protected*/ 
        public _iDataCounter: number;
        /**@inline*/ 
        public length : number;
        constructor();
        public create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        public destroy(): void;
        public getIndexData(iOffset: number, iCount: number, ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes): IIndexData;
        public getEmptyIndexData(iCount: number, ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes): IIndexData;
        public freeIndexData(): bool;
        public allocateData(ePrimitiveType: EPrimitiveTypes, eElementsType: EDataTypes, pData: ArrayBufferView): IIndexData;
    }
}
module akra.webgl {
    class WebGLIndexBuffer extends core.pool.resources.IndexBuffer implements IIndexBuffer {
        /**@protected*/ 
        public _iByteSize: number;
        /**@protected*/ 
        public _pWebGLBuffer: WebGLBuffer;
        private _pLockData;
        /**@inline*/ 
        public byteLength : number;
        constructor();
        public create(iByteSize: number, iFlags?: number, pData?: Uint8Array): bool;
        public create(iByteSize: number, iFlags?: number, pData?: ArrayBufferView): bool;
        public destroy(): void;
        public readData(ppDest: ArrayBufferView): bool;
        public readData(iOffset: number, iSize: number, ppDest: ArrayBufferView): bool;
        public writeData(pData: Uint8Array, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public writeData(pData: ArrayBufferView, iOffset?: number, iSize?: number, bDiscardWholeBuffer?: bool): bool;
        public resize(iSize: number): bool;
        /**@inline*/ 
        public getWebGLBuffer(): WebGLBuffer;
        /**@protected*/ 
        public lockImpl(iOffset: number, iSize: number, iLockFlags: number): any;
        /**@protected*/ 
        public unlockImpl(): void;
        /**@protected*/ 
        public copyBackupToRealImpl(pRealData: Uint8Array, pBackupData: Uint8Array, iLockFlags: number): void;
    }
}
module akra.webgl {
    class WebGLInternalRenderBuffer extends WebGLPixelBuffer {
        /**@protected*/ 
        public _pWebGLRenderbuffer: WebGLRenderbuffer;
        constructor();
        public create(iFlags: number): bool;
        public create(iWidth: number, iHeight: number, iDepth: number, eFormat: EPixelFormats, iFlags: number): bool;
        public create(iWebGLFormat: number, iWidth: number, iHeight: number, bCreateStorage: bool): bool;
        public destroy(): void;
        public _bindToFramebuffer(iAttachment: number, iZOffset: number): void;
    }
}
module akra.core.pool.resources {
    class DepthBuffer extends ResourcePoolItem implements IDepthBuffer {
        /**@protected*/ 
        public _iBitDepth: number;
        /**@protected*/ 
        public _iWidth: number;
        /**@protected*/ 
        public _iHeight: number;
        /**@protected*/ 
        public _isManual: bool;
        /**@protected*/ 
        public _pAttachedRenderTargetsList: IRenderTarget[];
        constructor();
        /**@inline*/ 
        public bitDepth : number;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        public create(iBitDepth: number, iWidth: number, iHeight: number, isManual: bool): bool;
        public destroy(): void;
        public destroyResource(): bool;
        public isManual(): bool;
        public isCompatible(pTarget: IRenderTarget): bool;
        public _notifyRenderTargetAttached(pTarget: IRenderTarget): void;
        public _notifyRenderTargetDetached(pTarget: IRenderTarget): void;
        /**@protected*/ 
        public detachFromAllRenderTargets(): void;
    }
}
module akra.render {
    class RenderTexture extends RenderTarget implements IRenderTexture {
        /**@protected*/ 
        public _pBuffer: IPixelBuffer;
        /**@protected*/ 
        public _iZOffset: number;
        constructor(pRenderer: IRenderer, pBuffer: IPixelBuffer, iZOffset: number);
        public destroy(): void;
        /**@inline*/ 
        public suggestPixelFormat(): EPixelFormats;
        public copyContentsToMemory(pDest: IPixelBox, eBuffer: EFramebuffer): void;
    }
}
module akra.webgl {
    class WebGLRenderTexture extends render.RenderTexture {
        /**@protected*/ 
        public _pFrameBuffer: WebGLInternalFrameBuffer;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        constructor(pRenderer: IRenderer, pTarget: IPixelBuffer);
        public destroy(): void;
        public requiresTextureFlipping(): bool;
        public getCustomAttribute(sName: string): any;
        public swapBuffers(): void;
        public attachDepthBuffer(pDepthBuffer: IDepthBuffer): bool;
        public attachDepthPixelBuffer(pBuffer: IPixelBuffer): bool;
        public attachDepthTexture(pTexture: ITexture): bool;
        public detachDepthPixelBuffer(): void;
        public detachDepthBuffer(): void;
        public detachDepthTexture(): void;
    }
}
module akra.webgl {
    interface IWebGLAttachments {
        [webGLAttachment: number]: WebGLPixelBuffer;
    }
    class WebGLInternalFrameBuffer {
        private _pWebGLRenderer;
        private _pWebGLFramebuffer;
        private _pAttachments;
        private _iWebglActiveAttachment;
        constructor(pWebGLRenderer: IRenderer);
        public destroy(): void;
        /**@inline*/ 
        public width : number;
        /**@inline*/ 
        public height : number;
        /**@inline*/ 
        public format : number;
        /**@inline*/ 
        public getColorAttachment(iAttachment: number): WebGLPixelBuffer;
        /**@inline*/ 
        public getAttachment(iWebGLAttachment: number): WebGLPixelBuffer;
        public bindSurface(iWebGLAttachment: number, pSurface: IPixelBuffer): void;
        public unbindSurface(iWebGLAttachment: number): void;
        /**@inline*/ 
        public bindColorSurface(iAttachment: number, pSurface: IPixelBuffer): void;
        /**@inline*/ 
        public _bind(): void;
        public attachDepthBuffer(pDepthBuffer: IDepthBuffer): void;
        public attachDepthTexture(pDepthTexture: ITexture): void;
        public detachDepthTexture(): void;
        public detachDepthBuffer(): void;
        public swapBuffers(): void;
        private checkAttachment(iWebGLAttachment);
        /**@inline*/ 
        private releaseAttachment(iWebGLAttachment);
    }
}
module akra.webgl {
    class WebGLDepthBuffer extends core.pool.resources.DepthBuffer {
        /**@protected*/ 
        public _pDepthBuffer: WebGLInternalRenderBuffer;
        /**@protected*/ 
        public _pStencilBuffer: WebGLInternalRenderBuffer;
        constructor();
        /**@inline*/ 
        public depthBuffer : WebGLInternalRenderBuffer;
        /**@inline*/ 
        public stencilBuffer : WebGLInternalRenderBuffer;
        public create(iBitDepth: number, iWidth: number, iHeight: number, bManual: bool): bool;
        public create(pDepth: WebGLInternalRenderBuffer, pStencil: WebGLInternalRenderBuffer, iWidth: number, iHeight: number, isManual: bool): bool;
        public destroy(): void;
        public isCompatible(pTarget: IRenderTarget): bool;
    }
}
module akra.core.pool {
    class ResourcePoolManager implements IResourcePoolManager {
        private pSurfaceMaterialPool;
        private pEffectPool;
        private pRenderMethodPool;
        private pVertexBufferPool;
        private pIndexBufferPool;
        private pColladaPool;
        private pImagePool;
        private pTexturePool;
        private pVideoBufferPool;
        private pShaderProgramPool;
        private pComponentPool;
        private pTextureBufferPool;
        private pRenderBufferPool;
        private pDepthBufferPool;
        private pEffectDataPool;
        /** Списки пулов по семействам ресурсов */
        private pResourceFamilyList;
        /** Карта пулов по коду ресурса */
        private pResourceTypeMap;
        /** Ресурс для ожидания остальных */
        private pWaiterResource;
        private pEngine;
        public surfaceMaterialPool : IResourcePool;
        public effectPool : IResourcePool;
        public renderMethodPool : IResourcePool;
        public vertexBufferPool : IResourcePool;
        public indexBufferPool : IResourcePool;
        public colladaPool : IResourcePool;
        public imagePool : IResourcePool;
        public texturePool : IResourcePool;
        public videoBufferPool : IResourcePool;
        public shaderProgramPool : IResourcePool;
        public componentPool : IResourcePool;
        public textureBufferPool : IResourcePool;
        public renderBufferPool : IResourcePool;
        public depthBufferPool : IResourcePool;
        public effectDataPool : IResourcePool;
        constructor(pEngine: IEngine);
        public initialize(): bool;
        public destroy(): void;
        public registerResourcePool(pCode: IResourceCode, pPool: IResourcePool): void;
        public unregisterResourcePool(pCode: IResourceCode): IResourcePool;
        public destroyResourceFamily(eFamily: EResourceFamilies): void;
        public restoreResourceFamily(eFamily: EResourceFamilies): void;
        public disableResourceFamily(eFamily: EResourceFamilies): void;
        public cleanResourceFamily(eFamily: EResourceFamilies): void;
        public destroyResourceType(pCode: IResourceCode): void;
        public restoreResourceType(pCode: IResourceCode): void;
        public disableResourceType(pCode: IResourceCode): void;
        public cleanResourceType(pCode: IResourceCode): void;
        public findResourcePool(pCode: IResourceCode): IResourcePool;
        public findResourceHandle(pCode: IResourceCode, sName: string): number;
        public findResource(pCode: IResourceCode, sName: string): IResourcePoolItem;
        public findResource(pCode: IResourceCode, iHandle: number): IResourcePoolItem;
        public monitorInitResources(fnMonitor: IResourceWatcherFunc): void;
        public setLoadedAllRoutine(fnCallback: Function): void;
        public destroyAll(): void;
        public restoreAll(): void;
        public disableAll(): void;
        public clean(): void;
        public createDeviceResources(): bool;
        public destroyDeviceResources(): bool;
        public restoreDeviceResources(): bool;
        public disableDeviceResources(): bool;
        /**@inline*/ 
        public getEngine(): Engine;
        /**@inline*/ 
        public createRenderMethod(sResourceName: string): IRenderMethod;
        /**@inline*/ 
        public createTexture(sResourceName: string): ITexture;
        /**@inline*/ 
        public createEffect(sResourceName: string): IEffect;
        /**@inline*/ 
        public createSurfaceMaterial(sResourceName: string): ISurfaceMaterial;
        /**@inline*/ 
        public createVertexBuffer(sResourceName: string): IVertexBuffer;
        /**@inline*/ 
        public createVideoBuffer(sResourceName: string): IVertexBuffer;
        /**@inline*/ 
        public createIndexBuffer(sResourceName: string): IIndexBuffer;
        /**@inline*/ 
        public createShaderProgram(sResourceName: string): IShaderProgram;
        /**@inline*/ 
        public createModel(sResourceName: string): IModel;
        /**@inline*/ 
        public createImg(sResourceName: string): IImg;
        /**@inline*/ 
        public loadModel(sFilename: string, pOptions?: any): IModel;
        public loadImage(sFilename: string): IImg;
        private createDeviceResource();
        private registerDeviceResources();
        private unregisterDeviceResources();
        private static pTypedResourseTotal;
    }
}
module akra {
    interface IScene2d extends IScene {
    }
}
module akra {
    interface IModel {
    }
    interface IAnimationController {
    }
    interface IModelEntry extends ISceneNode {
        resource: IModel;
        controller: IAnimationController;
    }
}
module akra.scene.objects {
    class ModelEntry extends SceneNode implements IModelEntry {
        /**@protected*/ 
        public _pModelResource: IModel;
        /**@protected*/ 
        public _pController: IAnimationController;
        /**@inline*/ 
        public resource : IModel;
        /**@inline*/ /**@inline*/ 
        public controller : IAnimationController;
        constructor(pScene: IScene3d, pModel: IModel);
    }
    function isModelEntry(pEntity: IEntity): bool;
}
module akra {
    interface IObjectArray {
    }
    interface IDisplayList extends IEventProvider {
        name: string;
        _findObjects(pCamera: ICamera, pResultArray?: IObjectArray, bQuickSearch?: bool): IObjectArray;
        _setup(pScene: IScene3d): void;
    }
}
module akra {
    interface IRect3d {
    }
    interface IOcTreeNode {
    }
    interface ISceneObject {
    }
    interface IOcTreeRect {
    }
    interface IVec3 {
    }
    interface IOcTree extends IDisplayList {
        depth: number;
        worldScale: IVec3;
        worldOffset: IVec3;
        create(pWorldBoundingBox: IRect3d, iDepth: number, nNode?: number): void;
        isReady(): bool;
        findTreeNode(pObject: ISceneObject): IOcTreeNode;
        findTreeNodeByRect(iX0: number, iX1: number, iY0: number, iY1: number, iZ0: number, iZ1: number): IOcTreeNode;
        getAndSetFreeNode(iLevel: number, iComposedIndex: number, pParentNode: IOcTreeNode): IOcTreeNode;
        deleteNodeFromTree(pNode: IOcTreeNode): void;
        _toSimpleObject(pNode?: IOcTreeNode): any;
    }
}
module akra.scene {
    class DisplayList implements IDisplayList {
        /**@protected*/ 
        public _pScene: IScene3d;
        /**@protected*/ 
        public _sName: string;
        /**@inline*/ /**@inline*/ 
        public name : string;
        public _onNodeAttachment(pScene: IScene3d, pNode: ISceneNode): void;
        public _onNodeDetachment(pScene: IScene3d, pNode: ISceneNode): void;
        /**@protected*/ 
        public attachObject(pNode: ISceneNode): void;
        /**@protected*/ 
        public detachObject(pNode: ISceneNode): void;
        public _setup(pScene: IScene3d): void;
        public _findObjects(pCamera: ICamera, pResultArray?: IObjectArray, bQuickSearch?: bool): IObjectArray;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
    }
}
module akra {
    interface IOcTree {
    }
    interface ISceneObject {
    }
    interface IRect3d {
    }
    interface IObjectList {
    }
    interface IOcTreeNode {
        /** Parent tree */
        tree: IOcTree;
        /** Level of node */
        level: number;
        /** Index in array of nodes in tree */
        index: number;
        /** First SceneObject in this node */
        membersList: IObjectList;
        /** Rect of node in real world */
        worldBounds: IRect3d;
        /** Link ro previous node in tree */
        rearNodeLink: IOcTreeNode;
        childrenList: IObjectList[];
        addMember(pMember: ISceneObject): void;
        removeMember(pMember: ISceneObject): void;
    }
}
module akra {
    interface IListExplorerFunc {
        (data: any, index?: number): bool;
    }
    /** ObjectList interface. */
    interface IObjectList {
        /** Number of elements in list */
        length: number;
        /** First element in list */
        first: any;
        /** Last element in list */
        last: any;
        /** Current element in list */
        current: any;
        /** Lock list for midifications. */
        lock(): void;
        /** Unlock list */
        unlock(): void;
        /** Is list locked ? */
        isLocked(): bool;
        /** Set current element to <n> position. */
        seek(n?: number): IObjectList;
        /** Get next element */
        next(): any;
        /** Get prev element */
        prev(): any;
        /** Push element to end of list. */
        push(element: any): IObjectList;
        /** Pop element from end of list. */
        pop(): any;
        /** Add element to list head. */
        prepend(element: any): IObjectList;
        /** Add element from array. */
        fromArray(elements: any[], iOffset?: number, iSize?: number): IObjectList;
        /** Insert element before <n> element. */
        insert(n: number, data: any): IObjectList;
        /** Get valuie of <n> element */
        value(n: number, defaultValue?: any): any;
        /** Get index of element with given data */
        indexOf(element: any, from?: number): number;
        /** Get sub list from this list */
        mid(pos?: number, size?: number): IObjectList;
        /** slice from array */
        slice(start?: number, end?: number): IObjectList;
        /** Move element from <from> postion to <to> position.*/
        move(from: number, to: number): IObjectList;
        /** Replace data of <n> element. */
        replace(pos: number, value: any): IObjectList;
        /** Erase element with number <n>. */
        erase(pos: number): IObjectList;
        /** Erase elements from begin to end. */
        erase(begin: number, end: number): IObjectList;
        /** Is list contains data with <value>?*/
        contains(value: any): bool;
        /** Get data of <n> item and remove it. */
        takeAt(pos: number): any;
        /** Get data of first item and remove it. */
        takeFirst(): any;
        /** Get data of last item and remove it. */
        takeLast(): any;
        /** Get data of current item and remove it. */
        takeCurrent(): any;
        /** Remove <n> item. */
        removeAt(n: number): void;
        /** Remove one lement with data <element>. */
        removeOne(element: any): void;
        /** Remove all lement with data <element>. */
        removeAll(element: any): number;
        /** Swap items. */
        swap(i: number, j: number): IObjectList;
        /** Add another list to this */
        add(list: IObjectList): IObjectList;
        /** Is this list equal to <list>. */
        isEqual(list: IObjectList): bool;
        /** Clear list. */
        clear(): IObjectList;
        /** For each loop. */
        forEach(fn: IListExplorerFunc): void;
    }
}
module akra.util {
    interface IObjectListItem {
        next: IObjectListItem;
        prev: IObjectListItem;
        data: any;
    }
    class ObjectList implements IObjectList {
        /**@protected*/ 
        public _pHead: IObjectListItem;
        /**@protected*/ 
        public _pTail: IObjectListItem;
        /**@protected*/ 
        public _pCurrent: IObjectListItem;
        /**@protected*/ 
        public _iLength: number;
        /**@protected*/ 
        public _bLock: bool;
        /**@inline*/ 
        public length : number;
        /**@inline*/ 
        public first : any;
        /**@inline*/ 
        public last : any;
        /**@inline*/ 
        public current : any;
        /**@inline*/ 
        public lock(): void;
        /**@inline*/ 
        public unlock(): void;
        /**@inline*/ 
        public isLocked(): bool;
        /**@inline*/ 
        public value(n: number): any;
        constructor(pData?: any[]);
        public indexOf(pData: any, iFrom?: number): number;
        public mid(iPos?: number, iSize?: number): IObjectList;
        /**@inline*/ 
        public slice(iStart?: number, iEnd?: number): IObjectList;
        /**@inline*/ 
        public move(iFrom: number, iTo: number): IObjectList;
        /**@inline*/ 
        public replace(iPos: number, pData: any): IObjectList;
        public erase(pos: number): IObjectList;
        public erase(begin: number, end: number): IObjectList;
        /**@inline*/ 
        public contains(pData: any): bool;
        /**@inline*/ 
        public removeAt(n: number): void;
        /**@inline*/ 
        public removeOne(pData: any): void;
        /**@inline*/ 
        public removeAll(pData: any): number;
        public swap(i: number, j: number): IObjectList;
        public add(pList: IObjectList): IObjectList;
        public seek(n?: number): IObjectList;
        /**@inline*/ 
        public next(): any;
        /**@inline*/ 
        public prev(): any;
        /**@inline*/ 
        public push(pElement: any): IObjectList;
        /**@inline*/ 
        public takeAt(n: number): any;
        private pullElement(pItem);
        /**@inline*/ 
        public takeFirst(): any;
        /**@inline*/ 
        public takeLast(): any;
        /**@inline*/ 
        public takeCurrent(isPrev?: bool): any;
        /**@inline*/ 
        public pop(): any;
        /**@inline*/ 
        public prepend(pElement: any): IObjectList;
        /**@inline*/ 
        private find(n);
        /**@inline*/ 
        private releaseItem(pItem);
        /**@inline*/ 
        private createItem();
        public fromArray(elements: any[], iOffset?: number, iSize?: number): IObjectList;
        public insert(n: number, pData: any): IObjectList;
        public isEqual(pList: IObjectList): bool;
        public clear(): IObjectList;
        public forEach(fn: IListExplorerFunc): void;
        private static listItemPool;
    }
}
module akra {
    var ObjectList: {
        listItemPool: IObjectArray;
        new(pData?: any[]): util.ObjectList;
    };
}
module akra.scene {
    /** OcTreeNode class represent node of OcTree */
    class OcTreeNode implements IOcTreeNode {
        /** Parent tree */
        public tree: IOcTree;
        /** Level of node */
        public level: number;
        /** Index in array of nodes in tree */
        public index: number;
        /** First SceneObject in this node */
        public membersList: IObjectList;
        /** Rect of node in real world */
        public worldBounds: IRect3d;
        /** Link to previous node in tree */
        public rearNodeLink: IOcTreeNode;
        public childrenList: IObjectList[];
        constructor(pTree: IOcTree);
        /**
        * Add object in this node
        */
        public addMember(pObject: ISceneObject): void;
        /**
        * Remove member object from node and release node if there are not members in it
        */
        public removeMember(pObject: ISceneObject): void;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public OcTreeObjectMoved(pObject: ISceneObject): void;
    }
    class OcTreeRootNode extends OcTreeNode implements IOcTreeNode {
        /**@protected*/ 
        public _pBasicWorldBounds: IRect3d;
        constructor(pTree: IOcTree);
        public addMember(pMember: ISceneObject): void;
        public removeMember(pObject: ISceneObject): void;
        /**@protected*/ 
        public _updateNodeBoundingBox(): void;
    }
}
module akra {
    interface IVec2 {
    }
    interface IRay2d {
        point: IVec2;
        normal: IVec2;
    }
}
module akra.geometry {
    class Ray2d implements IRay2d {
        public point: IVec2;
        public normal: IVec2;
        constructor();
    }
}
module akra {
    interface IVec3 {
    }
    interface IRay3d {
        point: IVec3;
        normal: IVec3;
    }
}
module akra.geometry {
    class Ray3d implements IRay3d {
        public point: IVec3;
        public normal: IVec3;
        constructor();
    }
}
module akra.geometry {
    function intersectPlane2dRay2d(pPlane: IPlane2d, pRay: IRay2d): bool;
    function intersectPlane3dRay3d(pPlane: IPlane3d, pRay: IRay3d): bool;
    function intersectCircleRay2d(pCircle: ICircle, pRay: IRay2d): bool;
    function intersectSphereRay3d(pSphere: ISphere, pRay: IRay3d): bool;
    function intersectRect2dRay2d(pRect: IRect2d, pRay: IRay2d): bool;
    function intersectRect3dRay3d(pRect: IRect3d, pRay: IRay3d): bool;
    function intersectCircleCircle(pCircle1: ICircle, pCircle2: ICircle): bool;
    function intersectSphereSphere(pSphere1: ISphere, pSphere2: ISphere): bool;
    function intersectRect2dCircle(pRect: IRect2d, pCircle: ICircle): bool;
    function intersectRect3dSphere(pRect: IRect3d, pSphere: ISphere): bool;
    function intersectRect2dRect2d(pRect1: IRect2d, pRect2: IRect2d, pResult?: IRect2d): bool;
    function intersectRect3dRect3d(pRect1: IRect3d, pRect2: IRect3d, pResult?: IRect3d): bool;
    function intersect(pPlane: IPlane2d, pRay: IRay2d): bool;
    function intersect(pPlane: IPlane3d, pRay: IRay3d): bool;
    function intersect(pCircle: ICircle, pRay: IRay2d): bool;
    function intersect(pSphere: ISphere, pRay: IRay3d): bool;
    function intersect(pRect: IRect2d, pRay: IRay2d): bool;
    function intersect(pRect: IRect3d, pRay: IRay3d): bool;
    function intersect(pCircle1: ICircle, pCircle2: ICircle): bool;
    function intersect(pSphere1: ISphere, pSphere2: ISphere): bool;
    function intersect(pRect: IRect2d, pCircle: ICircle): bool;
    function intersect(pRect: IRect3d, pSphere: ISphere): bool;
    function intersect(pRect1: IRect2d, pRect2: IRect2d, pResult?: IRect2d): bool;
    function intersect(pRect1: IRect3d, pRect2: IRect3d, pResult?: IRect3d): bool;
}
module akra.scene {
    enum EOcTreeConstants {
        k_MinimumTreeDepth,
        k_MaximumTreeDepth,
    }
    class OcTree extends DisplayList implements IOcTree {
        /**@protected*/ 
        public _pHead: IOcTreeNode;
        /**@protected*/ 
        public _v3fWorldExtents: IVec3;
        /**@protected*/ 
        public _v3fWorldScale: IVec3;
        /**@protected*/ 
        public _v3fWorldOffset: IVec3;
        /**@protected*/ 
        public _iDepth: number;
        /**@protected*/ 
        public _pFreeNodePool: IOcTreeNode[];
        constructor();
        /**@inline*/ 
        public depth : number;
        /**@inline*/ 
        public worldScale : IVec3;
        /**@inline*/ 
        public worldOffset : IVec3;
        /**
        * Create
        */
        public create(pWorldBoundingBox: IRect3d, iDepth: number, nNodes?: number): void;
        /**
        * is any levels of tree are availeable(some object in a tree)
        */
        public isReady(): bool;
        /**
        * find node
        */
        public findTreeNode(pObject: ISceneObject): IOcTreeNode;
        /**
        * Find tree node by Rect
        */
        public findTreeNodeByRect(iX0: number, iX1: number, iY0: number, iY1: number, iZ0: number, iZ1: number): IOcTreeNode;
        private _findNodeLevel(iX0, iX1, iY0, iY1, iZ0, iZ1);
        /**
        * Get free node.
        * Get it from _pFreeNodePull or create new OcTreeNode if it`s empty and set his data.
        */
        public getAndSetFreeNode(iLevel: number, iComposedIndex: number, pParentNode: IOcTreeNode): IOcTreeNode;
        /**
        * Delete node from tree
        */
        public deleteNodeFromTree(pNode: IOcTreeNode): void;
        public _findObjects(pCamera: ICamera, pResultArray?: IObjectArray, bFastSearch?: bool): IObjectArray;
        /**@protected*/ 
        public _buildSearchResultsByRect(pSearchRect: IRect3d, pNode: IOcTreeNode, pResultList: IObjectArray): void;
        /**@protected*/ 
        public _buildSearchResultsByRectAndFrustum(pSearchRect: IRect3d, pFrustum: IFrustum, pNode: IOcTreeNode, pResultList: IObjectArray): void;
        /**@protected*/ 
        public _includeAllTreeSubbranch(pNode: IOcTreeNode, pResultList: IObjectArray): void;
        /**@protected*/ 
        public attachObject(pNode: ISceneNode): void;
        /**@protected*/ 
        public detachObject(pNode: ISceneNode): void;
        public _toSimpleObject(pNode?: IOcTreeNode): any;
    }
}
module akra {
    interface IDisplayList {
    }
    interface ICamera {
    }
    interface IObjectArray {
    }
    interface ILightGraph extends IDisplayList {
    }
}
module akra.scene.light {
    class LightParameters implements ILightParameters {
        public ambient: IColor;
        public diffuse: IColor;
        public specular: IColor;
        public attenuation: IVec3;
    }
    class LightPoint extends SceneNode implements ILightPoint {
        /**@protected*/ 
        public _isShadowCaster: bool;
        /**@protected*/ 
        public _isEnabled: bool;
        /**@protected*/ 
        public _iMaxShadowResolution: number;
        /**@protected*/ 
        public _pLightParameters: ILightParameters;
        /**@protected*/ 
        public _eLightType: ELightTypes;
        /**@inline*/ 
        public lightType : ELightTypes;
        constructor(pScene: IScene3d, eType?: ELightTypes);
        /**@inline*/ /**@inline*/ 
        public enabled : bool;
        /**@inline*/ 
        public params : ILightParameters;
        /**@inline*/ /**@inline*/ 
        public isShadowCaster : bool;
        public create(isShadowCaster?: bool, iMaxShadowResolution?: number): bool;
        public _prepareForLighting(pCamera: ICamera): bool;
        public _calculateShadows(): void;
    }
    function isLightPoint(pNode: IEntity): bool;
}
module akra.scene {
    class LightGraph extends DisplayList implements ILightGraph {
        /**@protected*/ 
        public _pLightPoints: IObjectList;
        constructor();
        public _findObjects(pCamera: ICamera, pResultArray?: IObjectArray, bFastSearch?: bool): IObjectArray;
        /**@protected*/ 
        public attachObject(pNode: ISceneNode): void;
        /**@protected*/ 
        public detachObject(pNode: ISceneNode): void;
    }
}
module akra {
    interface IMesh {
    }
    interface ISceneModel extends ISceneObject {
        mesh: IMesh;
    }
}
module akra {
    interface IRect3d {
    }
    interface IMesh {
    }
    interface ISkin {
    }
    interface IRenderData {
    }
    interface IMeshSubset extends IEventProvider, IRenderableObject {
        name: string;
        mesh: IMesh;
        skin: ISkin;
        data: IRenderData;
        boundingBox: IRect3d;
        boundingSphere: ISphere;
        createBoundingBox(): bool;
        deleteBoundingBox(): bool;
        showBoundingBox(): bool;
        hideBoundingBox(): bool;
        createBoundingSphere(): bool;
        deleteBoundingSphere(): bool;
        showBoundingSphere(): bool;
        hideBoundingSphere(): bool;
        computeNormals(): void;
        computeTangents(): void;
        computeBinormals(): void;
        isSkinned(): bool;
        getSkin(): ISkin;
        setSkin(pSkin: ISkin): bool;
        /** @deprecated */
        applyFlexMaterial(csMaterial: string, pMaterial?: IMaterial): bool;
        /** @deprecated */
        getFlexMaterial(iMaterial: number): IMaterial;
        /** @deprecated */
        getFlexMaterial(csName: string): IMaterial;
        /** @deprecated */
        setFlexMaterial(iMaterial: number): bool;
        /** @deprecated */
        setFlexMaterial(csName: string): bool;
        show(): void;
        hide(): void;
        destroy(): void;
        update(): bool;
    }
}
module akra {
    interface ISkeleton {
    }
    interface INode {
    }
    interface IMesh {
    }
    interface IEngine {
    }
    interface INodeMap {
    }
    interface IMat4 {
    }
    interface IVertexData {
    }
    interface ISkin {
        data: IRenderDataCollection;
        skeleton: ISkeleton;
        totalBones: number;
        /**
        * Set binding matrix.
        * @see <bind_shape_matrix> in Collada.
        */
        setBindMatrix(m4fMatrix: IMat4): void;
        /**
        * @see <bind_shape_matrix> in Collada.
        */
        getBindMatrix(): IMat4;
        /**
        * Bone offset matrices.
        * @see Bone offset matrices in Collada.
        */
        getBoneOffsetMatrices(): IMat4[];
        getBoneOffsetMatrix(sBoneName: string): IMat4;
        setBoneOffsetMatrices(pMatrices: IMat4[]): void;
        setSkeleton(pSkeleton: ISkeleton): bool;
        /**
        * Make a skin dependent on scene node whose names match the
        * names of the bones that affect the skin.
        */
        attachToScene(pRootNode: ISceneNode): bool;
        /**
        * Set names of bones, that affect to skin.
        */
        setBoneNames(pNames: string[]): bool;
        /**
        * Weights.
        */
        setWeights(pWeights: Float32Array): bool;
        /**
        * разметка влияний на вершины
        * пары: {число влияний, адресс индексов влияний}
        */
        getInfluenceMetaData(): IVertexData;
        /**
        * инф. о вляиниях на вершины
        * пары: {индекс матрицы кости, индекс веса}
        */
        getInfluences(): IVertexData;
        setInfluences(pInfluencesCount: number[], pInfluences: Float32Array): bool;
        /**
        * Short way to call setWeights() && setIfluences();
        */
        setVertexWeights(pInfluencesCount: number[], pInfluences: Float32Array, pWeights: Float32Array): bool;
        /**
        * Recalculate skin matrices and fill it to video memory.
        */
        applyBoneMatrices(bForce?: bool): bool;
        /**
        * Is skin ready to use?
        */
        isReady(): bool;
        /**
        * Data with result matrices.
        */
        getBoneTransforms(): IVertexData;
        /**
        * Check, is this skin affect to data?
        */
        isAffect(pData: IVertexData): bool;
        /**
        * Add skin info to data with vertices.
        */
        attach(pData: IVertexData): void;
    }
}
module akra.model {
    class Skin implements ISkin {
        private _pMesh;
        private _pSkeleton;
        private _pNodeNames;
        private _m4fBindMatrix;
        private _pBoneTransformMatrices;
        /**
        * Common buffer for all transform matrices.
        * _pBoneOffsetMatrixBuffer = [_pBoneTransformMatrices[0], ..., _pBoneTransformMatrices[N]]
        */
        private _pBoneOffsetMatrixBuffer;
        private _pBoneOffsetMatrices;
        /**
        * Pointers to nodes, that affect to this skin.
        */
        private _pAffectingNodes;
        /**
        * Format:
        * BONE_INF_COUNT - number of bones, that influence to the vertex.
        * BONE_INF_LOC - address of influence, pointer to InfData structire list.
        * ..., [BONE_INF_COUNT: float, BONE_INF_LOC: float], ...
        *
        */
        private _pInfMetaData;
        /**
        * Format:
        * BONE_INF_DATA - bone matrix address, pointer to BONE_MATRIX list
        * BONE_WEIGHT - bone weight
        * ..., [BONE_INF_DATA: float, BONE_WEIGHT: float], ...
        */
        private _pInfData;
        /**
        * Format:
        * ..., [BONE_MATRIX: matrix4], ...
        */
        private _pBoneTransformMatrixData;
        private _pWeights;
        /**
        * Links to VertexData, that contain meta from this skin.
        */
        private _pTiedData;
        /**@inline*/ 
        public data : IRenderDataCollection;
        /**@inline*/ /**@inline*/ 
        public skeleton : ISkeleton;
        /**@inline*/ 
        public totalBones : number;
        constructor(pMesh: IMesh);
        public setBindMatrix(m4fMatrix: IMat4): void;
        public getBindMatrix(): IMat4;
        public getBoneOffsetMatrices(): IMat4[];
        public getBoneOffsetMatrix(sBoneName: string): IMat4;
        public setSkeleton(pSkeleton: ISkeleton): bool;
        public attachToScene(pRootNode: ISceneNode): bool;
        public setBoneNames(pNames: string[]): bool;
        public setBoneOffsetMatrices(pMatrices: IMat4[]): void;
        public setWeights(pWeights: Float32Array): bool;
        public getInfluenceMetaData(): IVertexData;
        public getInfluences(): IVertexData;
        public setInfluences(pInfluencesCount: number[], pInfluences: Float32Array): bool;
        public setVertexWeights(pInfluencesCount: number[], pInfluences: Float32Array, pWeights: Float32Array): bool;
        public applyBoneMatrices(bForce?: bool): bool;
        public isReady(): bool;
        public getBoneTransforms(): IVertexData;
        public isAffect(pData: IVertexData): bool;
        public attach(pData: IVertexData): void;
    }
    function createSkin(pMesh: IMesh): ISkin;
}
module akra {
    interface IRay2d {
    }
    interface ISegment2d {
        ray: IRay2d;
        distance: number;
        point: IVec2;
        normal: IVec2;
    }
}
module akra.geometry {
    class Segment2d implements ISegment2d {
        public ray: IRay2d;
        public distance: number;
        constructor();
        public point : IVec2;
        public normal : IVec2;
    }
}
module akra {
    interface IRay3d {
    }
    interface ISegment3d {
        ray: IRay3d;
        distance: number;
        point: IVec3;
        normal: IVec3;
    }
}
module akra.geometry {
    class Segment3d implements ISegment3d {
        public ray: IRay3d;
        public distance: number;
        constructor();
        public point : IVec3;
        public normal : IVec3;
    }
}
module akra.geometry {
    function computeBoundingBox(pVertexData: IVertexData, pBoundingBox: IRect3d): bool;
    function computeDataForCascadeBoundingBox(pBoundingBox: IRect3d, ppVertexes: number[], ppIndexes: number[], fMinSize?: number): bool;
    function computeBoundingSphere(pVertexData: IVertexData, pSphere: ISphere, bFastMethod?: bool, pBoundingBox?: IRect3d): bool;
    function computeBoundingSphereFast(pVertexData: IVertexData, pSphere: ISphere, pBoundingBox?: IRect3d): bool;
    function computeBoundingSphereMinimal(pVertexData: IVertexData, pSphere: ISphere): bool;
    function computeGeneralizingSphere(pSphereA: ISphere, pSphereB: ISphere, pSphereDest?: ISphere): bool;
    function computeDataForCascadeBoundingSphere(pBoundingSphere: ISphere, ppVertexes: number[], ppIndexes: number[], fMinSize?: number): bool;
}
module akra.model {
    class MeshSubset extends render.RenderableObject implements IMeshSubset {
        /**@protected*/ 
        public _sName: string;
        /**@protected*/ 
        public _pMesh: IMesh;
        /**@protected*/ 
        public _pSkin: ISkin;
        /**@protected*/ 
        public _pBoundingBox: IRect3d;
        /**@protected*/ 
        public _pBoundingSphere: ISphere;
        /**@inline*/ 
        public boundingBox : IRect3d;
        /**@inline*/ 
        public boundingSphere : ISphere;
        /**@inline*/ 
        public skin : ISkin;
        /**@inline*/ 
        public name : string;
        /**@inline*/ 
        public mesh : IMesh;
        constructor(pMesh: IMesh, pRenderData: IRenderData, sName?: string);
        /**@protected*/ 
        public setup(pMesh: IMesh, pRenderData: IRenderData, sName: string): void;
        public createBoundingBox(): bool;
        public deleteBoundingBox(): bool;
        public showBoundingBox(): bool;
        public hideBoundingBox(): bool;
        public createBoundingSphere(): bool;
        public deleteBoundingSphere(): bool;
        public showBoundingSphere(): bool;
        public hideBoundingSphere(): bool;
        public computeNormals(): void;
        public computeTangents(): void;
        public computeBinormals(): void;
        public isSkinned(): bool;
        public getSkin(): ISkin;
        public applyFlexMaterial(sMaterial: string, pMaterialData?: IMaterial): bool;
        public getFlexMaterial(csName: string): IMaterial;
        public getFlexMaterial(iMaterial: number): IMaterial;
        public hasFlexMaterial(): bool;
        public setFlexMaterial(iMaterial: number): bool;
        public setFlexMaterial(csName: string): bool;
        public _draw(): void;
        public show(): void;
        public hide(): void;
        public setSkin(pSkin: ISkin): bool;
        public update(): bool;
    }
}
module akra.model {
    function createMesh(pEngine: IEngine, sName?: string, eOptions?: number, pDataBuffer?: IRenderDataCollection): IMesh;
}
module akra.scene {
    class SceneModel extends SceneObject implements ISceneModel {
        private _pMesh;
        constructor(pScene: IScene3d);
        /**@inline*/ /**@inline*/ 
        public mesh : IMesh;
        /**@inline*/ 
        public totalRenderable : number;
        /**@inline*/ 
        public getRenderable(i?: number): IRenderableObject;
        /**@inline*/ /**@inline*/ 
        public hasShadow : bool;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
    /**@inline*/ 
    function isModel(pEntity: IEntity): bool;
}
module akra {
    interface ITerrainSection {
    }
    interface ISceneObject {
    }
    interface IRect3d {
    }
    interface IViewport {
    }
    interface ISceneNode {
    }
    interface IImageMap {
        [index: string]: IImg;
    }
    interface ITerrainSampleData {
        iColor: number;
        fScale: number;
    }
    interface ITerrain extends ISceneNode {
        tessellationScale: number;
        tessellationLimit: number;
        worldExtents: IRect3d;
        worldSize: IVec3;
        mapScale: IVec3;
        sectorCountX: number;
        sectorCountY: number;
        sectorSize: IVec2;
        tableWidth: number;
        tableHeight: number;
        sectorShift: number;
        dataFactory: IRenderDataCollection;
        /**
        * Создаем terrain
        * @param {ISceneNode} pRootNode Узел на сцене к которому цепляется terrain.
        * @param {IImageMap} pMap набор карт для terrain.
        * @param {IRect3d} worldExtents Размеры terrain в мире.
        * @param {uint} iShift Количество векторов в секторе (указывается в степенях двойки).
        * @param {uint} iShiftX Количество секторов в terrain по оси X (указывается в степенях двойки).
        * @param {uint} iShiftY Количество секторов в terrain по оси Y (указывается в степенях двойки).
        * @param {string} sSurfaceTextures Название мега текстуры.
        */
        init(pMap: IImageMap, worldExtents: IRect3d, iShift: number, iShiftX: number, iShiftY: number, sSurfaceTextures: string, pRootNode?: ISceneNode): bool;
        /**
        * Ищет секцию по координате
        */
        findSection(iX: number, iY: number);
        /**
        * Возвращает высоту terrain в заданной точке.
        */
        readWorldHeight(iIndex: number): number;
        readWorldHeight(iMapX: number, iMapY: number): number;
        /**
        * Возвращает нормаль terrain в заданной точке.
        */
        readWorldNormal(v3fNormal: IVec3, iMapX: number, iMapY: number): IVec3;
        /**
        * Возвращает высоту terrain в заданной точке мира.
        */
        calcWorldHeight(fWorldX: number, fWorldY: number): number;
        /**
        * Возвращает нормаль terrain в заданной точке мира.
        */
        calcWorldNormal(v3fNormal: IVec3, fWorldX: number, fWorldY: number): IVec3;
        /**
        * Destructor
        */
        destroy(): void;
        /**
        * Сброс параметров.
        */
        reset(): void;
        /**
        * Обработка пользовательского ввода.
        */
        readUserInput(): void;
        _tableIndex(iMapX: number, iMapY: number): number;
    }
}
module akra.render {
    interface IIndexSet {
        sName: string;
        pMap: IBufferMap;
        pIndexData: IBufferData;
        pAttribData: IVertexData;
        pI2IDataCache: IntMap;
        pAdditionCache: IntMap;
    }
    class RenderData extends util.ReferenceCounter implements IRenderData {
        /**
        * Options.
        */
        private _eOptions;
        /**
        * Buffer, that create this class.
        */
        private _pBuffer;
        /**
        * ID of this data.
        */
        private _iId;
        /**
        * Buffer with indices.
        * If the data is the simplest mesh, with no more
        * than one index, the type will be IndexBuffer,
        * otherwise VertexBuffer.
        */
        private _pIndexBuffer;
        /**
        * Buffer with attributes.
        */
        private _pAttribBuffer;
        /**
        * Data with indices.
        * If _pIndexBuffer has type IndexBuffer, indices data
        * has type IndexData, otherwise VertexData.
        */
        private _pIndexData;
        /**
        * Data with attributes.
        */
        private _pAttribData;
        /**
        * Buffer map for current index set.
        */
        private _pMap;
        /**
        * Buffer maps of all index sets.
        */
        private _pIndicesArray;
        /**
        * Current index set.
        */
        private _iIndexSet;
        private _iRenderable;
        private _pComposer;
        /**@inline*/ 
        public buffer : IRenderDataCollection;
        /**@inline*/ 
        private indexSet;
        constructor(pCollection?: IRenderDataCollection);
        /**
        * Allocate data for rendering.
        */
        public allocateData(pDataDecl: IVertexElementInterface[], pData: ArrayBuffer, hasIndex?: bool): number;
        public allocateData(pDataDecl: IVertexElementInterface[], pData: ArrayBufferView, hasIndex?: bool): number;
        public allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBuffer, hasIndex?: bool): number;
        public allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBufferView, hasIndex?: bool): number;
        /**
        * Remove data from this render data.
        */
        public releaseData(iDataLocation: number): void;
        /**
        * Allocate attribute.
        * Attribute - data without index.
        */
        public allocateAttribute(pAttrDecl: IVertexDeclaration, pData: ArrayBuffer): bool;
        public allocateAttribute(pAttrDecl: IVertexDeclaration, pData: ArrayBufferView): bool;
        /**
        * Allocate index.
        */
        public allocateIndex(pAttrDecl: IVertexElementInterface[], pData: ArrayBuffer): bool;
        public allocateIndex(pAttrDecl: IVertexDeclaration, pData: ArrayBuffer): bool;
        public allocateIndex(pAttrDecl: IVertexElementInterface[], pData: ArrayBufferView): bool;
        public allocateIndex(pAttrDecl: IVertexDeclaration, pData: ArrayBufferView): bool;
        public getAdvancedIndexData(sSemantics: string): IVertexData;
        /**
        * Add new set of indices.
        */
        public addIndexSet(usePreviousDataSet?: bool, ePrimType?: EPrimitiveTypes, sName?: string): number;
        public getNumIndexSet(): number;
        public getIndexSetName(iSet?: number): string;
        /**
        * Select set of indices.
        */
        public selectIndexSet(iSet: number): bool;
        public selectIndexSet(sName: string): bool;
        /**
        * Get number of current index set.
        */
        public getIndexSet(): number;
        /**@inline*/ 
        public hasAttributes(): bool;
        /**
        * Specifies uses advanced index.
        */
        public useAdvancedIndex(): bool;
        public useSingleIndex(): bool;
        public useMultiIndex(): bool;
        public setRenderable(bValue: bool): void;
        public setRenderable(iIndexSet: number, bValue: bool): void;
        public isRenderable(iIndexSet?: number): bool;
        public isRenderable(): bool;
        /**
        * Check whether the semantics used in this data set.
        */
        public hasSemantics(sSemantics: string, bSearchComplete?: bool): bool;
        /**
        * Get data location.
        */
        public getDataLocation(sSemantics: string): number;
        public getDataLocation(iDataLocation: number): number;
        /**
        * Get indices that uses in current index set.
        */
        public getIndices(): IBufferData;
        /**
        * Get number of primitives for rendering.
        */
        public getPrimitiveCount(): number;
        /**
        * Setup index.
        */
        public index(sData: string, sSemantics: string, useSame?: bool, iBeginWith?: number): bool;
        public index(iData: number, sSemantics: string, useSame?: bool, iBeginWith?: number): bool;
        public _setup(pCollection: IRenderDataCollection, iId: number, ePrimType?: EPrimitiveTypes, eOptions?: number): bool;
        private _allocateData(pDataDecl, pData, eType);
        /**
        * Add vertex data to this render data.
        */
        public _addData(pVertexData: IVertexData, iFlow?: number, eType?: ERenderDataTypes): number;
        /**
        * Register data in this render.
        * Necessary for index to index mode, when data realy
        * not using in this render data for building final buffer map.
        */
        private _registerData(pVertexData);
        /**
        * Allocate advanced index.
        */
        private _allocateAdvancedIndex(pAttrDecl, pData);
        /**
        * Create IndexBuffer/IndexData for storage indices.
        */
        private _createIndex(pAttrDecl, pData);
        /**
        * Allocate index.
        */
        private _allocateIndex(pAttrDecl, pData);
        public _setIndexLength(iLength: number): bool;
        /**
        * Get data flow by semantics or data location.
        */
        public _getFlow(iDataLocation: number): IDataFlow;
        public _getFlow(sSemantics: string, bSearchComplete?: bool): IDataFlow;
        /**
        * Get data by semantics or location.
        */
        public _getData(iDataLocation: number, bSearchOnlyInCurrentMap?: bool): IVertexData;
        public _getData(sSemanticsn: string, bSearchOnlyInCurrentMap?: bool): IVertexData;
        /**
        * Draw this data.
        */
        public _draw(pTechnique: IRenderTechnique, pViewport: IViewport, pRenderable: IRenderableObject, pSceneObject: ISceneObject): void;
        public toString(): string;
    }
}
module akra.render {
    class RenderDataCollection extends util.ReferenceCounter implements IRenderDataCollection {
        private _pDataBuffer;
        private _pEngine;
        private _eDataOptions;
        private _pDataArray;
        /**@inline*/ 
        public buffer : IVertexBuffer;
        /**@inline*/ 
        public length : number;
        /**@inline*/ 
        public byteLength : number;
        constructor(pEngine: IEngine, eOptions?: ERenderDataBufferOptions);
        public clone(pSrc: IRenderDataCollection): bool;
        public getEngine(): IEngine;
        public getOptions(): ERenderDataBufferOptions;
        /**
        * Find VertexData with given semantics/usage.
        */
        public getData(sUsage: string): IVertexData;
        public getData(iOffset: number): IVertexData;
        /**
        * Положить данные в буфер.
        */
        public _allocateData(pVertexDecl: IVertexDeclaration, iSize: number): IVertexData;
        public _allocateData(pVertexDecl: IVertexDeclaration, pData: ArrayBufferView): IVertexData;
        public _allocateData(pVertexDecl: IVertexDeclaration, pData: ArrayBuffer): IVertexData;
        public _allocateData(pDeclData: IVertexElementInterface[], iSize: number): IVertexData;
        public _allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBufferView): IVertexData;
        public _allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBuffer): IVertexData;
        public allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBufferView, isCommon?: bool): number;
        public allocateData(pDataDecl: IVertexDeclaration, pData: ArrayBuffer, isCommon?: bool): number;
        public allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBufferView, isCommon?: bool): number;
        public allocateData(pDeclData: IVertexElementInterface[], pData: ArrayBuffer, isCommon?: bool): number;
        public getDataLocation(sSemantics: string): number;
        private createDataBuffer();
        public getRenderData(iSubset: number): IRenderData;
        public getEmptyRenderData(ePrimType: EPrimitiveTypes, eOptions?: ERenderDataBufferOptions): IRenderData;
        public _draw(): void;
        public destroy(): void;
        private setup(eOptions?);
    }
    function createRenderDataCollection(pEngine: IEngine, eOptions?: ERenderDataBufferOptions): IRenderDataCollection;
}
module akra {
    interface IViewport {
    }
    interface IRenderPass {
    }
    interface IMegaTexture {
        prepareForRender(pViewport: IViewport): void;
        applyForRender(pRenderPass: IRenderPass): void;
        setBufferMapNULL(pBuffer): void;
        setData(pBuffer, iX: number, iY: number, iWidth: number, iHeight: number, pBufferIn, iInX: number, iInY: number, iInWidth: number, iInHeight: number, iBlockWidth: number, iBlockHeight: number, iComponents: number): void;
        setDataT(pBuffer, iX: number, iY: number, iWidth: number, iHeight: number, pBufferIn, iInX: number, iInY: number, iInWidth: number, iInHeight: number, iBlockWidth: number, iBlockHeight: number, iComponents: number): void;
        getWidthOrig(iLevel: number): number;
        getHeightOrig(iLevel: number): number;
        getDataFromServer(iLevelTex: number, iOrigTexX: number, iOrigTexY: number, iWidth: number, iHeight: number, iAreaX: number, iAreaY: number, iAreaWidth: number, iAreaHeight: number): void;
    }
}
module akra {
    enum ERPCPacketTypes {
        FAILURE,
        REQUEST,
        RESPONSE,
    }
    interface IRPCCallback {
        n: number;
        fn: Function;
        timestamp: number;
    }
    interface IRPCPacket {
        n: number;
        type: ERPCPacketTypes;
    }
    interface IRPCRequest extends IRPCPacket {
        proc: string;
        argv: any[];
    }
    interface IRPCResponse extends IRPCPacket {
        res: any;
    }
    interface IRPC extends IEventProvider {
        remote: any;
        join(sAddr?: string): void;
        rejoin(): void;
        free(): void;
        detach(): void;
        proc(...argv: any[]): bool;
        parse(pResponse: IRPCResponse): void;
        parseBinary(pData: ArrayBuffer): void;
        joined(): void;
        _createRequest(): IRPCRequest;
        _releaseRequest(pReq: IRPCRequest): void;
    }
}
module akra {
    enum EPipeTypes {
        UNKNOWN,
        /** Connect to websocket. */
        WEBSOCKET,
        /** Connect to webworker. */
        WEBWORKER,
    }
    enum EPipeDataTypes {
        BINARY,
        STRING,
    }
    interface IPipe extends IEventProvider {
        uri: IURI;
        open(pAddr?: IURI): bool;
        open(sAddr?: string): bool;
        close(): void;
        write(sValue: string): bool;
        write(pValue: Object): bool;
        write(pValue: ArrayBuffer): bool;
        write(pValue: ArrayBufferView): bool;
        isOpened(): bool;
        isCreated(): bool;
        isClosed(): bool;
        opened(pEvent: Event): void;
        error(pErr: ErrorEvent): void;
        closed(pEvent: CloseEvent): void;
        message(pData: any, eType: EPipeDataTypes): void;
    }
}
module akra.net {
    /**@const*/ 
    var WEBSOCKET_PORT: number;
    function createPipe(sAddr?: string): IPipe;
}
module akra.net {
    function createRpc(): IRPC;
}
module akra.terrain {
    class MegaTexture implements IMegaTexture {
        private _pEngine;
        private _pObject;
        private _pWorldExtents;
        private _v2fCameraCoord;
        private _sSurfaceTextures;
        private _iOriginalTextureMaxSize;
        private _iBlockSize;
        private _eTextureFormat;
        private _iTextureHeight;
        private _iTextureWidth;
        private _pTextures;
        private _iBufferHeight;
        private _iBufferWidth;
        private _pBuffer;
        private _pBufferMap;
        private _pXY;
        private _pDataFor;
        private _pMapDataFor;
        private _pMapDataNULL;
        private _pRPC;
        private _fTexCourdXOld;
        private _fTexCourdYOld;
        private _nCountRender;
        private _pTmpBox1;
        private _pTmpBox2;
        private _pTmpPixelBox;
        constructor(pEngine: IEngine, pObject: any, sSurfaceTextures: string);
        public prepareForRender(pViewport: IViewport): void;
        public applyForRender(pRenderPass: IRenderPass): void;
        public setBufferMapNULL(pBuffer): void;
        public setData(pBuffer, iX: number, iY: number, iWidth: number, iHeight: number, pBufferIn, iInX: number, iInY: number, iInWidth: number, iInHeight: number, iBlockWidth: number, iBlockHeight: number, iComponents: number): void;
        public setDataT(pBuffer, iX: number, iY: number, iWidth: number, iHeight: number, pBufferIn, iInX: number, iInY: number, iInWidth: number, iInHeight: number, iBlockWidth: number, iBlockHeight: number, iComponents: number): void;
        private _setData(pBuffer, iX, iY, iWidth, iHeight, pBufferIn, iInX, iInY, iInWidth, iInHeight, iBlockWidth, iBlockHeight, iComponents);
        private _setDataBetweenBuffer(pBuffer, iX, iY, pBufferIn, iInX, iInY, iBlockWidth, iBlockHeight);
        private _setDataBetweenBufferMap(pBuffer, iX, iY, pBufferIn, iInX, iInY, iBlockWidth, iBlockHeight);
        private _setDataFromBlock(pBuffer, iX, iY, pBufferIn);
        public getWidthOrig(iLevel: number): number;
        public getHeightOrig(iLevel: number): number;
        public getDataFromServer(iLevelTex: number, iOrigTexX: number, iOrigTexY: number, iWidth: number, iHeight: number, iAreaX?: number, iAreaY?: number, iAreaWidth?: number, iAreaHeight?: number): void;
    }
}
module akra {
    interface ITerrainSystem {
    }
    interface ISceneObject {
    }
    interface IRect2d {
    }
    interface IVertexElementInterface {
    }
    interface IRenderableObject {
    }
    interface ITerrainSection extends ISceneObject {
        sectorX: number;
        sectorY: number;
        terrainSystem: ITerrain;
        sectionIndex: number;
        heightY: number;
        heightX: number;
        vertexDescription: IVertexElementInterface[];
        _internalCreate(pParentSystem: ITerrain, iSectorX: number, iSectorY: number, iHeightMapX: number, iHeightMapY: number, iXVerts: number, iYVerts: number, pWorldRect: IRect2d): bool;
        _createRenderable(): void;
    }
    function createSingleStripGrid(pIndexValues, iXVerts: number, iYVerts: number, iXStep: number, iYStep: number, iSride: number, iFlags: number): number;
    function getCountIndexForStripGrid(iXVerts: number, iYVerts: number): number;
}
module akra.terrain {
    class TerrainSection extends scene.SceneObject implements ITerrainSection {
        private _pTerrainSystem;
        /**@protected*/ 
        public _iVertexID: number;
        /**@protected*/ 
        public _iHeightMapX: number;
        /**@protected*/ 
        public _iHeightMapY: number;
        /**@protected*/ 
        public _iSectorX: number;
        /**@protected*/ 
        public _iSectorY: number;
        /**@protected*/ 
        public _iXVerts: number;
        /**@protected*/ 
        public _iYVerts: number;
        /**@protected*/ 
        public _pWorldRect: IRect3d;
        private _pRenderableObject;
        private _pVertexDescription;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        /**@inline*/ 
        public sectorX : number;
        /**@inline*/ 
        public sectorY : number;
        /**@inline*/ 
        public terrainSystem : ITerrain;
        /**@inline*/ 
        public sectionIndex : number;
        /**@inline*/ 
        public heightX : number;
        /**@inline*/ 
        public heightY : number;
        /**@inline*/ 
        public vertexDescription : IVertexElementInterface[];
        /**@inline*/ 
        public totalRenderable : number;
        /**@inline*/ 
        public getRenderable(i?: number): IRenderableObject;
        public _internalCreate(pParentSystem: ITerrain, iSectorX: number, iSectorY: number, iHeightMapX: number, iHeightMapY: number, iXVerts: number, iYVerts: number, pWorldRect: IRect2d): bool;
        public _createRenderable(): void;
        /**@protected*/ 
        public _createRenderDataForVertexAndIndex(): bool;
        /**@protected*/ 
        public _buildVertexBuffer(): bool;
        /**@protected*/ 
        public _buildIndexBuffer(): bool;
    }
}
module akra.terrain {
    class Terrain extends scene.SceneObject implements ITerrain {
        /**@protected*/ 
        public _pEngine: IEngine;
        /**@protected*/ 
        public _pWorldExtents: IRect3d;
        private _v3fWorldSize;
        private _v3fMapScale;
        /**@protected*/ 
        public _iSectorCountX: number;
        /**@protected*/ 
        public _iSectorCountY: number;
        /**@protected*/ 
        public _pSectorArray: ITerrainSection[];
        /**@protected*/ 
        public _pDataFactory: IRenderDataCollection;
        /**@protected*/ 
        public _v2fSectorSize: IVec2;
        /**@protected*/ 
        public _iSectorShift: number;
        private _iSectorUnits;
        /**@protected*/ 
        public _iSectorVerts: number;
        /**@protected*/ 
        public _iTableWidth: number;
        /**@protected*/ 
        public _iTableHeight: number;
        private _pHeightTable;
        private _pNormalMap;
        private _pNormalImage;
        private _pTempNormalColor;
        private _pMegaTexures;
        /**@protected*/ 
        public _fScale: number;
        /**@protected*/ 
        public _fLimit: number;
        /**@protected*/ 
        public _pDefaultRenderMethod: IRenderMethod;
        /**@protected*/ 
        public _pRenderMethod: IRenderMethod;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        /**@inline*/ 
        public dataFactory : IRenderDataCollection;
        /**@inline*/ /**@inline*/ 
        public tessellationScale : number;
        /**@inline*/ /**@inline*/ 
        public tessellationLimit : number;
        /**@inline*/ 
        public worldExtents : IRect3d;
        /**@inline*/ 
        public worldSize : IVec3;
        /**@inline*/ 
        public mapScale : IVec3;
        /**@inline*/ 
        public sectorCountX : number;
        /**@inline*/ 
        public sectorCountY : number;
        /**@inline*/ 
        public sectorSize : IVec2;
        /**@inline*/ 
        public tableWidth : number;
        /**@inline*/ 
        public tableHeight : number;
        /**@inline*/ 
        public sectorShift : number;
        /**@protected*/ 
        public _initSystemData(): bool;
        public init(pMap: IImageMap, worldExtents: IRect3d, iShift: number, iShiftX: number, iShiftY: number, sSurfaceTextures: string, pRootNode?: ISceneNode): bool;
        public findSection(iX: number, iY: number): ITerrainSection;
        /**@protected*/ 
        public _allocateSectors(): bool;
        /**@protected*/ 
        public _setRenderMethod(pRenderMethod: IRenderMethod): void;
        /**@protected*/ 
        public _buildHeightAndNormalTables(pImageHightMap: IImg, pImageNormalMap: IImg): void;
        public readWorldHeight(iIndex: number): number;
        public readWorldHeight(iMapX: number, iMapY: number): number;
        /**@protected*/ 
        public _tableIndex(iMapX: number, iMapY: number): number;
        public readWorldNormal(v3fNormal: IVec3, iMapX: number, iMapY: number): IVec3;
        public calcWorldHeight(fWorldX: number, fWorldY: number): number;
        public calcWorldNormal(v3fNormal: IVec3, fWorldX: number, fWorldY: number): IVec3;
        /**@protected*/ 
        public _calcMapHeight(fMapX: number, fMapY: number): number;
        /**@protected*/ 
        public _calcMapNormal(v3fNormal: IVec3, fMapX: number, fMapY: number): IVec3;
        /**@protected*/ 
        public _generateTerrainImage(pTerrainImage: IImg, pTextureList: any, iTextureCount: number): void;
        /**@protected*/ 
        public _computeWeight(fValue: number, fMinExtent: number, fMaxExtent: number): number;
        /**@protected*/ 
        public _generateBlendImage(pBlendImage, pElevationData, iElevationDataCount: number, fnCallback): void;
        /**@protected*/ 
        public _setTessellationParameters(fScale: number, fLimit: number): void;
        /**
        * Подготовка терраина к рендерингу.
        */
        public prepareForRender(pViewport: IViewport): void;
        /**
        * Сброс параметров.
        */
        public reset(): void;
        /**
        * Обработка пользовательского ввода.
        */
        public readUserInput(): void;
        /**@protected*/ 
        public computeBoundingBox(): void;
        public _onRender(pTechnique: IRenderTechnique, iPass: number): void;
    }
}
module akra {
    interface ITerrain {
    }
    interface ITerrainSectionROAM {
    }
    interface IRect3d {
    }
    interface ISceneNode {
    }
    interface ITerrainROAM extends ITerrain {
        verts: number[];
        index: Float32Array;
        maxTriTreeNodes: number;
        vertexId: number;
        totalIndex: number;
        requestTriNode();
        addToTessellationQueue(pSection: ITerrainSectionROAM): bool;
        processTessellationQueue(): void;
    }
}
module akra {
    interface ISceneObject {
    }
    interface ITriTreeNode {
    }
    interface IRect3d {
    }
    interface ITerrainSection {
    }
    interface ITerrainSectionROAM extends ITerrainSection {
        triangleA: ITriTreeNode;
        triangleB: ITriTreeNode;
        queueSortValue: number;
        terrainSystem: ITerrainROAM;
        _internalCreate(pParentSystem: ITerrainROAM, iSectorX: number, iSectorY: number, iHeightMapX: number, iHeightMapY: number, iXVerts: number, iYVerts: number, pWorldRect: IRect2d, iStartIndex?: number): bool;
        reset(): void;
        tessellate(fScale: number, fLimit: number): void;
        /**
        * Создаем terrain
        * @param pTri вершина дерева треугольников.
        * @param {float} fDistA растояниe до углов треугольников - центр.
        * @param {float} fDistB растояниe до углов треугольников - лево.
        * @param {float} fDistC растояниe до углов треугольников - право.
        * @param pVTree массив погрешности по высоте
        * @param iIndex
        * @param {float} fScale
        * @param {float} fLimit
        */
        recursiveTessellate(pTri: ITriTreeNode, fDistA: number, fDistB: number, fDistC: number, pVTree: number[], iIndex: number, fScale: number, fLimit: number): void;
        split(pTri: ITriTreeNode): void;
        buildTriangleList(): void;
        recursiveBuildTriangleList(pTri: ITriTreeNode, iPointBase: number, iPointLeft: number, iPointRight: number): void;
        computeVariance(): void;
        recursiveComputeVariance(iCornerA: number, iCornerB: number, iCornerC: number, fHeightA: number, fHeightB: number, fHeightC: number, pVTree: number[], iIndex: number): number;
        drawVariance(iIndex: number, iCornerA: number, iCornerB: number, iCornerC: number, pVTree: number[]): void;
    }
}
module akra.terrain {
    class TerrainSectionROAM extends TerrainSection implements ITerrainSectionROAM {
        private _iTotalDetailLevels;
        private _iTotalVariances;
        private _iOffsetInVertexBuffer;
        private _pRootTriangleA;
        private _pRootTriangleB;
        private _pVarianceTreeA;
        private _pVarianceTreeB;
        private _v3fDistance0;
        private _v3fDistance1;
        private _v3fDistance2;
        private _v3fDistance3;
        private _fDistance0;
        private _fDistance1;
        private _fDistance2;
        private _fDistance3;
        private _fQueueSortValue;
        private _leftNeighborOfA;
        private _rightNeighborOfA;
        private _leftNeighborOfB;
        private _rightNeighborOfB;
        private _iStartIndex;
        private _pTerrainSystem;
        private _iTempTotalIndices;
        private _pTempIndexList;
        private _iMaxIndices;
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        /**@inline*/ 
        public terrainSystem : ITerrainROAM;
        /**@inline*/ 
        public triangleA : ITriTreeNode;
        /**@inline*/ 
        public triangleB : ITriTreeNode;
        /**@inline*/ 
        public queueSortValue : number;
        public _internalCreate(pParentSystem: ITerrainROAM, iSectorX: number, iSectorY: number, iHeightMapX: number, iHeightMapY: number, iXVerts: number, iYVerts: number, pWorldRect: IRect2d, iStartIndex?: number): bool;
        public prepareForRender(pViewport: IViewport): void;
        public reset(): void;
        public tessellate(fScale: number, fLimit: number): void;
        public recursiveTessellate(pTri: ITriTreeNode, fDistA: number, fDistB: number, fDistC: number, pVTree: number[], iIndex: number, fScale: number, fLimit: number): void;
        public split(pTri: ITriTreeNode): void;
        private _createRenderDataForVertexAndIndex();
        private _buildIndexBuffer();
        private _buildVertexBuffer();
        public buildTriangleList(): void;
        public recursiveBuildTriangleList(pTri: ITriTreeNode, iPointBase: number, iPointLeft: number, iPointRight: number): void;
        public computeVariance(): void;
        public recursiveComputeVariance(iCornerA: number, iCornerB: number, iCornerC: number, fHeightA: number, fHeightB: number, fHeightC: number, pVTree: number[], iIndex: number): number;
        public drawVariance(iIndex: number, iCornerA: number, iCornerB: number, iCornerC: number, pVTree: number[]): void;
    }
}
module akra {
    interface ITriTreeNode {
        baseNeighbor: ITriTreeNode;
        leftNeighbor: ITriTreeNode;
        rightNeighbor: ITriTreeNode;
        leftChild: ITriTreeNode;
        rightChild: ITriTreeNode;
    }
    interface ITriangleNodePool {
        request();
        reset(): void;
    }
}
module akra.terrain {
    class TriTreeNode implements ITriTreeNode {
        private _pBaseNeighbor;
        private _pLeftNeighbor;
        private _pRightNeighbor;
        private _pLeftChild;
        private _pRightChild;
        /**@inline*/ /**@inline*/ 
        public baseNeighbor : ITriTreeNode;
        /**@inline*/ /**@inline*/ 
        public leftNeighbor : ITriTreeNode;
        /**@inline*/ /**@inline*/ 
        public rightNeighbor : ITriTreeNode;
        /**@inline*/ /**@inline*/ 
        public leftChild : ITriTreeNode;
        /**@inline*/ /**@inline*/ 
        public rightChild : ITriTreeNode;
    }
    class TriangleNodePool implements ITriangleNodePool {
        private _iNextTriNode;
        private _iMaxCount;
        private _pPool;
        /**@inline*/ /**@inline*/ 
        public nextTriNode : number;
        /**@inline*/ 
        public maxCount : number;
        /**@inline*/ /**@inline*/ 
        public pool : ITriTreeNode[];
        constructor(iCount: number);
        public request(): ITriTreeNode;
        public reset(): void;
    }
}
module akra.terrain {
    class TerrainROAM extends Terrain implements ITerrainROAM {
        private _pRenderableObject;
        private _pRenderData;
        private _pDataIndex;
        private _iTotalIndices;
        private _iTotalIndicesOld;
        private _iTotalIndicesMax;
        private _pIndexList;
        private _pVerts;
        private _iVertexID;
        private _pNodePool;
        private _pThistessellationQueue;
        private _iTessellationQueueCount;
        private _isCreat;
        private _isRenderInThisFrame;
        private _iMaxTriTreeNodes;
        private _iTessellationQueueSize;
        private _isCreate;
        /**@protected*/ 
        public _pSectorArray: ITerrainSectionROAM[];
        constructor(pScene: IScene3d, eType?: EEntityTypes);
        /**@inline*/ 
        public maxTriTreeNodes : number;
        /**@inline*/ 
        public verts : number[];
        /**@inline*/ 
        public index : Float32Array;
        /**@inline*/ /**@inline*/ 
        public totalIndex : number;
        /**@inline*/ 
        public vertexId : number;
        /**@inline*/ 
        public totalRenderable : number;
        /**@inline*/ 
        public getRenderable(i?: number): IRenderableObject;
        private _iTessellationQueueCountOld;
        private _nCountRender;
        public init(pImgMap: IImageMap, worldExtents: IRect3d, iShift: number, iShiftX: number, iShiftY: number, sSurfaceTextures: string, pRootNode?: ISceneObject): bool;
        public destroy(): void;
        /**@protected*/ 
        public _allocateSectors(): bool;
        public reset(): void;
        public requestTriNode();
        public addToTessellationQueue(pSection: ITerrainSectionROAM): bool;
        public processTessellationQueue(): void;
        public _onBeforeRender(pRenderableObject: IRenderableObject, pViewport: IViewport): void;
    }
}
module akra.scene.light {
    class ProjectLight extends LightPoint implements IProjectLight {
        /**@protected*/ 
        public _pDepthTexture: ITexture;
        /**@protected*/ 
        public _pColorTexture: ITexture;
        /**@protected*/ 
        public _pShadowCaster: IShadowCaster;
        constructor(pScene: IScene3d);
        public create(isShadowCaster?: bool, iMaxShadowResolution?: number): bool;
        /**@inline*/ 
        public getDepthTexture(): ITexture;
        /**@inline*/ 
        public getRenderTarget(): IRenderTarget;
        /**@inline*/ 
        public getShadowCaster(): IShadowCaster;
        /**@inline*/ /**
        * overridden setter isShadow caster,
        * if depth texture don't created then create depth texture
        */
        public isShadowCaster : bool;
        /**@protected*/ 
        public initializeTextures(): void;
        public _calculateShadows(): void;
        public _prepareForLighting(pCamera: ICamera): bool;
        /**@protected*/ 
        public _defineLightingInfluence(pCamera: ICamera): IObjectArray;
        /**@protected*/ 
        public _defineShadowInfluence(pCamera: ICamera): IObjectArray;
        static _pFrustumPlanes: IPlane3d[];
    }
}
module akra.scene.light {
    class OmniLight extends LightPoint implements IOmniLight {
        /**@protected*/ 
        public _pDepthTextureCube: ITexture[];
        /**@protected*/ 
        public _pColorTextureCube: ITexture[];
        /**@protected*/ 
        public _pShadowCasterCube: IShadowCaster[];
        constructor(pScene: IScene3d);
        public create(isShadowCaster?: bool, iMaxShadowResolution?: number): bool;
        /**@inline*/ 
        public getDepthTextureCube(): ITexture[];
        /**@inline*/ 
        public getRenderTarget(iFace: number): IRenderTarget;
        /**@inline*/ 
        public getShadowCaster(): IShadowCaster[];
        /**@inline*/ /**
        * overridden setter isShadow caster,
        * if depth textures don't created then create depth textures
        */
        public isShadowCaster : bool;
        /**@protected*/ 
        public initializeTextures(): void;
        public _calculateShadows(): void;
        public _prepareForLighting(pCamera: ICamera): bool;
        /**@protected*/ 
        public _defineLightingInfluence(pCamera: ICamera, iFace: number): IObjectArray;
        /**@protected*/ 
        public _defineShadowInfluence(pCamera: ICamera, iFace: number): IObjectArray;
        static _pFrustumPlanes: IPlane3d[];
    }
}
module akra.scene {
    class Scene3d implements IScene3d {
        /**@protected*/ 
        public _pRootNode: ISceneNode;
        /**@protected*/ 
        public _pSceneManager: ISceneManager;
        /**@protected*/ 
        public _pDisplayLists: IDisplayList[];
        /**@protected*/ 
        public _pDisplayListsCount: number;
        /**@protected*/ 
        public _isUpdated: bool;
        /**@inline*/ 
        public type : ESceneTypes;
        /**@inline*/ 
        public totalDL : number;
        constructor(pSceneManager: ISceneManager);
        /**@inline*/ 
        public getManager(): ISceneManager;
        /**@inline*/ 
        public isUpdated(): bool;
        /**@inline*/ 
        public getRootNode(): ISceneNode;
        public recursivePreUpdate(): void;
        public recursiveUpdate(): void;
        public updateCamera(): bool;
        public updateScene(): bool;
        public createObject(sName?: string): ISceneObject;
        public createNode(sName?: string): ISceneNode;
        public createModel(sName?: string): ISceneModel;
        public createCamera(sName?: string): ICamera;
        public createLightPoint(eType?: ELightTypes, isShadowCaster?: bool, iMaxShadowResolution?: number, sName?: string): ILightPoint;
        public createSprite(sName?: string): ISprite;
        public createJoint(sName?: string): IJoint;
        public _createModelEntry(pModel: IModel): IModelEntry;
        public createText3d(sName?: string): IText3d;
        public createTerrain(sName?: string): ITerrain;
        public createTerrainROAM(sName?: string): ITerrainROAM;
        public createTerrainSection(sName?: string): ITerrainSection;
        public createTerrainSectionROAM(sName?: string): ITerrainSectionROAM;
        public _createShadowCaster(pLightPoint: ILightPoint, iFace?: number, sName?: string): IShadowCaster;
        /**@inline*/ 
        public getDisplayList(i: number): IDisplayList;
        public getDisplayListByName(csName: string): number;
        public _render(pCamera: ICamera, pViewport: IViewport): void;
        private setupNode(pNode, sName?);
        public delDisplayList(index: number): bool;
        /**@inline*/ 
        public addDisplayList(pList: IDisplayList): number;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public nodeAttachment(pNode: ISceneNode): void;
        public nodeDetachment(pNode: ISceneNode): void;
        public displayListAdded(list, index): void;
        public displayListRemoved(list, index): void;
        public beforeUpdate(): void;
        public postUpdate(): void;
        public preUpdate(): void;
    }
}
module akra.scene {
    class SceneManager implements ISceneManager {
        private _pEngine;
        private _pSceneList;
        private _fUpdateTimeCount;
        private _fMillisecondsPerTick;
        constructor(pEngine: IEngine);
        public getEngine(): IEngine;
        public update(): void;
        public notifyUpdateScene(): void;
        public notifyPreUpdateScene(): void;
        public createScene3D(): IScene3d;
        public createScene2D(): IScene2d;
        public createUI(): IUI;
        public getScene3D(iScene?: number): IScene3d;
        public getScene2D(IScene?: number): IScene2d;
        public getScene(IScene?: number, eType?: ESceneTypes): IScene;
        public initialize(): bool;
        public destroy(): void;
    }
}
module akra.fx {
    interface IEffectErrorInfo {
        typeName?: string;
        techName?: string;
        exprName?: string;
        varName?: string;
        operator?: string;
        leftTypeName?: string;
        rirgtTypeName?: string;
        fieldName?: string;
        funcName?: string;
        funcDef?: string;
        semanticName?: string;
        techniqueName?: string;
        componentName?: string;
        line?: number;
        column?: number;
    }
}
module akra.fx {
    enum EScopeType {
        k_Default,
        k_Struct,
        k_Annotation,
    }
    interface IAFXFunctionDeclListMap {
        [functionName: string]: IAFXFunctionDeclInstruction[];
    }
    interface IScope {
        parent: IScope;
        index: number;
        type: EScopeType;
        isStrictMode: bool;
        variableMap: IAFXVariableDeclMap;
        typeMap: IAFXTypeDeclMap;
        functionMap: IAFXFunctionDeclListMap;
    }
    interface IScopeMap {
        [scopeIndex: number]: IScope;
    }
    class ProgramScope {
        private _pScopeMap;
        private _iCurrentScope;
        private _nScope;
        constructor();
        public isStrictMode(iScope?: number): bool;
        public setStrictModeOn(iScope?: number): void;
        public newScope(eType: EScopeType): void;
        public resumeScope(): void;
        public setScope(iScope: number): void;
        public getScope(): number;
        public endScope(): void;
        /**@inline*/ 
        public getScopeType(): EScopeType;
        public getVariable(sVariableName: string, iScope?: number): IAFXVariableDeclInstruction;
        public getType(sTypeName: string, iScope?: number): IAFXTypeInstruction;
        public getTypeDecl(sTypeName: string, iScope?: number): IAFXTypeDeclInstruction;
        /**
        * get function by name and list of types
        * return null - if threre are not function; undefined - if there more then one function; function - if all ok
        */
        public getFunction(sFuncName: string, pArgumentTypes: IAFXTypedInstruction[], iScope?: number): IAFXFunctionDeclInstruction;
        /**
        * get shader function by name and list of types
        * return null - if threre are not function; undefined - if there more then one function; function - if all ok
        */
        public getShaderFunction(sFuncName: string, pArgumentTypes: IAFXTypedInstruction[], iScope?: number): IAFXFunctionDeclInstruction;
        public addVariable(pVariable: IAFXVariableDeclInstruction, iScope?: number): bool;
        public addType(pType: IAFXTypeDeclInstruction, iScope?: number): bool;
        public addFunction(pFunction: IAFXFunctionDeclInstruction, iScope?: number): bool;
        public hasVariable(sVariableName: string, iScope?: number): bool;
        public hasType(sTypeName: string, iScope?: number): bool;
        public hasFunction(sFuncName: string, pArgumentTypes: IAFXTypedInstruction[], iScope?: number): bool;
        /**@inline*/ 
        private hasVariableInScope(sVariableName, iScope);
        /**@inline*/ 
        private hasTypeInScope(sTypeName, iScope);
        private hasFunctionInScope(pFunction, iScope);
    }
    class ExprTemplateTranslator {
        private _pInToOutArgsMap;
        private _pExprPart;
        constructor(sExprTemplate: string);
        public toInstructionList(pArguments: IAFXInstruction[]): IAFXInstruction[];
    }
}
module akra.fx {
    function getEffectBaseType(sTypeName: string): SystemTypeInstruction;
    function isSamplerType(pType: IAFXVariableTypeInstruction): bool;
    class Instruction implements IAFXInstruction {
        /**@protected*/ 
        public _pParentInstruction: IAFXInstruction;
        /**@protected*/ 
        public _sOperatorName: string;
        /**@protected*/ 
        public _pInstructionList: IAFXInstruction[];
        /**@protected*/ 
        public _nInstructions: number;
        /**@protected*/ 
        public _eInstructionType: EAFXInstructionTypes;
        /**@protected*/ 
        public _pLastError: IAFXInstructionError;
        /**@protected*/ 
        public _bErrorOccured: bool;
        /**@protected*/ 
        public _iInstructionID: number;
        /**@protected*/ 
        public _iScope: number;
        private static _nInstructionCounter;
        private _isVisible;
        /**@inline*/ 
        public getGuid(): number;
        /**@inline*/ 
        public getParent(): IAFXInstruction;
        /**@inline*/ 
        public setParent(pParentInstruction: IAFXInstruction): void;
        /**@inline*/ 
        public getOperator(): string;
        /**@inline*/ 
        public setOperator(sOperator: string): void;
        /**@inline*/ 
        public getInstructions(): IAFXInstruction[];
        /**@inline*/ 
        public setInstructions(pInstructionList: IAFXInstruction[]): void;
        /**@inline*/ 
        public _getInstructionType(): EAFXInstructionTypes;
        /**@inline*/ 
        public _getInstructionID(): number;
        public _getScope(): number;
        /**@inline*/ 
        public _setScope(iScope: number): void;
        /**@inline*/ 
        public _isInGlobalScope(): bool;
        /**@inline*/ 
        public getLastError(): IAFXInstructionError;
        /**@inline*/ 
        public setError(eCode: number, pInfo?: any): void;
        /**@inline*/ 
        public clearError(): void;
        /**@inline*/ 
        public isErrorOccured(): bool;
        /**@inline*/ 
        public setVisible(isVisible: bool): void;
        /**@inline*/ 
        public isVisible(): bool;
        /**@inline*/ 
        public initEmptyInstructions(): void;
        constructor();
        public push(pInstruction: IAFXInstruction, isSetParent?: bool): void;
        public addRoutine(fnRoutine: IAFXInstructionRoutine, iPriority?: number): void;
        public prepareFor(eUsedType: EFunctionType): void;
        /**
        * Проверка валидности инструкции
        */
        public check(eStage: ECheckStage, pInfo?: any): bool;
        /**
        * Подготовка интсрукции к дальнейшему анализу
        */
        public prepare(): bool;
        public toString(): string;
        public toFinalCode(): string;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXInstruction;
    }
    class InstructionCollector extends Instruction {
        constructor();
        public toFinalCode(): string;
    }
    class SimpleInstruction extends Instruction implements IAFXSimpleInstruction {
        private _sValue;
        constructor(sValue: string);
        /**@inline*/ 
        public setValue(sValue: string): void;
        /**@inline*/ 
        public isValue(sValue: string): bool;
        public toString(): string;
        public toFinalCode(): string;
        public clone(pRelationMap?: IAFXInstructionMap): SimpleInstruction;
    }
    class TypedInstruction extends Instruction implements IAFXTypedInstruction {
        /**@protected*/ 
        public _pType: IAFXTypeInstruction;
        constructor();
        public getType(): IAFXTypeInstruction;
        public setType(pType: IAFXTypeInstruction): void;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXTypedInstruction;
    }
    class DeclInstruction extends TypedInstruction implements IAFXDeclInstruction {
        /**@protected*/ 
        public _sSemantic: string;
        /**@protected*/ 
        public _pAnnotation: IAFXAnnotationInstruction;
        /**@protected*/ 
        public _bForPixel: bool;
        /**@protected*/ 
        public _bForVertex: bool;
        /**@protected*/ 
        public _isBuiltIn: bool;
        constructor();
        public setSemantic(sSemantic: string): void;
        public setAnnotation(pAnnotation: IAFXAnnotationInstruction): void;
        public getName(): string;
        public getRealName(): string;
        public getNameId(): IAFXIdInstruction;
        /**@inline*/ 
        public getSemantic(): string;
        public isBuiltIn(): bool;
        public setBuiltIn(isBuiltIn: bool): void;
        /**@inline*/ 
        public _isForAll(): bool;
        /**@inline*/ 
        public _isForPixel(): bool;
        /**@inline*/ 
        public _isForVertex(): bool;
        /**@inline*/ 
        public _setForAll(canUse: bool): void;
        /**@inline*/ 
        public _setForPixel(canUse: bool): void;
        /**@inline*/ 
        public _setForVertex(canUse: bool): void;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXDeclInstruction;
    }
    class IdInstruction extends Instruction implements IAFXIdInstruction {
        private _sName;
        private _sRealName;
        private _isForVarying;
        /**@inline*/ 
        public isVisible(): bool;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        /**@inline*/ 
        public setName(sName: string): void;
        /**@inline*/ 
        public setRealName(sRealName: string): void;
        /**@inline*/ 
        public _markAsVarying(bValue: bool): void;
        public toString(): string;
        public toFinalCode(): string;
        public clone(pRelationMap?: IAFXInstructionMap): IdInstruction;
    }
    class KeywordInstruction extends Instruction implements IAFXKeywordInstruction {
        private _sValue;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public setValue(sValue: string): void;
        /**@inline*/ 
        public isValue(sTestValue: string): bool;
        public toString(): string;
        public toFinalCode(): string;
    }
    class AnnotationInstruction extends Instruction implements IAFXAnnotationInstruction {
        constructor();
    }
    class PassInstruction extends DeclInstruction implements IAFXPassInstruction {
        private _pTempNodeList;
        private _pTempFoundedFuncList;
        private _pTempFoundedFuncTypeList;
        private _pParseNode;
        private _sFunctionCode;
        private _isComlexPass;
        private _pShadersMap;
        private _fnPassFunction;
        private _pVertexShader;
        private _pPixelShader;
        private _pPassStateMap;
        private _pSharedVariableMapV;
        private _pGlobalVariableMapV;
        private _pUniformVariableMapV;
        private _pForeignVariableMapV;
        private _pTextureVariableMapV;
        private _pUsedComplexTypeMapV;
        private _pSharedVariableMapP;
        private _pGlobalVariableMapP;
        private _pUniformVariableMapP;
        private _pForeignVariableMapP;
        private _pTextureVariableMapP;
        private _pUsedComplexTypeMapP;
        private _pFullUniformVariableMap;
        private _pFullForeignVariableMap;
        private _pFullTextureVariableMap;
        constructor();
        public _addFoundFunction(pNode: IParseNode, pShader: IAFXFunctionDeclInstruction, eType: EFunctionType): void;
        public _getFoundedFunction(pNode: IParseNode): IAFXFunctionDeclInstruction;
        public _getFoundedFunctionType(pNode: IParseNode): EFunctionType;
        public _setParseNode(pNode: IParseNode): void;
        public _getParseNode(): IParseNode;
        public _addCodeFragment(sCode: string): void;
        /**@inline*/ 
        public _markAsComplex(isComplex: bool): void;
        /**@inline*/ 
        public _getSharedVariableMapV(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getGlobalVariableMapV(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUniformVariableMapV(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getForeignVariableMapV(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getTextureVariableMapV(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUsedComplexTypeMapV(): IAFXTypeMap;
        /**@inline*/ 
        public _getSharedVariableMapP(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getGlobalVariableMapP(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUniformVariableMapP(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getForeignVariableMapP(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getTextureVariableMapP(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUsedComplexTypeMapP(): IAFXTypeMap;
        /**@inline*/ 
        public _getFullUniformMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getFullForeignMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getFullTextureMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public isComplexPass(): bool;
        /**@inline*/ 
        public getVertexShader(): IAFXFunctionDeclInstruction;
        /**@inline*/ 
        public getPixelShader(): IAFXFunctionDeclInstruction;
        public addShader(pShader: IAFXFunctionDeclInstruction): void;
        public setState(sType: string, sValue: string): void;
        public finalizePass(): void;
        public evaluate(pEngineStates: any, pForeigns: any, pUniforms: any): bool;
        private generateInfoAboutUsedVaraibles();
        private addInfoAbouUsedVariablesFromFunction(pFunction);
    }
    class TechniqueInstruction extends DeclInstruction implements IAFXTechniqueInstruction {
        private _sName;
        private _hasComplexName;
        private _pParseNode;
        private _pSharedVariableListV;
        private _pSharedVariableListP;
        private _pPassList;
        private _pComponentList;
        private _pComponentShiftList;
        private _pFullComponentList;
        private _pFullComponentShiftList;
        private _nTotalPasses;
        constructor();
        public setName(sName: string, isComplexName: bool): void;
        public getName(): string;
        public hasComplexName(): bool;
        public getSharedVariablesForVertex(): IAFXVariableDeclInstruction[];
        public getSharedVariablesForPixel(): IAFXVariableDeclInstruction[];
        public addPass(pPass: IAFXPassInstruction): void;
        public getPassList(): IAFXPassInstruction[];
        public getPass(iPass: number): IAFXPassInstruction;
        public totalOwnPasses(): number;
        public totalPasses(): number;
        public addComponent(pComponent: IAFXComponent, iShift: number): void;
        /**@inline*/ 
        public getComponentList(): IAFXComponent[];
        /**@inline*/ 
        public getComponentListShift(): number[];
        public getFullComponentList(): IAFXComponent[];
        public getFullComponentShiftList(): number[];
        public checkForCorrectImports(): bool;
        public finalizeTechnique(sProvideNameSpace: string, pGloabalComponentList: IAFXComponent[], pGloabalComponentShiftList: number[]): void;
        private generateListOfSharedVariables();
        private addSharedVariable(pVar, eType);
        private generateFullListOfComponent();
    }
}
module akra.fx {
    class TypeDeclInstruction extends DeclInstruction implements IAFXTypeDeclInstruction {
        constructor();
        /**@inline*/ 
        public getType(): IAFXTypeInstruction;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXTypeDeclInstruction;
        public toFinalCode(): string;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        public blend(pDecl: IAFXTypeDeclInstruction, eBlendMode: EAFXBlendMode): IAFXTypeDeclInstruction;
    }
    class VariableTypeInstruction extends Instruction implements IAFXVariableTypeInstruction {
        private _pSubType;
        private _pUsageList;
        private _sName;
        private _isWritable;
        private _isReadable;
        private _bUsedForWrite;
        private _bUsedForRead;
        private _sHash;
        private _sStrongHash;
        private _isArray;
        private _isPointer;
        private _isStrictPointer;
        private _isPointIndex;
        private _isUniform;
        private _isGlobal;
        private _isConst;
        private _isShared;
        private _isForeign;
        private _iLength;
        private _isNeedToUpdateLength;
        private _isFromVariableDecl;
        private _isFromTypeDecl;
        private _isField;
        private _pArrayIndexExpr;
        private _pArrayElementType;
        private _pFieldDeclMap;
        private _pFieldDeclBySemanticMap;
        private _pFieldIdMap;
        private _pUsedFieldMap;
        private _pVideoBuffer;
        private _pMainPointIndex;
        private _pUpPointIndex;
        private _pDownPointIndex;
        private _nPointDim;
        private _pPointerList;
        private _iPadding;
        private _pSubDeclList;
        private _pAttrOffset;
        private _bUnverifiable;
        private _bCollapsed;
        constructor();
        public toFinalCode(): string;
        public _toDeclString(): string;
        public isBuiltIn(): bool;
        public setBuiltIn(isBuiltIn: bool): void;
        /**@inline*/ 
        public _setCollapsed(bValue: bool): void;
        /**@inline*/ 
        public _isCollapsed(): bool;
        /**@inline*/ 
        public isBase(): bool;
        /**@inline*/ 
        public isArray(): bool;
        /**@inline*/ 
        public isNotBaseArray(): bool;
        /**@inline*/ 
        public isComplex(): bool;
        public isEqual(pType: IAFXTypeInstruction): bool;
        public isStrongEqual(pType: IAFXTypeInstruction): bool;
        public isSampler(): bool;
        public isSamplerCube(): bool;
        public isSampler2D(): bool;
        public isWritable(): bool;
        public isReadable(): bool;
        public _containArray(): bool;
        public _containSampler(): bool;
        public _containPointer(): bool;
        public _containComplexType(): bool;
        public isPointer(): bool;
        public isStrictPointer(): bool;
        public isPointIndex(): bool;
        public isFromVariableDecl(): bool;
        public isFromTypeDecl(): bool;
        public isUniform(): bool;
        public isGlobal(): bool;
        public isConst(): bool;
        public isShared(): bool;
        public isForeign(): bool;
        public _isTypeOfField(): bool;
        /**@inline*/ 
        public _isUnverifiable(): bool;
        public setName(sName: string): void;
        /**@inline*/ 
        public _canWrite(isWritable: bool): void;
        /**@inline*/ 
        public _canRead(isReadable: bool): void;
        /**@inline*/ 
        public setPadding(iPadding: number): void;
        public pushType(pType: IAFXTypeInstruction): void;
        public addUsage(sUsage: string): void;
        public addArrayIndex(pExpr: IAFXExprInstruction): void;
        public addPointIndex(isStrict?: bool): void;
        public setVideoBuffer(pBuffer: IAFXVariableDeclInstruction): void;
        public initializePointers(): void;
        public _setPointerToStrict(): void;
        public _addPointIndexInDepth(): void;
        public _setVideoBufferInDepth(): void;
        /**@inline*/ 
        public _markAsUnverifiable(isUnverifiable: bool): void;
        public _addAttrOffset(pOffset: IAFXVariableDeclInstruction): void;
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        public getHash(): string;
        public getStrongHash(): string;
        public getSize(): number;
        public getBaseType(): IAFXTypeInstruction;
        public getLength(): number;
        public getPadding(): number;
        public getArrayElementType(): IAFXVariableTypeInstruction;
        public getTypeDecl(): IAFXTypeDeclInstruction;
        public hasField(sFieldName: string): bool;
        public hasFieldWithSematic(sSemantic: string): bool;
        public hasAllUniqueSemantics(): bool;
        public hasFieldWithoutSemantic(): bool;
        public getField(sFieldName: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public getFieldBySemantic(sSemantic: string): IAFXVariableDeclInstruction;
        public getFieldType(sFieldName: string): IAFXVariableTypeInstruction;
        public getFieldNameList(): string[];
        /**@inline*/ 
        public getUsageList(): string[];
        /**@inline*/ 
        public getSubType(): IAFXTypeInstruction;
        public hasUsage(sUsageName: string): bool;
        public hasVideoBuffer(): bool;
        public getPointDim(): number;
        public getPointer(): IAFXVariableDeclInstruction;
        public getVideoBuffer(): IAFXVariableDeclInstruction;
        public getFieldExpr(sFieldName: string): IAFXIdExprInstruction;
        public getFieldIfExist(sFieldName: string): IAFXVariableDeclInstruction;
        public getSubVarDecls(): IAFXVariableDeclInstruction[];
        public _getFullName(): string;
        public _getVarDeclName(): string;
        public _getTypeDeclName(): string;
        public _getParentVarDecl(): IAFXVariableDeclInstruction;
        public _getParentContainer(): IAFXVariableDeclInstruction;
        public _getMainVariable(): IAFXVariableDeclInstruction;
        public _getMainPointer(): IAFXVariableDeclInstruction;
        public _getUpPointer(): IAFXVariableDeclInstruction;
        public _getDownPointer(): IAFXVariableDeclInstruction;
        public _getAttrOffset(): IAFXVariableDeclInstruction;
        public wrap(): IAFXVariableTypeInstruction;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXVariableTypeInstruction;
        public blend(pType: IAFXVariableTypeInstruction, eMode: EAFXBlendMode): IAFXVariableTypeInstruction;
        public _setCloneHash(sHash: string, sStrongHash: string): void;
        public _setCloneArrayIndex(pElementType: IAFXVariableTypeInstruction, pIndexExpr: IAFXExprInstruction, iLength: number): void;
        public _setClonePointeIndexes(nDim: number, pPointerList: IAFXVariableDeclInstruction[]): void;
        public _setCloneFields(pFieldMap: IAFXVariableDeclMap): void;
        /**@inline*/ 
        public _setUpDownPointers(pUpPointIndex: IAFXVariableDeclInstruction, pDownPointIndex: IAFXVariableDeclInstruction): void;
        private calcHash();
        private calcStrongHash();
        private generateSubDeclList();
        /**@inline*/ 
        private canHaveSubDecls();
    }
    class SystemTypeInstruction extends Instruction implements IAFXTypeInstruction {
        private _sName;
        private _sRealName;
        private _pElementType;
        private _iLength;
        private _iSize;
        private _pFieldDeclMap;
        private _isArray;
        private _isWritable;
        private _isReadable;
        private _pFieldNameList;
        private _pWrapVariableType;
        private _isBuiltIn;
        private _sDeclString;
        constructor();
        public _toDeclString(): string;
        public toFinalCode(): string;
        public isBuiltIn(): bool;
        public setBuiltIn(isBuiltIn: bool): void;
        public setDeclString(sDecl: string): void;
        /**@inline*/ 
        public isBase(): bool;
        /**@inline*/ 
        public isArray(): bool;
        /**@inline*/ 
        public isNotBaseArray(): bool;
        /**@inline*/ 
        public isComplex(): bool;
        /**@inline*/ 
        public isEqual(pType: IAFXTypeInstruction): bool;
        /**@inline*/ 
        public isStrongEqual(pType: IAFXTypeInstruction): bool;
        /**@inline*/ 
        public isConst(): bool;
        public isSampler(): bool;
        public isSamplerCube(): bool;
        public isSampler2D(): bool;
        /**@inline*/ 
        public isWritable(): bool;
        /**@inline*/ 
        public isReadable(): bool;
        public _containArray(): bool;
        public _containSampler(): bool;
        public _containPointer(): bool;
        public _containComplexType(): bool;
        /**@inline*/ 
        public setName(sName: string): void;
        /**@inline*/ 
        public setRealName(sRealName: string): void;
        /**@inline*/ 
        public setSize(iSize: number): void;
        /**@inline*/ 
        public _canWrite(isWritable: bool): void;
        /**@inline*/ 
        public _canRead(isReadable: bool): void;
        public addIndex(pType: IAFXTypeInstruction, iLength: number): void;
        public addField(sFieldName: string, pType: IAFXTypeInstruction, isWrite?: bool, sRealFieldName?: string): void;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        /**@inline*/ 
        public getHash(): string;
        /**@inline*/ 
        public getStrongHash(): string;
        /**@inline*/ 
        public getSize(): number;
        /**@inline*/ 
        public getBaseType(): IAFXTypeInstruction;
        /**@inline*/ 
        public getVariableType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getArrayElementType(): IAFXTypeInstruction;
        public getTypeDecl(): IAFXTypeDeclInstruction;
        /**@inline*/ 
        public getLength(): number;
        /**@inline*/ 
        public hasField(sFieldName: string): bool;
        public hasFieldWithSematic(sSemantic: string): bool;
        public hasAllUniqueSemantics(): bool;
        public hasFieldWithoutSemantic(): bool;
        /**@inline*/ 
        public getField(sFieldName: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public getFieldBySemantic(sSemantic: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public getFieldType(sFieldName: string): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getFieldNameList(): string[];
        /**@inline*/ 
        public clone(pRelationMap?: IAFXInstructionMap): SystemTypeInstruction;
        /**@inline*/ 
        public blend(pType: IAFXTypeInstruction, eMode: EAFXBlendMode): IAFXTypeInstruction;
    }
    class ComplexTypeInstruction extends Instruction implements IAFXTypeInstruction {
        private _sName;
        private _sRealName;
        private _sHash;
        private _sStrongHash;
        private _iSize;
        private _pFieldDeclMap;
        private _pFieldDeclList;
        private _pFieldNameList;
        private _pFieldDeclBySemanticMap;
        private _hasAllUniqueSemantics;
        private _hasFieldWithoutSemantic;
        private _isContainArray;
        private _isContainSampler;
        private _isContainPointer;
        private _isContainComplexType;
        constructor();
        public _toDeclString(): string;
        public toFinalCode(): string;
        public isBuiltIn(): bool;
        public setBuiltIn(isBuiltIn: bool): void;
        /**@inline*/ 
        public isBase(): bool;
        /**@inline*/ 
        public isArray(): bool;
        /**@inline*/ 
        public isNotBaseArray(): bool;
        /**@inline*/ 
        public isComplex(): bool;
        /**@inline*/ 
        public isEqual(pType: IAFXTypeInstruction): bool;
        /**@inline*/ 
        public isStrongEqual(pType: IAFXTypeInstruction): bool;
        /**@inline*/ 
        public isConst(): bool;
        public isSampler(): bool;
        public isSamplerCube(): bool;
        public isSampler2D(): bool;
        /**@inline*/ 
        public isWritable(): bool;
        /**@inline*/ 
        public isReadable(): bool;
        /**@inline*/ 
        public _containArray(): bool;
        /**@inline*/ 
        public _containSampler(): bool;
        /**@inline*/ 
        public _containPointer(): bool;
        /**@inline*/ 
        public _containComplexType(): bool;
        /**@inline*/ 
        public setName(sName: string): void;
        /**@inline*/ 
        public setRealName(sRealName: string): void;
        /**@inline*/ 
        public setSize(iSize: number): void;
        /**@inline*/ 
        public _canWrite(isWritable: bool): void;
        /**@inline*/ 
        public _canRead(isWritable: bool): void;
        public addField(pVariable: IAFXVariableDeclInstruction): void;
        public addFields(pFieldCollector: IAFXInstruction, isSetParent?: bool): void;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        public getHash(): string;
        public getStrongHash(): string;
        /**@inline*/ 
        public hasField(sFieldName: string): bool;
        public hasFieldWithSematic(sSemantic: string): bool;
        public hasAllUniqueSemantics(): bool;
        public hasFieldWithoutSemantic(): bool;
        /**@inline*/ 
        public getField(sFieldName: string): IAFXVariableDeclInstruction;
        public getFieldBySemantic(sSemantic: string): IAFXVariableDeclInstruction;
        /**@inline*/ 
        public getFieldType(sFieldName: string): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getFieldNameList(): string[];
        /**@inline*/ 
        public getSize(): number;
        /**@inline*/ 
        public getBaseType(): IAFXTypeInstruction;
        /**@inline*/ 
        public getArrayElementType(): IAFXTypeInstruction;
        public getTypeDecl(): IAFXTypeDeclInstruction;
        /**@inline*/ 
        public getLength(): number;
        public _getFieldDeclList(): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public clone(pRelationMap?: IAFXInstructionMap): ComplexTypeInstruction;
        public blend(pType: IAFXTypeInstruction, eMode: EAFXBlendMode): IAFXTypeInstruction;
        public _setCloneName(sName: string, sRealName: string): void;
        public _setCloneHash(sHash: string, sStrongHash: string): void;
        public _setCloneContain(isContainArray: bool, isContainSampler: bool): void;
        public _setCloneFields(pFieldDeclList: IAFXVariableDeclInstruction[], pFieldNameList: string[], pFieldDeclMap: IAFXVariableDeclMap): void;
        public _calcSize(): number;
        private calcHash();
        private calcStrongHash();
        private analyzeSemantics();
        private calculatePaddings();
    }
}
module akra.fx {
    class ExprInstruction extends TypedInstruction implements IAFXExprInstruction {
        /**@protected*/ 
        public _pLastEvalResult: any;
        /**
        * Respresent all kind of instruction
        */
        constructor();
        public evaluate(): bool;
        public simplify(): bool;
        public getEvalValue(): any;
        public isConst(): bool;
        public getType(): IAFXVariableTypeInstruction;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXExprInstruction;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    class IntInstruction extends ExprInstruction implements IAFXLiteralInstruction {
        private _iValue;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public setValue(iValue: number): void;
        public toString(): string;
        public toFinalCode(): string;
        public evaluate(): bool;
        /**@inline*/ 
        public isConst(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }
    class FloatInstruction extends ExprInstruction implements IAFXLiteralInstruction {
        private _fValue;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public setValue(fValue: number): void;
        public toString(): string;
        public toFinalCode(): string;
        public evaluate(): bool;
        /**@inline*/ 
        public isConst(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }
    class BoolInstruction extends ExprInstruction implements IAFXLiteralInstruction {
        private _bValue;
        private static _pBoolType;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public setValue(bValue: bool): void;
        public toString(): string;
        public toFinalCode(): string;
        public evaluate(): bool;
        /**@inline*/ 
        public isConst(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }
    class StringInstruction extends ExprInstruction implements IAFXLiteralInstruction {
        private _sValue;
        private static _pStringType;
        /**
        * EMPTY_OPERATOR EMPTY_ARGUMENTS
        */
        constructor();
        /**@inline*/ 
        public setValue(sValue: string): void;
        public toString(): string;
        public toFinalCode(): string;
        public evaluate(): bool;
        /**@inline*/ 
        public isConst(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXLiteralInstruction;
    }
    class IdExprInstruction extends ExprInstruction implements IAFXIdExprInstruction {
        private _pType;
        private _bToFinalCode;
        private _isInPassUnifoms;
        private _isInPassForeigns;
        /**@inline*/ 
        public isVisible(): bool;
        constructor();
        public getType(): IAFXVariableTypeInstruction;
        public isConst(): bool;
        public evaluate(): bool;
        public prepareFor(eUsedMode: EFunctionType): void;
        public toFinalCode(): string;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXIdExprInstruction;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent someExpr + / - * % someExpr
    * (+|-|*|/|%) Instruction Instruction
    */
    class ArithmeticExprInstruction extends ExprInstruction {
        constructor();
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
        public evaluate(): bool;
        public toFinalCode(): string;
    }
    /**
    * Represent someExpr = += -= /= *= %= someExpr
    * (=|+=|-=|*=|/=|%=) Instruction Instruction
    */
    class AssignmentExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent someExpr == != < > <= >= someExpr
    * (==|!=|<|>|<=|>=) Instruction Instruction
    */
    class RelationalExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent boolExpr && || boolExpr
    * (&& | ||) Instruction Instruction
    */
    class LogicalExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represen boolExpr ? someExpr : someExpr
    * EMPTY_OPERATOR Instruction Instruction Instruction
    */
    class ConditionalExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent (type) expr
    * EMPTY_OPERATOR VariableTypeInstruction Instruction
    */
    class CastExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent + - ! ++ -- expr
    * (+|-|!|++|--|) Instruction
    */
    class UnaryExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent someExpr[someIndex]
    * EMPTY_OPERATOR Instruction ExprInstruction
    */
    class PostfixIndexInstruction extends ExprInstruction {
        private _pSamplerArrayDecl;
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    class PostfixPointInstruction extends ExprInstruction {
        private _bToFinalFirst;
        private _bToFinalSecond;
        constructor();
        public prepareFor(eUsedMode: EFunctionType): void;
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent someExpr ++
    * (-- | ++) Instruction
    */
    class PostfixArithmeticInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent @ Expr
    * @ Instruction
    */
    class PrimaryExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent (expr)
    * EMPTY_OPERATOR ExprInstruction
    */
    class ComplexExprInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Respresnt func(arg1,..., argn)
    * EMPTY_OPERATOR IdExprInstruction ExprInstruction ... ExprInstruction
    */
    class FunctionCallInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public getFunction(): IAFXFunctionDeclInstruction;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Respresnt system_func(arg1,..., argn)
    * EMPTY_OPERATOR SimpleInstruction ... SimpleInstruction
    */
    class SystemCallInstruction extends ExprInstruction {
        private _pSystemFunction;
        private _pSamplerDecl;
        constructor();
        public toFinalCode(): string;
        public setSystemCallFunction(pFunction: IAFXFunctionDeclInstruction): void;
        public setInstructions(pInstructionList: IAFXInstruction[]): void;
        public fillByArguments(pArguments: IAFXInstruction[]): void;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
        public clone(pRelationMap?: IAFXInstructionMap): SystemCallInstruction;
    }
    /**
    * Respresnt ctor(arg1,..., argn)
    * EMPTY_OPERATOR IdInstruction ExprInstruction ... ExprInstruction
    */
    class ConstructorCallInstruction extends ExprInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represetn compile vs_func(...args)
    * compile IdExprInstruction ExprInstruction ... ExprInstruction
    */
    class CompileExprInstruction extends ExprInstruction {
        constructor();
        /**@inline*/ 
        public getFunction(): IAFXFunctionDeclInstruction;
    }
    class MemExprInstruction extends ExprInstruction {
        private _pBuffer;
        constructor();
        public getBuffer(): IAFXVariableDeclInstruction;
        public setBuffer(pBuffer: IAFXVariableDeclInstruction): void;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    class InitExprInstruction extends ExprInstruction implements IAFXInitExprInstruction {
        private _pConstructorType;
        constructor();
        public toFinalCode(): string;
        public optimizeForVariableType(pType: IAFXVariableTypeInstruction): bool;
    }
    /**
    * Represetn sampler_state { states }
    */
    class SamplerStateBlockInstruction extends ExprInstruction {
        private _pTexture;
        private _pSamplerParams;
        constructor();
        public addState(sStateType: string, sStateValue: string): void;
        public setTexture(pTexture: IAFXVariableDeclInstruction): void;
        /**@inline*/ 
        public getTexture(): IAFXVariableDeclInstruction;
    }
    class ExtractExprInstruction extends ExprInstruction {
        private _eExtractExprType;
        private _pPointer;
        private _pBuffer;
        private _pOffsetVar;
        private _sPaddingExpr;
        private _sExtractFunction;
        private _bNeedSecondBracket;
        constructor();
        public getExtractFunction(): IAFXFunctionDeclInstruction;
        public initExtractExpr(pExtractType: IAFXVariableTypeInstruction, pPointer: IAFXVariableDeclInstruction, pBuffer: IAFXVariableDeclInstruction, sPaddingExpr: string, pOffsetVar: IAFXVariableDeclInstruction): void;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
        public toFinalCode(): string;
        public clone(pRelationMap?: IAFXInstructionMap): ExtractExprInstruction;
        public _setCloneParams(pPointer: IAFXVariableDeclInstruction, pBuffer: IAFXVariableDeclInstruction, eExtractExprType: EExtractExprType, sPaddingExpr: string, sExtractFunction: string, bNeedSecondBracket: bool): void;
    }
}
module akra.fx {
    class VariableDeclInstruction extends DeclInstruction implements IAFXVariableDeclInstruction {
        private _isVideoBuffer;
        private _pVideoBufferSampler;
        private _pVideoBufferHeader;
        private _pFullNameExpr;
        private _bDefineByZero;
        private _pSubDeclList;
        private _bShaderOutput;
        private _pAttrOffset;
        private _pAttrExtractionBlock;
        private _pValue;
        private _bLockInitializer;
        /**
        * Represent type var_name [= init_expr]
        * EMPTY_OPERATOR VariableTypeInstruction IdInstruction InitExprInstruction
        */
        constructor();
        /**@inline*/ 
        public hasInitializer(): bool;
        /**@inline*/ 
        public getInitializeExpr(): IAFXInitExprInstruction;
        /**@inline*/ 
        public lockInitializer(): void;
        /**@inline*/ 
        public unlockInitializer(): void;
        public getDefaultValue(): any;
        public getValue(): any;
        public setValue(pValue: any): any;
        /**@inline*/ 
        public getType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public setType(pType: IAFXVariableTypeInstruction): void;
        public setName(sName: string): void;
        public setRealName(sRealName: string): void;
        public setVideoBufferRealName(sSampler: string, sHeader: string): void;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        /**@inline*/ 
        public getNameId(): IAFXIdInstruction;
        /**@inline*/ 
        public isUniform(): bool;
        public isField(): bool;
        /**@inline*/ 
        public isPointer(): bool;
        public isVideoBuffer(): bool;
        /**@inline*/ 
        public isSampler(): bool;
        /**@inline*/ 
        public getSubVarDecls(): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public isDefinedByZero(): bool;
        /**@inline*/ 
        public defineByZero(isDefine: bool): void;
        public toFinalCode(): string;
        /**@inline*/ 
        public _markAsVarying(bValue: bool): void;
        /**@inline*/ 
        public _markAsShaderOutput(isShaderOutput: bool): void;
        /**@inline*/ 
        public _isShaderOutput(): bool;
        public _setAttrExtractionBlock(pCodeBlock: IAFXInstruction): void;
        public _getAttrExtractionBlock(): IAFXInstruction;
        public _getFullNameExpr(): IAFXExprInstruction;
        public _getFullName(): string;
        public _getVideoBufferSampler(): IAFXVariableDeclInstruction;
        public _getVideoBufferHeader(): IAFXVariableDeclInstruction;
        public _getVideoBufferInitExpr(): IAFXInitExprInstruction;
        /**@inline*/ 
        public _setCollapsed(bValue: bool): void;
        /**@inline*/ 
        public _isCollapsed(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXVariableDeclInstruction;
        public blend(pVariableDecl: IAFXVariableDeclInstruction, eMode: EAFXBlendMode): IAFXVariableDeclInstruction;
    }
}
module akra.fx {
    /**
    * Represent all kind of statements
    */
    class StmtInstruction extends Instruction implements IAFXStmtInstruction {
        constructor();
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent {stmts}
    * EMPTY_OPERATOR StmtInstruction ... StmtInstruction
    */
    class StmtBlockInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Represent expr;
    * EMPTY_OPERTOR ExprInstruction
    */
    class ExprStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Reprsernt continue; break; discard;
    * (continue || break || discard)
    */
    class BreakStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Represent while(expr) stmt
    * ( while || do_while) ExprInstruction StmtInstruction
    */
    class WhileStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Represent for(forInit forCond ForStep) stmt
    * for ExprInstruction or VarDeclInstruction ExprInstruction ExprInstruction StmtInstruction
    */
    class ForStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
        public check(eStage: ECheckStage, pInfo?: any): bool;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent if(expr) stmt or if(expr) stmt else stmt
    * ( if || if_else ) Expr Stmt [Stmt]
    */
    class IfStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
    /**
    * Represent TypeDecl or VariableDecl or VarStructDecl
    * EMPTY DeclInstruction
    */
    class DeclStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
    }
    /**
    * Represent return expr;
    * return ExprInstruction
    */
    class ReturnStmtInstruction extends StmtInstruction {
        private _pPreparedCode;
        private _isPositionReturn;
        private _isColorReturn;
        private _isOnlyReturn;
        constructor();
        public prepareFor(eUsedMode: EFunctionType): void;
        public toFinalCode(): string;
    }
    class ExtractStmtInstruction extends ExprInstruction {
        private _pExtractInVar;
        private _pExtractInExpr;
        private _pExtactExpr;
        constructor();
        public generateStmtForBaseType(pVarDecl: IAFXVariableDeclInstruction, pPointer: IAFXVariableDeclInstruction, pBuffer: IAFXVariableDeclInstruction, iPadding: number, pOffset?: IAFXVariableDeclInstruction): void;
        public toFinalCode(): string;
        public addUsedData(pUsedDataCollector: IAFXTypeUseInfoMap, eUsedMode?: EVarUsedMode): void;
        public getExtractFunction(): IAFXFunctionDeclInstruction;
    }
    /**
    * Represent empty statement only semicolon ;
    * ;
    */
    class SemicolonStmtInstruction extends StmtInstruction {
        constructor();
        public toFinalCode(): string;
    }
}
module akra.fx {
    /**
    * Represent type func(...args)[:Semantic] [<Annotation> {stmts}]
    * EMPTY_OPERTOR FunctionDefInstruction StmtBlockInstruction
    */
    class FunctionDeclInstruction extends DeclInstruction implements IAFXFunctionDeclInstruction {
        /**@protected*/ 
        public _pFunctionDefenition: FunctionDefInstruction;
        /**@protected*/ 
        public _pImplementation: StmtBlockInstruction;
        /**@protected*/ 
        public _eFunctionType: EFunctionType;
        /**@protected*/ 
        public _bUsedAsFunction: bool;
        /**@protected*/ 
        public _bUsedAsVertex: bool;
        /**@protected*/ 
        public _bUsedAsPixel: bool;
        /**@protected*/ 
        public _bCanUsedAsFunction: bool;
        /**@protected*/ 
        public _bUsedInVertex: bool;
        /**@protected*/ 
        public _bUsedInPixel: bool;
        /**@protected*/ 
        public _pParseNode: IParseNode;
        /**@protected*/ 
        public _iImplementationScope: number;
        /**@protected*/ 
        public _isInBlackList: bool;
        /**@protected*/ 
        public _pOutVariable: IAFXVariableDeclInstruction;
        /**@protected*/ 
        public _pUsedFunctionMap: IAFXFunctionDeclMap;
        /**@protected*/ 
        public _pUsedFunctionList: IAFXFunctionDeclInstruction[];
        /**@protected*/ 
        public _pAttributeVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pVaryingVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pUsedVarTypeMap: IAFXTypeUseInfoMap;
        /**@protected*/ 
        public _pSharedVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pGlobalVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pUniformVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pForeignVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pTextureVariableMap: IAFXVariableDeclMap;
        /**@protected*/ 
        public _pUsedComplexTypeMap: IAFXTypeMap;
        /**@protected*/ 
        public _pAttributeVariableKeys: number[];
        /**@protected*/ 
        public _pVaryingVariableKeys: number[];
        /**@protected*/ 
        public _pSharedVariableKeys: number[];
        /**@protected*/ 
        public _pUniformVariableKeys: number[];
        /**@protected*/ 
        public _pForeignVariableKeys: number[];
        /**@protected*/ 
        public _pGlobalVariableKeys: number[];
        /**@protected*/ 
        public _pTextureVariableKeys: number[];
        /**@protected*/ 
        public _pUsedComplexTypeKeys: number[];
        /**@protected*/ 
        public _pVertexShader: IAFXFunctionDeclInstruction;
        /**@protected*/ 
        public _pPixelShader: IAFXFunctionDeclInstruction;
        private _pExtSystemTypeList;
        private _pExtSystemFunctionList;
        private _pExtSystemMacrosList;
        constructor();
        public toFinalCode(): string;
        public toFinalDefCode(): string;
        /**@inline*/ 
        public getType(): IAFXTypeInstruction;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        /**@inline*/ 
        public getNameId(): IAFXIdInstruction;
        public getArguments(): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public getNumNeededArguments(): number;
        /**@inline*/ 
        public hasImplementation(): bool;
        /**@inline*/ 
        public getReturnType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getFunctionType(): EFunctionType;
        /**@inline*/ 
        public setFunctionType(eFunctionType: EFunctionType): void;
        /**@inline*/ 
        public _setImplementationScope(iScope: number): void;
        /**@inline*/ 
        public _getImplementationScope(): number;
        /**@inline*/ 
        public _setParseNode(pNode: IParseNode): void;
        /**@inline*/ 
        public _getParseNode(): IParseNode;
        public setFunctionDef(pFunctionDef: IAFXDeclInstruction): void;
        public setImplementation(pImplementation: IAFXStmtInstruction): void;
        public clone(pRelationMap?: IAFXInstructionMap): IAFXFunctionDeclInstruction;
        public _addOutVariable(pVariable: IAFXVariableDeclInstruction): bool;
        public _getOutVariable(): IAFXVariableDeclInstruction;
        public _getVertexShader(): IAFXFunctionDeclInstruction;
        public _getPixelShader(): IAFXFunctionDeclInstruction;
        public _markUsedAs(eUsedType: EFunctionType): void;
        public _isUsedAs(eUsedType: EFunctionType): bool;
        public _isUsedAsFunction(): bool;
        public _isUsedAsVertex(): bool;
        public _isUsedAsPixel(): bool;
        public _markUsedInVertex(): void;
        public _markUsedInPixel(): void;
        public _isUsedInVertex(): bool;
        public _isUsedInPixel(): bool;
        public _isUsed(): bool;
        public _checkVertexUsage(): bool;
        public _checkPixelUsage(): bool;
        public _checkDefenitionForVertexUsage(): bool;
        public _checkDefenitionForPixelUsage(): bool;
        public _canUsedAsFunction(): bool;
        public _notCanUsedAsFunction(): void;
        public _addUsedFunction(pFunction: IAFXFunctionDeclInstruction): bool;
        public _addUsedVariable(pVariable: IAFXVariableDeclInstruction): void;
        public _getUsedFunctionList(): IAFXFunctionDeclInstruction[];
        public _isBlackListFunction(): bool;
        public _addToBlackList(): void;
        public _getStringDef(): string;
        public _convertToVertexShader(): IAFXFunctionDeclInstruction;
        public _convertToPixelShader(): IAFXFunctionDeclInstruction;
        public _prepareForVertex(): void;
        public _prepareForPixel(): void;
        public _setOutVariable(pVar: IAFXVariableDeclInstruction): void;
        public _setUsedFunctions(pUsedFunctionMap: IAFXFunctionDeclMap, pUsedFunctionList: IAFXFunctionDeclInstruction[]): void;
        public _setUsedVariableData(pUsedVarTypeMap: IAFXTypeUseInfoMap, pSharedVariableMap: IAFXVariableDeclMap, pGlobalVariableMap: IAFXVariableDeclMap, pUniformVariableMap: IAFXVariableDeclMap, pForeignVariableMap: IAFXVariableDeclMap, pTextureVariableMap: IAFXVariableDeclMap, pUsedComplexTypeMap: IAFXTypeMap): void;
        public _initAfterClone(): void;
        public _generateInfoAboutUsedData(): void;
        /**@inline*/ 
        public _getAttributeVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getVaryingVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getSharedVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getGlobalVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUniformVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getForeignVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getTextureVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUsedComplexTypeMap(): IAFXTypeMap;
        public _getAttributeVariableKeys(): number[];
        public _getVaryingVariableKeys(): number[];
        public _getSharedVariableKeys(): number[];
        public _getUniformVariableKeys(): number[];
        public _getForeignVariableKeys(): number[];
        public _getGlobalVariableKeys(): number[];
        public _getTextureVariableKeys(): number[];
        public _getUsedComplexTypeKeys(): number[];
        public _getExtSystemFunctionList(): IAFXFunctionDeclInstruction[];
        public _getExtSystemMacrosList(): IAFXSimpleInstruction[];
        public _getExtSystemTypeList(): IAFXTypeDeclInstruction[];
        private generatesVertexAttrubutes();
        private generateVertexVaryings();
        private generatePixelVaryings();
        private cloneVarTypeUsedMap(pMap, pRelationMap);
        private cloneVarDeclMap(pMap, pRelationMap);
        private cloneTypeMap(pMap, pRelationMap);
        private addGlobalVariableType(pVariableType, isWrite, isRead);
        private addUniformParameter(pType);
        private addUsedComplexType(pType);
        private addUsedInfoFromFunction(pFunction);
        private addExtSystemFunction(pFunction);
        private isVariableTypeUse(pVariableType);
        private generateExtractBlockForAttribute(pAttr);
        private generateExtractStmtFromPointer(pPointer, pOffset, iDepth, pCollector);
        private generateExtractStmtForComplexVar(pVarDecl, pOffset, iDepth, pCollector, pPointer, pBuffer, iPadding);
        private createOffsetForAttr(pAttr);
    }
    class SystemFunctionInstruction extends DeclInstruction implements IAFXFunctionDeclInstruction {
        private _pExprTranslator;
        private _pName;
        private _pReturnType;
        private _pArguments;
        private _sDefinition;
        private _sImplementation;
        private _pExtSystemTypeList;
        private _pExtSystemFunctionList;
        private _pExtSystemMacrosList;
        constructor(sName: string, pReturnType: IAFXTypeInstruction, pExprTranslator: ExprTemplateTranslator, pArgumentTypes: IAFXTypeInstruction[]);
        public setDeclCode(sDefenition: string, sImplementation: string): void;
        public toFinalCode(): string;
        public toFinalDefCode(): string;
        public setUsedSystemData(pTypeList: IAFXTypeDeclInstruction[], pFunctionList: IAFXFunctionDeclInstruction[], pMacrosList: IAFXSimpleInstruction[]): void;
        public closeSystemDataInfo(): void;
        public setExprTranslator(pExprTranslator: ExprTemplateTranslator): void;
        public getNameId(): IAFXIdInstruction;
        public getArguments(): IAFXTypedInstruction[];
        /**@inline*/ 
        public getNumNeededArguments(): number;
        /**@inline*/ 
        public hasImplementation(): bool;
        /**@inline*/ 
        public getType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getReturnType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public getFunctionType(): EFunctionType;
        /**@inline*/ 
        public setFunctionType(eFunctionType: EFunctionType): void;
        public closeArguments(pArguments: IAFXInstruction[]): IAFXInstruction[];
        public setFunctionDef(pFunctionDef: IAFXDeclInstruction): void;
        public setImplementation(pImplementation: IAFXStmtInstruction): void;
        /**@inline*/ 
        public clone(pRelationMap?: IAFXInstructionMap): SystemFunctionInstruction;
        public _addOutVariable(pVariable: IAFXVariableDeclInstruction): bool;
        public _getOutVariable(): IAFXVariableDeclInstruction;
        public _getVertexShader(): IAFXFunctionDeclInstruction;
        public _getPixelShader(): IAFXFunctionDeclInstruction;
        public _markUsedAs(eUsedType: EFunctionType): void;
        public _isUsedAs(eUsedType: EFunctionType): bool;
        public _isUsedAsFunction(): bool;
        public _isUsedAsVertex(): bool;
        public _isUsedAsPixel(): bool;
        public _markUsedInVertex(): void;
        public _markUsedInPixel(): void;
        public _isUsedInVertex(): bool;
        public _isUsedInPixel(): bool;
        public _isUsed(): bool;
        public _checkVertexUsage(): bool;
        public _checkPixelUsage(): bool;
        public _checkDefenitionForVertexUsage(): bool;
        public _checkDefenitionForPixelUsage(): bool;
        public _canUsedAsFunction(): bool;
        public _notCanUsedAsFunction(): void;
        public _addUsedFunction(pFunction: IAFXFunctionDeclInstruction): bool;
        public _addUsedVariable(pVariable: IAFXVariableDeclInstruction): void;
        public _getUsedFunctionList(): IAFXFunctionDeclInstruction[];
        public _isBlackListFunction(): bool;
        public _addToBlackList(): void;
        public _getStringDef(): string;
        public _convertToVertexShader(): IAFXFunctionDeclInstruction;
        public _convertToPixelShader(): IAFXFunctionDeclInstruction;
        public _prepareForVertex(): void;
        public _prepareForPixel(): void;
        public addUsedVariableType(pType: IAFXVariableTypeInstruction, eUsedMode: EVarUsedMode): bool;
        public _generateInfoAboutUsedData(): void;
        /**@inline*/ 
        public _getAttributeVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getVaryingVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getSharedVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getGlobalVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUniformVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getForeignVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getTextureVariableMap(): IAFXVariableDeclMap;
        /**@inline*/ 
        public _getUsedComplexTypeMap(): IAFXTypeMap;
        /**@inline*/ 
        public _getAttributeVariableKeys(): number[];
        /**@inline*/ 
        public _getVaryingVariableKeys(): number[];
        /**@inline*/ 
        public _getSharedVariableKeys(): number[];
        /**@inline*/ 
        public _getUniformVariableKeys(): number[];
        /**@inline*/ 
        public _getForeignVariableKeys(): number[];
        /**@inline*/ 
        public _getGlobalVariableKeys(): number[];
        /**@inline*/ 
        public _getTextureVariableKeys(): number[];
        /**@inline*/ 
        public _getUsedComplexTypeKeys(): number[];
        public _getExtSystemFunctionList(): IAFXFunctionDeclInstruction[];
        public _getExtSystemMacrosList(): IAFXSimpleInstruction[];
        public _getExtSystemTypeList(): IAFXTypeDeclInstruction[];
    }
    /**
    * Represent type func(...args)[:Semantic]
    * EMPTY_OPERTOR VariableTypeInstruction IdInstruction VarDeclInstruction ... VarDeclInstruction
    */
    class FunctionDefInstruction extends DeclInstruction {
        private _pParameterList;
        private _pParamListForShaderCompile;
        private _pParamListForShaderInput;
        private _isComplexShaderInput;
        private _pReturnType;
        private _pFunctionName;
        private _nParamsNeeded;
        private _sDefinition;
        private _isAnalyzedForVertexUsage;
        private _isAnalyzedForPixelUsage;
        private _bCanUsedAsFunction;
        private _bShaderDef;
        constructor();
        public toFinalCode(): string;
        /**@inline*/ 
        public setType(pType: IAFXTypeInstruction): void;
        /**@inline*/ 
        public getType(): IAFXTypeInstruction;
        /**@inline*/ 
        public setReturnType(pReturnType: IAFXVariableTypeInstruction): bool;
        /**@inline*/ 
        public getReturnType(): IAFXVariableTypeInstruction;
        /**@inline*/ 
        public setFunctionName(pNameId: IAFXIdInstruction): bool;
        /**@inline*/ 
        public getName(): string;
        /**@inline*/ 
        public getRealName(): string;
        /**@inline*/ 
        public getNameId(): IAFXIdInstruction;
        /**@inline*/ 
        public getArguments(): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public getNumNeededArguments(): number;
        /**@inline*/ 
        public markAsShaderDef(isShaderDef: bool): void;
        /**@inline*/ 
        public isShaderDef(): bool;
        public addParameter(pParameter: IAFXVariableDeclInstruction, isStrictModeOn?: bool): bool;
        /**@inline*/ 
        public getParameListForShaderInput(): IAFXVariableDeclInstruction[];
        /**@inline*/ 
        public isComplexShaderInput(): bool;
        public clone(pRelationMap?: IAFXInstructionMap): FunctionDefInstruction;
        public _setShaderParams(pParamList: IAFXVariableDeclInstruction[], isComplexInput: bool): void;
        public _setAnalyzedInfo(isAnalyzedForVertexUsage: bool, isAnalyzedForPixelUsage: bool, bCanUsedAsFunction: bool): void;
        public _getStringDef(): string;
        public _canUsedAsFunction(): bool;
        public _checkForVertexUsage(): bool;
        public _checkForPixelUsage(): bool;
        private checkReturnTypeForVertexUsage();
        private checkReturnTypeForPixelUsage();
        private checkArgumentsForVertexUsage();
        private checkArgumentsForPixelUsage();
    }
}
module akra.fx {
    interface SystemTypeMap {
        [sTypeName: string]: SystemTypeInstruction;
    }
    interface SystemFunctionMap {
        [sFuncName: string]: SystemFunctionInstruction[];
    }
    interface TechniqueMap {
        [sTechniqueName: string]: IAFXTechniqueInstruction;
    }
    class Effect implements IAFXEffect {
        private _pComposer;
        private _pParseTree;
        private _pAnalyzedNode;
        private _pEffectScope;
        private _pCurrentInstruction;
        private _pCurrentFunction;
        private _pStatistics;
        private _sAnalyzedFileName;
        private _pSystemMacros;
        private _pSystemTypes;
        private _pSystemFunctionsMap;
        private _pSystemFunctionHashMap;
        private _pSystemVariables;
        private _pPointerForExtractionList;
        private _pFunctionWithImplementationList;
        private _pTechniqueList;
        private _pTechniqueMap;
        private _isAnalyzeInPass;
        private _sProvideNameSpace;
        private _pGlobalComponentList;
        private _pGlobalComponetShiftList;
        private _pAddedTechniqueList;
        static pSystemMacros: IAFXSimpleInstructionMap;
        static pSystemTypes: SystemTypeMap;
        static pSystemFunctions: SystemFunctionMap;
        static pSystemVariables: IAFXVariableDeclMap;
        static pSystemVertexOut: ComplexTypeInstruction;
        constructor(pComposer: IAFXComposer);
        public analyze(pTree: IParseTree): bool;
        public getStats(): IAFXEffectStats;
        public setAnalyzedFileName(sFileName: string): void;
        public clear(): void;
        /**@inline*/ 
        public getTechniqueList(): IAFXTechniqueInstruction[];
        static getBaseVertexOutType(): ComplexTypeInstruction;
        static getSystemType(sTypeName: string): SystemTypeInstruction;
        static getSystemVariable(sName: string): IAFXVariableDeclInstruction;
        static getSystemMacros(sName: string): IAFXSimpleInstruction;
        static findSystemFunction(sFunctionName: string, pArguments: IAFXTypedInstruction[]): IAFXFunctionDeclInstruction;
        static createVideoBufferVariable(): IAFXVariableDeclInstruction;
        private generateSuffixLiterals(pLiterals, pOutput, iDepth?);
        private initSystemMacros();
        private initSystemTypes();
        private initSystemFunctions();
        private initSystemVariables();
        private addSystemMacros();
        private addSystemVariables();
        private generateSystemVariable(sName, sRealName, sTypeName, isForVertex, isForPixel, isOnlyRead);
        private generatePassEngineVariable();
        private generateBaseVertexOutput();
        private addSystemFunctions();
        private generateSystemFunction(sName, sTranslationExpr, sReturnTypeName, pArgumentsTypes, pTemplateTypes, isForVertex?, isForPixel?);
        private generateSystemMacros(sMacrosName, sMacrosCode);
        private generateNotBuiltInSystemFuction(sName, sDefenition, sImplementation, sReturnType, pUsedTypes, pUsedFunctions, pUsedMacros);
        private generateSystemType(sName, sRealName, iSize?, isArray?, pElementType?, iLength?);
        private generateNotBuildtInSystemType(sName, sRealName, sDeclString, iSize?, isArray?, pElementType?, iLength?);
        private addSystemTypeScalar();
        private addSystemTypeVector();
        private addSystemTypeMatrix();
        private addFieldsToVectorFromSuffixObject(pSuffixMap, pType, sBaseType);
        /**@inline*/ 
        private getVariable(sName);
        /**@inline*/ 
        private hasVariable(sName);
        private getType(sTypeName);
        private isSystemFunction(pFunction);
        private isSystemVariable(pVariable);
        private isSystemType(pType);
        /**@inline*/ 
        private _errorFromInstruction(pError);
        private _error(eCode, pInfo?);
        /**@inline*/ 
        private setAnalyzedNode(pNode);
        /**@inline*/ 
        private getAnalyzedNode();
        /**@inline*/ 
        private isStrictMode();
        /**@inline*/ 
        private setStrictModeOn();
        /**@inline*/ 
        private newScope(eScopeType?);
        /**@inline*/ 
        private resumeScope();
        /**@inline*/ 
        private getScope();
        /**@inline*/ 
        private setScope(iScope);
        /**@inline*/ 
        private endScope();
        /**@inline*/ 
        private getScopeType();
        /**@inline*/ 
        private setCurrentAnalyzedFunction(pFunction);
        /**@inline*/ 
        private getCurrentAnalyzedFunction();
        /**@inline*/ 
        private isAnalzeInPass();
        /**@inline*/ 
        private setAnalyzeInPass(isInPass);
        /**@inline*/ 
        private setOperator(sOperator);
        /**@inline*/ 
        private clearPointersForExtract();
        /**@inline*/ 
        private addPointerForExtract(pPointer);
        /**@inline*/ 
        private getPointerForExtractList();
        private findFunction(sFunctionName, pArguments);
        private findConstructor(pType, pArguments);
        private findShaderFunction(sFunctionName, pArguments);
        private findFunctionByDef(pDef);
        private addVariableDecl(pVariable);
        private addTypeDecl(pType);
        private addFunctionDecl(pFunction);
        private addTechnique(pTechnique);
        private addExternalSharedVariable(pVariable, eShaderType);
        private analyzeGlobalUseDecls();
        private analyzeGlobalProvideDecls();
        private analyzeGlobalTypeDecls();
        private analyzeFunctionDefinitions();
        private analyzeGlobalImports();
        private analyzeTechniqueImports();
        private analyzeVariableDecls();
        private analyzeFunctionDecls();
        private analyzeTechniques();
        private checkFunctionsForRecursion();
        private checkFunctionForCorrectUsage();
        private generateInfoAboutUsedData();
        private generateShadersFromFunctions();
        private analyzeVariableDecl(pNode, pInstruction?);
        private analyzeUsageType(pNode);
        private analyzeType(pNode);
        private analyzeUsage(pNode);
        private analyzeVariable(pNode, pGeneralType);
        private analyzeVariableDim(pNode, pVariableDecl);
        private analyzeAnnotation(pNode);
        private analyzeSemantic(pNode);
        private analyzeInitializer(pNode);
        private analyzeFromExpr(pNode);
        private analyzeInitExpr(pNode);
        private analyzeExpr(pNode);
        private analyzeObjectExpr(pNode);
        private analyzeCompileExpr(pNode);
        private analyzeSamplerStateBlock(pNode);
        private analyzeSamplerState(pNode, pSamplerStates);
        private analyzeComplexExpr(pNode);
        private analyzeFunctionCallExpr(pNode);
        private analyzeConstructorCallExpr(pNode);
        private analyzeSimpleComplexExpr(pNode);
        private analyzePrimaryExpr(pNode);
        private analyzePostfixExpr(pNode);
        private analyzePostfixIndex(pNode);
        private analyzePostfixPoint(pNode);
        private analyzePostfixArithmetic(pNode);
        private analyzeUnaryExpr(pNode);
        private analyzeCastExpr(pNode);
        private analyzeConditionalExpr(pNode);
        private analyzeArithmeticExpr(pNode);
        private analyzeRelationExpr(pNode);
        private analyzeLogicalExpr(pNode);
        private analyzeAssignmentExpr(pNode);
        private analyzeIdExpr(pNode);
        private analyzeSimpleExpr(pNode);
        private analyzeMemExpr(pNode);
        private analyzeConstTypeDim(pNode);
        private analyzeVarStructDecl(pNode, pInstruction?);
        private analyzeUsageStructDecl(pNode);
        private analyzeTypeDecl(pNode, pParentInstruction?);
        private analyzeStructDecl(pNode);
        private analyzeStruct(pNode);
        private analyzeFunctionDeclOnlyDefinition(pNode);
        private resumeFunctionAnalysis(pAnalzedFunction);
        private analyzeFunctionDef(pNode);
        private analyzeParamList(pNode, pFunctionDef);
        private analyzeParameterDecl(pNode);
        private analyzeParamUsageType(pNode);
        private analyzeStmtBlock(pNode);
        private analyzeStmt(pNode);
        private analyzeSimpleStmt(pNode);
        private analyzeReturnStmt(pNode);
        private analyzeBreakStmt(pNode);
        private analyzeDeclStmt(pNode);
        private analyzeExprStmt(pNode);
        private analyzeWhileStmt(pNode);
        private analyzeIfStmt(pNode);
        private analyzeNonIfStmt(pNode);
        private analyzeForStmt(pNode);
        private analyzeForInit(pNode, pForStmtInstruction);
        private analyzeForCond(pNode, pForStmtInstruction);
        private analyzeForStep(pNode, pForStmtInstruction);
        private analyzeUseDecl(pNode);
        private analyzeTechniqueForImport(pNode);
        private analyzeComplexName(pNode);
        private analyzeTechniqueBodyForImports(pNode, pTechnique);
        private analyzePassDeclForImports(pNode, pTechnique);
        private analyzePassStateBlockForShaders(pNode, pPass);
        private analyzePassStateForShader(pNode, pPass);
        private analyzePassStateIfForShader(pNode, pPass);
        private analyzePassStateSwitchForShader(pNode, pPass);
        private analyzePassCaseBlockForShader(pNode, pPass);
        private analyzePassCaseStateForShader(pNode, pPass);
        private analyzePassDefaultStateForShader(pNode, pPass);
        private resumeTechniqueAnalysis(pTechnique);
        private resumePassAnalysis(pPass);
        private analyzePassStateBlock(pNode, pPass);
        private analyzePassState(pNode, pPass);
        private analyzePassStateIf(pNode, pPass);
        private analyzePassStateSwitch(pNode, pPass);
        private analyzePassCaseBlock(pNode, pPass);
        private analyzePassCaseState(pNode, pPass);
        private analyzePassDefault(pNode, pPass);
        private analyzeImportDecl(pNode, pTechnique?);
        private analyzeProvideDecl(pNode);
        private analyzeShiftOpt(pNode);
        private addComponent(pComponent, iShift, pTechnique);
        private isAddedTechnique(pTechnique);
        /**
        * Проверят возможность использования оператора между двумя типами.
        * Возращает тип получаемый в результате приминения опрератора, или, если применить его невозможно - null.
        *
        * @sOperator {string} Один из операторов: + - * / % += -= *= /= %= = < > <= >= == != =
        * @pLeftType {IAFXVariableTypeInstruction} Тип левой части выражения
        * @pRightType {IAFXVariableTypeInstruction} Тип правой части выражения
        */
        private checkTwoOperandExprTypes(sOperator, pLeftType, pRightType);
        /**
        * Проверят возможность использования оператора к типу данных.
        * Возращает тип получаемый в результате приминения опрератора, или, если применить его невозможно - null.
        *
        * @sOperator {string} Один из операторов: + - ! ++ --
        * @pLeftType {IAFXVariableTypeInstruction} Тип операнда
        */
        private checkOneOperandExprType(sOperator, pType);
        private isAssignmentOperator(sOperator);
        private isArithmeticalOperator(sOperator);
        private isRelationalOperator(sOperator);
        private isEqualOperator(sOperator);
        private isMatrixType(pType);
        private isVectorType(pType);
        private isScalarType(pType);
        private isFloatBasedType(pType);
        private isIntBasedType(pType);
        private isBoolBasedType(pType);
        private isSamplerType(pType);
        private addExtactionStmts(pStmt);
        private generateExtractStmtFromPointer(pPointer, pParentStmt);
        private generateExtractStmtForComplexVar(pVarDecl, pParentStmt, pPointer, pBuffer, iPadding);
        private getNodeSourceLocation(pNode);
    }
}
module akra {
    interface IAFXBlender {
        addComponentToBlend(pComponentBlend: IAFXComponentBlend, pComponent: IAFXComponent, iShift: number, iPass: number): IAFXComponentBlend;
        removeComponentFromBlend(pComponentBlend: IAFXComponentBlend, pComponent: IAFXComponent, iShift: number, iPass: number): IAFXComponentBlend;
        addBlendToBlend(pComponentBlend: IAFXComponentBlend, pAddBlend: IAFXComponentBlend, iShift: number): IAFXComponentBlend;
        generatePassBlend(pPassList: IAFXPassInstruction[], pStates: any, pForeigns: any, pUniforms: any): IAFXPassBlend;
        getPassBlendById(id: number): IAFXPassBlend;
    }
}
module akra.fx {
    class TexcoordSwapper {
        /**@protected*/ 
        public _pTmpToTex: string[];
        /**@protected*/ 
        public _pTexToTmp: string[];
        /**@protected*/ 
        public _pTexcoords: number[];
        /**@protected*/ 
        public _sTmpToTexCode: string;
        /**@protected*/ 
        public _sTexToTmpCode: string;
        /**@protected*/ 
        public _iMaxTexcoords: number;
        constructor();
        /**@inline*/ 
        public getTmpDeclCode(): string;
        /**@inline*/ 
        public getTecoordSwapCode(): string;
        public clear(): void;
        public generateSwapCode(pMaterial: core.pool.resources.SurfaceMaterial, pAttrConatiner: AttributeBlendContainer): void;
    }
}
module akra.fx {
    /**@inline*/ 
    function createSamplerState(): IAFXSamplerState;
    interface IAFXShaderVarTypeMap {
        [index: string]: EAFXShaderVariableType;
        [index: number]: EAFXShaderVariableType;
    }
    class PassInputBlend implements IAFXPassInputBlend {
        private _isFirstInit;
        private _pCreator;
        private _pUniformTypeMap;
        private _isUniformArrayMap;
        private _pForeignTypeMap;
        private _pTextureTypeMap;
        private _bNeedToCalcBlend;
        private _bNeedToCalcShader;
        private _iLastPassBlendId;
        private _iLastShaderId;
        private _pMaterialContainer;
        public samplers: IAFXSamplerStateMap;
        public samplerArrays: IAFXSamplerStateListMap;
        public samplerArrayLength: IntMap;
        public uniforms: any;
        public foreigns: any;
        public textures: any;
        public samplerKeys: string[];
        public samplerArrayKeys: string[];
        public uniformKeys: string[];
        public foreignKeys: string[];
        public textureKeys: string[];
        constructor(pCreator: IAFXComponentPassInputBlend);
        public hasTexture(sName: string): bool;
        public hasUniform(sName: string): bool;
        public setUniform(sName: string, pValue: any): void;
        public setForeign(sName: string, pValue: any): void;
        /**@inline*/ 
        public setSampler(sName: string, pValue: IAFXSamplerState): void;
        public setSamplerTexture(sName: string, sTexture: string): void;
        public setSamplerTexture(sName: string, pTexture: ITexture): void;
        public setSamplerArray(sName: string, pValue: IAFXSamplerState[]): void;
        /**@inline*/ 
        public setStruct(sName: string, pValue: any): void;
        static copySamplerState(pFrom: IAFXSamplerState, pTo: IAFXSamplerState): void;
        public setTexture(sName: string, pValue: any): void;
        public setSurfaceMaterial(pSurfaceMaterial: ISurfaceMaterial): void;
        /**@inline*/ 
        public _getUnifromLength(sName: string): number;
        /**@inline*/ 
        public _getUniformType(sName: string): EAFXShaderVariableType;
        /**@inline*/ 
        public _getSamplerState(sName: string): IAFXSamplerState;
        /**@inline*/ 
        public _getSamplerTexture(sName: string): ITexture;
        public _getTextureForSamplerState(pSamplerState: IAFXSamplerState): ITexture;
        public _release(): void;
        /**@inline*/ 
        public _isNeedToCalcBlend(): bool;
        /**@inline*/ 
        public _isNeedToCalcShader(): bool;
        /**@inline*/ 
        public _getLastPassBlendId(): number;
        /**@inline*/ 
        public _getLastShaderId(): number;
        /**@inline*/ 
        public _setPassBlendId(id: number): void;
        /**@inline*/ 
        public _setShaderId(id: number): void;
        /**@inline*/ 
        public _getAFXUniformVar(sName: string): IAFXVariableDeclInstruction;
        private init();
        static getVariableType(pVar: IAFXVariableDeclInstruction): EAFXShaderVariableType;
        /**@inline*/ 
        private isVarArray(pVar);
        private clearSamplerState(pState);
    }
}
module akra.fx {
    interface IUniformTypeMap {
        [name: string]: EAFXShaderVariableType;
    }
    class Maker implements IAFXMaker {
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        private _pComposer;
        private _pShaderProgram;
        private _pRealUniformNameList;
        private _pRealAttrNameList;
        private _pUniformExistMap;
        private _pAttrExistMap;
        private _pRealUniformLengthMap;
        private _pRealUniformTypeMap;
        private _pRealUnifromFromInput;
        private _pRealSampleArraysFromInput;
        private _pRealSamplersFromInput;
        private _pRealSamplersNames;
        private _isUsedZero2D;
        private _isUsedZeroCube;
        private _pAttrContainer;
        private _pRealAttrSlotFromFlows;
        private _pRealAttrIsIndexData;
        private _pBufferSamplersFromFlows;
        private _pDataPoolArray;
        /**@inline*/ 
        public isArray(sName: string): bool;
        /**@inline*/ 
        public getType(sName: string): EAFXShaderVariableType;
        /**@inline*/ 
        public getLength(sName: string): number;
        public setUniform(sName: string, pValue: any): void;
        private applyUnifromArray(sName, eType, pValue);
        private applyUniform(sName, eType, pValue);
        /**@inline*/ 
        public shaderProgram : IShaderProgram;
        /**@inline*/ 
        public attributeSemantics : string[];
        /**@inline*/ 
        public attributeNames : string[];
        constructor(pComposer: IAFXComposer);
        public _create(sVertex: string, sPixel: string): bool;
        /**@inline*/ 
        public _getShaderInput(): IShaderInput;
        /**@inline*/ 
        public _releaseShaderInput(pPool: IShaderInput): void;
        /**@inline*/ 
        public isUniformExists(sName: string): bool;
        /**@inline*/ 
        public isAttrExists(sName: string): bool;
        public _createDataPool(): IShaderInput;
        public _initInput(pPassInput: IAFXPassInputBlend, pBlend: SamplerBlender, pAttrs: AttributeBlendContainer): bool;
        public _make(pPassInput: IAFXPassInputBlend, pBufferMap: util.BufferMap): IShaderInput;
        private setSamplerState(pOut, pTexture, pFrom);
        private expandStructUniforms(pVariable, sPrevName?);
        private applyStructUniform(sName, pValue, pInput);
    }
}
module akra.fx {
    class PassBlend implements IAFXPassBlend {
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        private _pComposer;
        private _pFXMakerByHashMap;
        private _pExtSystemDataV;
        private _pComplexTypeContainerV;
        private _pForeignContainerV;
        private _pUniformContainerV;
        private _pSharedContainerV;
        private _pGlobalContainerV;
        private _pAttributeContainerV;
        private _pVaryingContainerV;
        private _pVertexOutType;
        private _pUsedFunctionListV;
        private _pPassFunctionListV;
        private _pTextureMapV;
        private _pExtSystemDataP;
        private _pComplexTypeContainerP;
        private _pForeignContainerP;
        private _pUniformContainerP;
        private _pSharedContainerP;
        private _pGlobalContainerP;
        private _pVaryingContainerP;
        private _pUsedFunctionListP;
        private _pPassFunctionListP;
        private _pTextureMapP;
        private _hasEmptyVertex;
        private _hasEmptyPixel;
        private _sUniformSamplerCodeV;
        private _sAttrBufferDeclCode;
        private _sAttrDeclCode;
        private _sAFXAttrDeclCode;
        private _sAttrBufferInitCode;
        private _sAFXAttrInitCode;
        private _sSystemExtBlockCodeV;
        private _sFunctionDefCodeV;
        private _sSharedVarCodeV;
        private _sVaryingDeclCodeV;
        private _sVertexOutDeclCode;
        private _sVertexOutToVaryingCode;
        private _sPassFunctionCallCodeV;
        private _sUniformSamplerCodeP;
        private _sSystemExtBlockCodeP;
        private _sFunctionDefCodeP;
        private _sSharedVarCodeP;
        private _sVaryingDeclCodeP;
        private _sPassFunctionCallCodeP;
        private _sVertexCode;
        private _sPixelCode;
        private _pDefaultSamplerBlender;
        private _pTexcoordSwapper;
        private static texcoordSwapper;
        constructor(pComposer: IAFXComposer);
        public initFromPassList(pPassList: IAFXPassInstruction[]): bool;
        public generateFXMaker(pPassInput: IAFXPassInputBlend, pSurfaceMaterial: ISurfaceMaterial, pBuffer: IBufferMap, isFirst?: bool): IAFXMaker;
        /**@inline*/ 
        private getMakerByHash(sHash);
        private finalizeBlend();
        private addPass(pPass);
        private finalizeBlendForVertex();
        private finalizeBlendForPixel();
        private enableVaringPrefixes(eType, bEnabled);
        private finalizeComplexTypeForShader(eType);
        /**@inline*/ 
        private hasUniform(pVar);
        /**@inline*/ 
        private hasUniformWithName(sName);
        /**@inline*/ 
        private getUniformByName(sName);
        private prepareSamplers(pPassInput);
        /**@inline*/ 
        private prepareSurfaceMaterial(pMaterial);
        private prepareBufferMap(pMap);
        /**@inline*/ 
        private swapTexcoords(pMaterial);
        private isSamplerUsedInShader(pSampler, eType);
        private applyForeigns(pPassInput);
        /**@inline*/ 
        private generateShaderCode();
        private generateCodeForVertex();
        private generateCodeForPixel();
        private clearCodeFragments();
        private reduceSamplers();
        private reduceAttributes();
        private generateSystemExtBlock(eType);
        private generateTypeDels(eType);
        private generateFunctionDefenitions(eType);
        private generateSharedVars(eType);
        private generateVertexOut();
        private generateVaryings(eType);
        private generateUniformSamplers(eType);
        private generateUniformVars(eType);
        /**@inline*/ 
        private generateAttrBuffers();
        private generateGlobalVars(eType);
        private generateFunctions(eType);
        private generatePassFunctions(eType);
        /**@inline*/ 
        private generateRealAttrs();
        /**@inline*/ 
        private generateAFXAttrs();
        /**@inline*/ 
        private generateAttrBufferInit();
        /**@inline*/ 
        private generateAFXAttrInit();
        /**@inline*/ 
        private generateTexcoordSwap();
        /**@inline*/ 
        private generatePassFunctionCall(eType);
        private generateVertexOutToVaryings();
    }
}
module akra.fx {
    class ComponentBlend implements IAFXComponentBlend {
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        private _pComposer;
        private _isReady;
        private _sHash;
        private _bNeedToUpdateHash;
        private _pComponentHashMap;
        private _pComponentList;
        private _pComponentShiftList;
        private _pComponentPassIdList;
        private _iShiftMin;
        private _iShiftMax;
        private _pPassesDList;
        private _pComponentInputVarBlend;
        constructor(pComposer: IAFXComposer);
        /**@inline*/ 
        public isReadyToUse(): bool;
        /**@inline*/ 
        public isEmpty(): bool;
        /**@inline*/ 
        public getComponentCount(): number;
        /**@inline*/ 
        public getTotalPasses(): number;
        public getHash(): string;
        /**@inline*/ 
        public containComponentWithShift(pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        /**@inline*/ 
        public containComponentHash(sComponentHash: string): bool;
        public addComponent(pComponent: IAFXComponent, iShift: number, iPass: number): void;
        public removeComponent(pComponent: IAFXComponent, iShift: number, iPass: number): void;
        public finalizeBlend(): bool;
        public getPassInputForPass(iPass: number): IAFXPassInputBlend;
        public getPassListAtPass(iPass: number): IAFXPassInstruction[];
        public clone(): IAFXComponentBlend;
        /**@inline*/ 
        public _getComponentList(): IAFXComponent[];
        /**@inline*/ 
        public _getComponentShiftList(): number[];
        /**@inline*/ 
        public _getComponentPassIdList(): number[];
        public _setDataForClone(pComponentList: IAFXComponent[], pComponentShiftList: number[], pComponentPassNumnerList: number[], pComponentHashMap: BoolMap, iShiftMin: number, iShiftMax: number): void;
        private calcHash();
    }
    class ComponentPassInputBlend implements IAFXComponentPassInputBlend {
        private _pUniformNameToRealMap;
        private _pUniformByRealNameMap;
        private _pUniformDefaultValueMap;
        private _pTextureNameToRealMap;
        private _pTextureByRealNameMap;
        private _pForeignByNameMap;
        private _pUniformRealNameList;
        private _pUniformNameList;
        private _pTextureRealNameList;
        private _pTextureNameList;
        private _pForeignNameList;
        private _pFreePassInputBlendList;
        /**@inline*/ 
        public uniformNameToReal : StringMap;
        /**@inline*/ 
        public uniformByRealName : IAFXVariableDeclMap;
        /**@inline*/ 
        public uniformDefaultValue : any;
        /**@inline*/ 
        public textureNameToReal : StringMap;
        /**@inline*/ 
        public textureByRealName : IAFXVariableDeclMap;
        /**@inline*/ 
        public foreignByName : IAFXVariableDeclMap;
        /**@inline*/ 
        public uniformNameList : string[];
        /**@inline*/ 
        public uniformRealNameList : string[];
        /**@inline*/ 
        public textureNameList : string[];
        /**@inline*/ 
        public textureRealNameList : string[];
        /**@inline*/ 
        public foreignNameList : string[];
        constructor();
        public addDataFromPass(pPass: IAFXPassInstruction): void;
        public finalizeInput(): void;
        public getPassInput(): IAFXPassInputBlend;
        public releasePassInput(pInput: IAFXPassInputBlend): void;
        private addUniformVariable(pVariable, sPrevName, sPrevRealName);
        private generateNewPassInputs(nCount?);
    }
}
module akra.fx {
    class Blender implements IAFXBlender {
        private _pComposer;
        private _pComponentBlendByHashMap;
        private _pBlendWithComponentMap;
        private _pBlendWithBlendMap;
        private _pPassBlendByHashMap;
        private _pPassBlendByIdMap;
        constructor(pComposer: IAFXComposer);
        public addComponentToBlend(pComponentBlend: IAFXComponentBlend, pComponent: IAFXComponent, iShift: number, iPass: number): IAFXComponentBlend;
        public removeComponentFromBlend(pComponentBlend: IAFXComponentBlend, pComponent: IAFXComponent, iShift: number, iPass: number): IAFXComponentBlend;
        public addBlendToBlend(pComponentBlend: IAFXComponentBlend, pAddBlend: IAFXComponentBlend, iShift: number): IAFXComponentBlend;
        public generatePassBlend(pPassList: IAFXPassInstruction[], pStates: any, pForeigns: any, pUniforms: any): IAFXPassBlend;
        /**@inline*/ 
        public getPassBlendById(id: number): IAFXPassBlend;
    }
}
module akra.util {
    interface IBuffersCompatibleMap {
        [handle: number]: IVertexData;
    }
    interface ISemanticsMap {
        [semantics: string]: IDataFlow;
    }
    class BufferMap extends ReferenceCounter implements IBufferMap {
        private _pFlows;
        private _pMappers;
        private _pIndex;
        private _nLength;
        private _ePrimitiveType;
        private _pCompleteFlows;
        private _nCompleteFlows;
        private _nCompleteVideoBuffers;
        private _pCompleteVideoBuffers;
        private _nUsedFlows;
        private _pEngine;
        private _nStartIndex;
        private _pBuffersCompatibleMap;
        private _pSemanticsMap;
        constructor(pEngine: IEngine);
        /**@inline*/ /**@inline*/ 
        public primType : EPrimitiveTypes;
        /**@inline*/ 
        public primCount : number;
        /**@inline*/ /**@inline*/ 
        public index : IIndexData;
        /**@inline*/ 
        public limit : number;
        /**@inline*/ /**@inline*/ 
        public length : number;
        /**@inline*/ 
        public _length : number;
        /**@inline*/ 
        public startIndex : number;
        /**@inline*/ 
        public size : number;
        /**@inline*/ 
        public flows : IDataFlow[];
        /**@inline*/ 
        public mappers : IDataMapper[];
        /**@inline*/ 
        public offset : number;
        public _draw(): void;
        /**@inline*/ 
        private drawArrays();
        /**@inline*/ 
        private drawElements();
        public getFlow(sSemantics: string, bComplete?: bool): IDataFlow;
        public getFlow(iFlow: number, bComplete?: bool): IDataFlow;
        public reset(): void;
        public flow(pVertexData: IVertexData): number;
        public flow(iFlow: number, pVertexData: IVertexData): number;
        private clearLinks();
        private linkFlow(pFlow);
        public checkData(pData: IVertexData): bool;
        /**@protected*/ 
        public findMapping(pMap, eSemantics, iAddition): IDataMapper;
        public mapping(iFlow: number, pMap: IVertexData, eSemantics: string, iAddition?: number): bool;
        /**@inline*/ 
        private pushEtalon(pData);
        public update(): bool;
        public findFlow(sSemantics: string): IDataFlow;
        public clone(bWithMapping?: bool): IBufferMap;
        public toString(bListAll?: bool): string;
    }
    function createBufferMap(pEngine: IEngine): IBufferMap;
}
module akra.fx {
    interface IPreRenderState {
        isClear: bool;
        primType: EPrimitiveTypes;
        offset: number;
        length: number;
        index: IIndexData;
        flows: util.ObjectArray;
    }
    class Composer implements IAFXComposer {
        private _pEngine;
        private _pTechniqueToBlendMap;
        private _pTechniqueToOwnBlendMap;
        private _pTechniqueLastGlobalBlendMap;
        private _pTechniqueNeedUpdateMap;
        private _pEffectResourceToComponentBlendMap;
        private _pBlender;
        private _pGlobalEffectResorceIdStack;
        private _pGlobalComponentBlendStack;
        private _pGlobalComponentBlend;
        private _pCurrentSceneObject;
        private _pCurrentViewport;
        private _pCurrentRenderable;
        private _pCurrentBufferMap;
        private _pCurrentSurfaceMaterial;
        private _pComposerState;
        /** Render targets for global-post effects */
        private _pRenderTargetA;
        private _pRenderTargetB;
        private _pLastRenderTarget;
        private _pPostEffectTextureA;
        private _pPostEffectTextureB;
        private _pPostEffectDepthBuffer;
        static pDefaultSamplerBlender: SamplerBlender;
        constructor(pEngine: IEngine);
        public getComponentByName(sComponentName: string): IAFXComponent;
        /**@inline*/ 
        public getEngine(): IEngine;
        public getComponentCountForEffect(pEffectResource: IEffect): number;
        public getTotalPassesForEffect(pEffectResource: IEffect): number;
        public addComponentToEffect(pEffectResource: IEffect, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        public removeComponentFromEffect(pEffectResource: IEffect, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        public activateEffectResource(pEffectResource: IEffect, iShift: number): bool;
        public deactivateEffectResource(pEffectResource: IEffect): bool;
        public getTotalPassesForTechnique(pRenderTechnique: IRenderTechnique): number;
        public addOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        public removeOwnComponentToTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        public hasOwnComponentInTechnique(pRenderTechnique: IRenderTechnique, pComponent: IAFXComponent, iShift: number, iPass: number): bool;
        public prepareTechniqueBlend(pRenderTechnique: IRenderTechnique): bool;
        public markTechniqueAsNeedUpdate(pRenderTechnique: IRenderTechnique): void;
        public getPassInputBlend(pRenderTechnique: IRenderTechnique, iPass: number): IAFXPassInputBlend;
        public applyBufferMap(pMap: IBufferMap): bool;
        public applySurfaceMaterial(pSurfaceMaterial: ISurfaceMaterial): bool;
        /**@inline*/ 
        public _setCurrentSceneObject(pSceneObject: ISceneObject): void;
        /**@inline*/ 
        public _setCurrentViewport(pViewport: IViewport): void;
        /**@inline*/ 
        public _setCurrentRenderableObject(pRenderable: IRenderableObject): void;
        /**@inline*/ 
        public _getCurrentSceneObject(): ISceneObject;
        /**@inline*/ 
        public _getCurrentViewport(): IViewport;
        /**@inline*/ 
        public _getCurrentRenderableObject(): IRenderableObject;
        public renderTechniquePass(pRenderTechnique: IRenderTechnique, iPass: number): void;
        public _loadEffectFromSyntaxTree(pTree: IParseTree, sFileName: string): bool;
        public _loadEffectFromBinary(pData: Uint8Array, sFileName: string): bool;
        private initComponent(pTechnique);
        private clearPreRenderState();
        public bUseNormalMap: bool;
        private applySystemUnifoms(pPassInput);
        private initPostEffectTextures();
        private resizePostEffectTextures(iWidth, iHeight);
    }
}
module akra {
    interface IDDSCodec extends IImgCodec {
    }
}
module akra {
    class DDSCodec extends ImgCodec implements IDDSCodec {
        private _sType;
        private static _pInstance;
        public magicNumberToFileExt(pMagicNumber: Uint8Array): string;
        static startup(): void;
        static shutdown(): void;
        public getType(): string;
        public decode(pData: Uint8Array, pImgData: IImgData): Uint8Array;
    }
}
module akra {
    interface IDependens {
        files?: string[];
        deps?: IDependens;
        root?: string;
        type?: string;
        loader?: (dep: IDependens, ...data: any[]) => void;
    }
    interface IDepsManager extends IEventProvider {
        load(pDeps: IDependens, sRoot?: string): bool;
    }
}
module akra.util {
    enum EDepsManagerStates {
        IDLE,
        LOADING,
    }
    function createDepsManager(pEngine: IEngine): IDepsManager;
}
module akra {
    enum EGamepadCodes {
        FACE_1,
        FACE_2,
        FACE_3,
        FACE_4,
        LEFT_SHOULDER,
        RIGHT_SHOULDER,
        LEFT_SHOULDER_BOTTOM,
        RIGHT_SHOULDER_BOTTOM,
        SELECT,
        START,
        LEFT_ANALOGUE_STICK,
        RIGHT_ANALOGUE_STICK,
        PAD_TOP,
        PAD_BOTTOM,
        PAD_LEFT,
        PAD_RIGHT,
    }
    enum EGamepadAxis {
        LEFT_ANALOGUE_HOR,
        LEFT_ANALOGUE_VERT,
        RIGHT_ANALOGUE_HOR,
        RIGHT_ANALOGUE_VERT,
    }
    interface IGamepadMap extends IEventProvider {
        init(): bool;
        update(): void;
        isActive(): bool;
        find(sID?: string): Gamepad;
        find(i?: number): Gamepad;
        connected(pGamepad: Gamepad): void;
        disconnected(pGamepad: Gamepad): void;
        updated(pGamepad: Gamepad): void;
    }
}
module akra.controls {
    function createGamepadMap(): IGamepadMap;
}
module akra {
    interface IPoint {
        x: number;
        y: number;
    }
}
module akra {
    interface IOffset {
        x: number;
        y: number;
    }
}
module akra {
    enum EKeyCodes {
        BACKSPACE,
        TAB,
        ENTER,
        SHIFT,
        CTRL,
        ALT,
        PAUSE,
        BREAK,
        CAPSLOCK,
        ESCAPE,
        SPACE,
        PAGEUP,
        PAGEDOWN,
        END,
        HOME,
        LEFT,
        UP,
        RIGHT,
        DOWN,
        INSERT,
        DELETE,
        N0,
        N1,
        N2,
        N3,
        N4,
        N5,
        N6,
        N7,
        N8,
        N9,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z,
        LEFTWINDOWKEY,
        RIGHTWINDOWKEY,
        SELECTKEY,
        NUMPAD0,
        NUMPAD1,
        NUMPAD2,
        NUMPAD3,
        NUMPAD4,
        NUMPAD5,
        NUMPAD6,
        NUMPAD7,
        NUMPAD8,
        NUMPAD9,
        MULTIPLY,
        ADD,
        SUBTRACT,
        DECIMALPOINT,
        DIVIDE,
        F1,
        F2,
        F3,
        F4,
        F5,
        F6,
        F7,
        F8,
        F9,
        F10,
        F11,
        F12,
        NUMLOCK,
        SCROLLLOCK,
        SEMICOLON,
        EQUALSIGN,
        COMMA,
        DASH,
        PERIOD,
        FORWARDSLASH,
        GRAVEACCENT,
        OPENBRACKET,
        BACKSLASH,
        CLOSEBRACKET,
        SINGLEQUOTE,
        TOTAL,
    }
    interface IKeyMap {
        isKeyPress(iCode: number);
        isKeyPress(eCode: EKeyCodes);
        getMouse(): IPoint;
        getMouseShift(): IOffset;
        isMouseMoved(): bool;
        isMousePress(): bool;
        captureMouse(pMouseTarget: Node): void;
        captureKeyboard(pKeyboardTarget: Node): void;
        capture(pTarget: Node): void;
        update(): void;
    }
}
module akra.controls {
    function createKeymap(target?: HTMLElement): IKeyMap;
}
module akra {
    interface IUIHTMLNode {
    }
    interface IUIDNDNode {
    }
    interface IUIComponentOptions {
    }
    interface IUI extends IScene2d {
        createHTMLNode(pElement: HTMLElement): IUIHTMLNode;
        createDNDNode(pElement: HTMLElement): IUIDNDNode;
        createComponent(sName: string, pOptions?: IUIComponentOptions): IUIComponent;
        createLayout(eType: EUILayouts, pAttrs?: IUILayoutAttributes): IUILayout;
        createLayout(sType: string, pAttrs?: IUILayoutAttributes): IUILayout;
    }
}
module akra {
    enum EUILayouts {
        UNKNOWN,
        HORIZONTAL,
        VERTICAL,
    }
    interface IUILayoutAttributes {
        comment?: string;
    }
    interface IUILayout extends IUIHTMLNode {
        layoutType: EUILayouts;
        setAttributes(pAttrs: IUILayoutAttributes): void;
        attr(sAttr: string): any;
    }
}
module akra {
    interface IUI {
    }
    enum EUINodeTypes {
        UNKNOWN,
        HTML,
        DND,
        LAYOUT,
        COMPONENT,
    }
    interface IUINode extends IEntity {
        nodeType: EUINodeTypes;
        ui: IUI;
        render(): bool;
        render(pParent: IUINode): bool;
        render(pElement: HTMLElement): bool;
        render(pElement: JQuery): bool;
        render(sSelector: string): bool;
        attachToParent(pParent: IUINode): bool;
        recursiveRender(): void;
        renderTarget(): JQuery;
        hasRenderTarget(): bool;
        relocated(pNode: IUINode): void;
    }
}
module akra {
    interface IUIEvent extends JQueryEventObject {
    }
    interface IUIHTMLNode extends IUINode {
        $element: JQuery;
        el: JQuery;
        getHTMLElement(): HTMLElement;
        isFocused(): bool;
        isRendered(): bool;
        width(): number;
        height(): number;
        attachToParent(pParent: IUINode, bRender?: bool): bool;
        handleEvent(sEvent: string): bool;
        disableEvent(sEvent: string): void;
        show(): void;
        hide(): void;
        click(e: IUIEvent): void;
        dblclick(e: IUIEvent): void;
        mousemove(e: IUIEvent): void;
        mouseup(e: IUIEvent): void;
        mousedown(e: IUIEvent): void;
        mouseover(e: IUIEvent): void;
        mouseout(e: IUIEvent): void;
        focusin(e: IUIEvent): void;
        focusout(e: IUIEvent): void;
        blur(e: IUIEvent): void;
        change(e: IUIEvent): void;
        keydown(e: IUIEvent): void;
        keyup(e: IUIEvent): void;
        rendered(): void;
        beforeRender(): void;
    }
}
interface JQueryAjaxSettings {
    accepts?: any;
    async?: bool;
    beforeSend? (jqXHR: JQueryXHR, settings: JQueryAjaxSettings);
    cache?: bool;
    complete? (jqXHR: JQueryXHR, textStatus: string);
    contents?: {
        [key: string]: any;
    };
    contentType?: any;
    context?: any;
    converters?: {
        [key: string]: any;
    };
    crossDomain?: bool;
    data?: any;
    dataFilter? (data: any, ty: any): any;
    dataType?: string;
    error? (jqXHR: JQueryXHR, textStatus: string, errorThrow: string): any;
    global?: bool;
    headers?: {
        [key: string]: any;
    };
    ifModified?: bool;
    isLocal?: bool;
    jsonp?: string;
    jsonpCallback?: any;
    mimeType?: string;
    password?: string;
    processData?: bool;
    scriptCharset?: string;
    statusCode?: {
        [key: string]: any;
    };
    success? (data: any, textStatus: string, jqXHR: JQueryXHR);
    timeout?: number;
    traditional?: bool;
    type?: string;
    url?: string;
    username?: string;
    xhr?: any;
    xhrFields?: {
        [key: string]: any;
    };
}
interface JQueryXHR extends XMLHttpRequest {
    overrideMimeType();
}
interface JQueryCallback {
    add(...callbacks: any[]): any;
    disable(): any;
    empty(): any;
    fire(...arguments: any[]): any;
    fired(): bool;
    fireWith(context: any, ...args: any[]): any;
    has(callback: any): bool;
    lock(): any;
    locked(): bool;
    removed(...callbacks: any[]): any;
}
interface JQueryPromise {
    always(...alwaysCallbacks: any[]): JQueryDeferred;
    done(...doneCallbacks: any[]): JQueryDeferred;
    fail(...failCallbacks: any[]): JQueryDeferred;
    pipe(doneFilter?: (x: any) => any, failFilter?: (x: any) => any, progressFilter?: (x: any) => any): JQueryPromise;
    then(doneCallbacks: any, failCallbacks: any, progressCallbacks?: any): JQueryDeferred;
}
interface JQueryDeferred extends JQueryPromise {
    notify(...args: any[]): JQueryDeferred;
    notifyWith(context: any, ...args: any[]): JQueryDeferred;
    pipe(doneFilter?: any, failFilter?: any, progressFilter?: any): JQueryPromise;
    progress(...progressCallbacks: any[]): JQueryDeferred;
    reject(...args: any[]): JQueryDeferred;
    rejectWith(context: any, ...args: any[]): JQueryDeferred;
    resolve(...args: any[]): JQueryDeferred;
    resolveWith(context: any, ...args: any[]): JQueryDeferred;
    state(): string;
    then(doneCallbacks: any, failCallbacks?: any, progressCallbacks?: any): JQueryDeferred;
}
interface JQueryEventObject extends Event {
    data: any;
    delegateTarget: Element;
    isDefaultPrevented(): bool;
    isImmediatePropogationStopped(): bool;
    isPropogationStopped(): bool;
    namespace: string;
    preventDefault(): any;
    relatedTarget: Element;
    result: any;
    stopImmediatePropagation();
    stopPropagation();
    pageX: number;
    pageY: number;
    which: number;
    metaKey: any;
}
interface JQueryBrowserInfo {
    safari: bool;
    opera: bool;
    msie: bool;
    mozilla: bool;
    version: string;
}
interface JQuerySupport {
    ajax?: bool;
    boxModel?: bool;
    changeBubbles?: bool;
    checkClone?: bool;
    checkOn?: bool;
    cors?: bool;
    cssFloat?: bool;
    hrefNormalized?: bool;
    htmlSerialize?: bool;
    leadingWhitespace?: bool;
    noCloneChecked?: bool;
    noCloneEvent?: bool;
    opacity?: bool;
    optDisabled?: bool;
    optSelected?: bool;
    scriptEval? (): bool;
    style?: bool;
    submitBubbles?: bool;
    tbody?: bool;
}
interface JQueryStatic {
    ajax(settings: JQueryAjaxSettings);
    ajax(url: string, settings: JQueryAjaxSettings);
    ajaxPrefilter(dataTypes: string, handler: (opts: any, originalOpts: any, jqXHR: JQueryXHR) => any): any;
    ajaxPrefilter(handler: (opts: any, originalOpts: any, jqXHR: JQueryXHR) => any): any;
    ajaxSetup(options: any);
    get(url: string, data?: any, success?: any, dataType?: any): JQueryXHR;
    getJSON(url: string, data?: any, success?: any): JQueryXHR;
    getScript(url: string, success?: any): JQueryXHR;
    param(obj: any): string;
    param(obj: any, traditional: bool): string;
    post(url: string, data?: any, success?: any, dataType?: any): JQueryXHR;
    Callbacks(flags: any): JQueryCallback;
    holdReady(hold: bool): any;
    (selector: string, context?: any): JQuery;
    (element: Element): JQuery;
    (object: {}): JQuery;
    (elementArray: Element[]): JQuery;
    (object: JQuery): JQuery;
    (func: Function): JQuery;
    (): JQuery;
    noConflict(removeAll?: bool): Object;
    when(...deferreds: any[]): JQueryPromise;
    css(e: any, propertyName: string, value?: any);
    css(e: any, propertyName: any, value?: any);
    cssHooks: {
        [key: string]: any;
    };
    data(element: Element, key: string, value: any): Object;
    dequeue(element: Element, queueName?: string): any;
    hasData(element: Element): bool;
    queue(element: Element, queueName?: string): any[];
    queue(element: Element, queueName: string, newQueueOrCallback: any): JQuery;
    removeData(element: Element, name?: string): JQuery;
    Deferred(beforeStart?: (deferred: JQueryDeferred) => any): JQueryDeferred;
    fx: {
        tick: () => void;
        interval: number;
        stop: () => void;
        speeds: {
            slow: number;
            fast: number;
        };
        off: bool;
        step: any;
    };
    proxy(func: Function, context: any): any;
    proxy(context: any, name: string): any;
    error(message: any);
    expr: any;
    isReady: bool;
    browser: JQueryBrowserInfo;
    support: JQuerySupport;
    contains(container: Element, contained: Element): bool;
    each(collection: any, callback: (indexInArray: any, valueOfElement: any) => any): any;
    extend(target: any, ...objs: any[]): Object;
    extend(deep: bool, target: any, ...objs: any[]): Object;
    globalEval(code: string): any;
    grep(array: any[], func: any, invert: bool): any[];
    inArray(value: any, array: any[], fromIndex?: number): number;
    isArray(obj: any): bool;
    isEmptyObject(obj: any): bool;
    isFunction(obj: any): bool;
    isNumeric(value: any): bool;
    isPlainObject(obj: any): bool;
    isWindow(obj: any): bool;
    isXMLDoc(node: Node): bool;
    makeArray(obj: any): any[];
    map(array: any[], callback: (elementOfArray: any, indexInArray: any) => any): any[];
    merge(first: any[], second: any[]): any[];
    noop(): any;
    now(): number;
    parseJSON(json: string): any;
    parseXML(data: string): any;
    queue(element: Element, queueName: string, newQueue: any[]): JQuery;
    trim(str: string): string;
    type(obj: any): string;
    unique(arr: any[]): any[];
}
interface JQuery {
    ajaxComplete(handler: any): JQuery;
    ajaxError(handler: (evt: any, xhr: any, opts: any) => any): JQuery;
    ajaxSend(handler: (evt: any, xhr: any, opts: any) => any): JQuery;
    ajaxStart(handler: () => any): JQuery;
    ajaxStop(handler: () => any): JQuery;
    ajaxSuccess(handler: (evt: any, xml: any, opts: any) => any): JQuery;
    load(url: string, data?: any, complete?: any): JQuery;
    serialize(): string;
    serializeArray(): any[];
    addClass(classNames: string): JQuery;
    addClass(func: (index: any, currentClass: any) => JQuery);
    attr(attributeName: string): string;
    attr(attributeName: string, value: any): JQuery;
    attr(map: {
            [key: string]: any;
        }): JQuery;
    attr(attributeName: string, func: (index: any, attr: any) => any): JQuery;
    hasClass(className: string): bool;
    html(htmlString: string): JQuery;
    html(): string;
    prop(propertyName: string): string;
    prop(propertyName: string, value: any): JQuery;
    prop(map: any): JQuery;
    prop(propertyName: string, func: (index: any, oldPropertyValue: any) => any): JQuery;
    removeAttr(attributeName: any): JQuery;
    removeClass(className?: any): JQuery;
    removeClass(func: (index: any, cls: any) => any): JQuery;
    removeProp(propertyName: any): JQuery;
    toggleClass(className: any, swtch?: bool): JQuery;
    toggleClass(swtch?: bool): JQuery;
    toggleClass(func: (index: any, cls: any, swtch: any) => any): JQuery;
    val(): any;
    val(value: string[]): JQuery;
    val(value: string): JQuery;
    val(func: (index: any, value: any) => any): JQuery;
    css(propertyName: string, value?: any);
    css(propertyName: any, value?: any);
    height(): number;
    height(value: number): JQuery;
    height(func: (index: any, height: any) => any): JQuery;
    innerHeight(): number;
    innerWidth(): number;
    offset(): {
        top: number;
        left: number;
    };
    offset(coordinates: any): JQuery;
    offset(func: (index: any, coords: any) => any): JQuery;
    outerHeight(includeMargin?: bool): number;
    outerWidth(includeMargin?: bool): number;
    position(): {
        top: number;
        left: number;
    };
    scrollLeft(): number;
    scrollLeft(value: number): JQuery;
    scrollTop(): number;
    scrollTop(value: number): JQuery;
    width(): number;
    width(value: number): JQuery;
    width(func: (index: any, height: any) => any): JQuery;
    clearQueue(queueName?: string): JQuery;
    data(key: string, value: any): JQuery;
    data(obj: {
            [key: string]: any;
        }): JQuery;
    data(key?: string): any;
    dequeue(queueName?: string): JQuery;
    removeData(nameOrList?: any): JQuery;
    promise(type?: any, target?: any): JQueryPromise;
    animate(properties: any, duration?: any, easing?: string, complete?: Function): JQuery;
    animate(properties: any, options: {
            duration?: any;
            easing?: string;
            complete?: Function;
            step?: Function;
            queue?: bool;
            specialEasing?: any;
        });
    delay(duration: number, queueName?: string): JQuery;
    fadeIn(duration?: any, callback?: any): JQuery;
    fadeIn(duration?: any, easing?: string, callback?: any): JQuery;
    fadeOut(duration?: any, callback?: any): JQuery;
    fadeOut(duration?: any, easing?: string, callback?: any): JQuery;
    fadeTo(duration: any, opacity: number, callback?: any): JQuery;
    fadeTo(duration: any, opacity: number, easing?: string, callback?: any): JQuery;
    fadeToggle(duration?: any, easing?: string, callback?: any): JQuery;
    hide(duration?: any, callback?: any): JQuery;
    hide(duration?: any, easing?: string, callback?: any): JQuery;
    show(duration?: any, callback?: any): JQuery;
    show(duration?: any, easing?: string, callback?: any): JQuery;
    slideDown(duration?: any, callback?: any): JQuery;
    slideDown(duration?: any, easing?: string, callback?: any): JQuery;
    slideToggle(duration?: any, callback?: any): JQuery;
    slideToggle(duration?: any, easing?: string, callback?: any): JQuery;
    slideUp(duration?: any, callback?: any): JQuery;
    slideUp(duration?: any, easing?: string, callback?: any): JQuery;
    stop(clearQueue?: bool, jumpToEnd?: bool): JQuery;
    stop(queue?: any, clearQueue?: bool, jumpToEnd?: bool): JQuery;
    toggle(duration?: any, callback?: any): JQuery;
    toggle(duration?: any, easing?: string, callback?: any): JQuery;
    toggle(showOrHide: bool): JQuery;
    bind(eventType: string, eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    bind(eventType: string, eventData: any, preventBubble: bool): JQuery;
    bind(eventType: string, preventBubble: bool): JQuery;
    bind(...events: any[]);
    blur(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    blur(handler: (eventObject: JQueryEventObject) => any): JQuery;
    change(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    change(handler: (eventObject: JQueryEventObject) => any): JQuery;
    click(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    click(handler: (eventObject: JQueryEventObject) => any): JQuery;
    dblclick(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    dblclick(handler: (eventObject: JQueryEventObject) => any): JQuery;
    delegate(selector: any, eventType: string, handler: (eventObject: JQueryEventObject) => any): JQuery;
    focus(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    focus(handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusin(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusin(handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusout(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    focusout(handler: (eventObject: JQueryEventObject) => any): JQuery;
    hover(handlerIn: (eventObject: JQueryEventObject) => any, handlerOut: (eventObject: JQueryEventObject) => any): JQuery;
    hover(handlerInOut: (eventObject: JQueryEventObject) => any): JQuery;
    keydown(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    keydown(handler: (eventObject: JQueryEventObject) => any): JQuery;
    keypress(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    keypress(handler: (eventObject: JQueryEventObject) => any): JQuery;
    keyup(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    keyup(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousedown(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousedown(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseevent(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseevent(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseenter(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseenter(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseleave(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseleave(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousemove(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mousemove(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseout(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseout(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseover(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseover(handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseup(eventData: any, handler: (eventObject: JQueryEventObject) => any): JQuery;
    mouseup(handler: (eventObject: JQueryEventObject) => any): JQuery;
    off(events?: string, selector?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    off(eventsMap: {
            [key: string]: any;
        }, selector?: any): JQuery;
    on(events: string, selector?: any, data?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    on(eventsMap: {
            [key: string]: any;
        }, selector?: any, data?: any): JQuery;
    one(events: string, selector?: any, data?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    one(eventsMap: {
            [key: string]: any;
        }, selector?: any, data?: any): JQuery;
    ready(handler: any): JQuery;
    resize(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    resize(handler: (eventObject: JQueryEventObject) => any): JQuery;
    scroll(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    scroll(handler: (eventObject: JQueryEventObject) => any): JQuery;
    select(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    select(handler: (eventObject: JQueryEventObject) => any): JQuery;
    submit(eventData?: any, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    submit(handler: (eventObject: JQueryEventObject) => any): JQuery;
    trigger(eventType: string, ...extraParameters: any[]): JQuery;
    trigger(event: JQueryEventObject): JQuery;
    triggerHandler(eventType: string, ...extraParameters: any[]): Object;
    unbind(eventType?: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    unbind(eventType: string, fls: bool): JQuery;
    unbind(evt: any): JQuery;
    undelegate(): JQuery;
    undelegate(selector: any, eventType: string, handler?: (eventObject: JQueryEventObject) => any): JQuery;
    undelegate(selector: any, events: any): JQuery;
    undelegate(namespace: string): JQuery;
    context: Element;
    jquery: string;
    pushStack(elements: any[]): JQuery;
    pushStack(elements: any[], name: any, arguments: any): JQuery;
    after(...content: any[]): JQuery;
    after(func: (index: any) => any);
    append(...content: any[]): JQuery;
    append(func: (index: any, html: any) => any);
    appendTo(target: any): JQuery;
    before(...content: any[]): JQuery;
    before(func: (index: any) => any);
    clone(withDataAndEvents?: bool, deepWithDataAndEvents?: bool): JQuery;
    detach(selector?: any): JQuery;
    empty(): JQuery;
    insertAfter(target: any): JQuery;
    insertBefore(target: any): JQuery;
    prepend(...content: any[]): JQuery;
    prepend(func: (index: any, html: any) => any): JQuery;
    prependTo(target: any): JQuery;
    remove(selector?: any): JQuery;
    replaceAll(target: any): JQuery;
    replaceWith(func: any): JQuery;
    text(textString: string): JQuery;
    text(): string;
    toArray(): any[];
    unwrap(): JQuery;
    wrap(wrappingElement: any): JQuery;
    wrap(func: (index: any) => any): JQuery;
    wrapAll(wrappingElement: any): JQuery;
    wrapInner(wrappingElement: any): JQuery;
    wrapInner(func: (index: any) => any): JQuery;
    each(func: (index: any, elem: Element) => any): JQuery;
    get(index?: number): any;
    index(selectorOrElement?: any): number;
    length: number;
    [x: string]: HTMLElement;
    [x: number]: HTMLElement;
    add(selector: string, context?: any): JQuery;
    add(...elements: any[]): JQuery;
    add(html: string): JQuery;
    add(obj: JQuery): JQuery;
    andSelf(): JQuery;
    children(selector?: any): JQuery;
    closest(selector: string): JQuery;
    closest(selector: string, context?: Element): JQuery;
    closest(obj: JQuery): JQuery;
    closest(element: any): JQuery;
    closest(selectors: any, context?: Element): any[];
    contents(): JQuery;
    end(): JQuery;
    eq(index: number): JQuery;
    filter(selector: string): JQuery;
    filter(func: (index: any) => any): JQuery;
    filter(element: any): JQuery;
    filter(obj: JQuery): JQuery;
    find(selector: string): JQuery;
    find(element: any): JQuery;
    find(obj: JQuery): JQuery;
    first(): JQuery;
    has(selector: string): JQuery;
    has(contained: Element): JQuery;
    is(selector: string): bool;
    is(func: (index: any) => any): bool;
    is(element: any): bool;
    is(obj: JQuery): bool;
    last(): JQuery;
    map(callback: (index: any, domElement: Element) => any): JQuery;
    next(selector?: string): JQuery;
    nextAll(selector?: string): JQuery;
    nextUntil(selector?: string, filter?: string): JQuery;
    nextUntil(element?: Element, filter?: string): JQuery;
    not(selector: string): JQuery;
    not(func: (index: any) => any): JQuery;
    not(element: any): JQuery;
    not(obj: JQuery): JQuery;
    offsetParent(): JQuery;
    parent(selector?: string): JQuery;
    parents(selector?: string): JQuery;
    parentsUntil(selector?: string, filter?: string): JQuery;
    parentsUntil(element?: Element, filter?: string): JQuery;
    prev(selector?: string): JQuery;
    prevAll(selector?: string): JQuery;
    prevUntil(selector?: string, filter?: string): JQuery;
    prevUntil(element?: Element, filter?: string): JQuery;
    siblings(selector?: string): JQuery;
    slice(start: number, end?: number): JQuery;
    queue(queueName?: string): any[];
    queue(queueName: string, newQueueOrCallback: any): JQuery;
    queue(newQueueOrCallback: any): JQuery;
}
interface AccordionOptions {
    collapsible?: bool;
    disabled?: bool;
    event?: string;
    header?: string;
    heightStyle?: string;
    icons?: any;
}
interface AccordionUIParams {
    newHeader: JQuery;
    oldHeader: JQuery;
    newPanel: JQuery;
    oldPanel: JQuery;
}
interface AccordionEvent {
    (event: Event, ui: AccordionUIParams): void;
}
interface AccordionEvents {
    activate?: AccordionEvent;
    beforeActivate?: AccordionEvent;
    create?: AccordionEvent;
}
interface Accordion extends Widget, AccordionOptions, AccordionEvents {
}
interface AutocompleteOptions {
    autoFocus?: bool;
    delay?: number;
    disabled?: bool;
    minLength?: number;
    position?: string;
}
interface AutocompleteUIParams {
}
interface AuotcompleteEvent {
    (event: Event, ui: AutocompleteUIParams): void;
}
interface AutocompleteEvents {
    change?: AuotcompleteEvent;
    close?: AuotcompleteEvent;
    create?: AuotcompleteEvent;
    focus?: AuotcompleteEvent;
    open?: AuotcompleteEvent;
    response?: AuotcompleteEvent;
    search?: AuotcompleteEvent;
    select?: AuotcompleteEvent;
}
interface Autocomplete extends Widget, AutocompleteOptions, AutocompleteEvents {
    escapeRegex: (string: any) => string;
}
interface ButtonOptions {
    disabled?: bool;
    icons?: any;
    label?: string;
    text?: bool;
}
interface Button extends Widget, ButtonOptions {
}
interface DatepickerOptions {
    altFormat?: string;
    appendText?: string;
    autoSize?: bool;
    beforeShow?: (input: Element, inst: any) => void;
    beforeShowDay?: (date: Date) => void;
    buttonImage?: string;
    buttonImageOnly?: bool;
    buttonText?: string;
    calculateWeek?: () => any;
    changeMonth?: bool;
    changeYear?: bool;
    closeText?: string;
    constrainInput?: bool;
    currentText?: string;
    dateFormat?: string;
    dayNames?: string[];
    dayNamesMin?: string[];
    dayNamesShort?: string[];
    duration?: string;
    firstDay?: number;
    gotoCurrent?: bool;
    hideIfNoPrevNext?: bool;
    isRTL?: bool;
    monthNames?: string[];
    monthNamesShort?: string[];
    navigationAsDateFormat?: bool;
    nextText?: string;
    onChangeMonthYear?: (year: number, month: number, inst: any) => void;
    onClose?: (dateText: string, inst: any) => void;
    onSelect?: (dateText: string, inst: any) => void;
    prevText?: string;
    selectOtherMonths?: bool;
    showAnim?: string;
    showButtonPanel?: bool;
    showCurrentAtPos?: number;
    showMonthAfterYear?: bool;
    showOn?: string;
    showOtherMonths?: bool;
    showWeek?: bool;
    stepMonths?: number;
    weekHeader?: string;
    yearRange?: string;
    yearSuffix?: string;
}
interface DatepickerFormatDateOptions {
    dayNamesShort?: string[];
    dayNames?: string[];
    monthNamesShort?: string[];
    monthNames?: string[];
}
interface Datepicker extends Widget, DatepickerOptions {
    regional: {
        [languageCod3: string]: any;
    };
    setDefaults(defaults: DatepickerOptions);
    formatDate(format: string, date: Date, settings?: DatepickerFormatDateOptions): string;
    parseDate(format: string, date: string, settings?: DatepickerFormatDateOptions): Date;
    iso8601Week(date: Date): void;
    noWeekends(): void;
}
interface DialogOptions {
    autoOpen?: bool;
    closeOnEscape?: bool;
    closeText?: string;
    dialogClass?: string;
    disabled?: bool;
    draggable?: bool;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    modal?: bool;
    resizable?: bool;
    stack?: bool;
    title?: string;
    zIndex?: number;
}
interface DialogUIParams {
}
interface DialogEvent {
    (event: Event, ui: DialogUIParams): void;
}
interface DialogEvents {
    beforeClose?: DialogEvent;
    close?: DialogEvent;
    create?: DialogEvent;
    drag?: DialogEvent;
    dragStart?: DialogEvent;
    dragStop?: DialogEvent;
    focus?: DialogEvent;
    open?: DialogEvent;
    resize?: DialogEvent;
    resizeStart?: DialogEvent;
    resizeStop?: DialogEvent;
}
interface Dialog extends Widget, DialogOptions, DialogEvents {
}
interface DraggableEventUIParams {
    helper: JQuery;
    position: {
        top: number;
        left: number;
    };
    offset: {
        top: number;
        left: number;
    };
}
interface DraggableEvent {
    (event: Event, ui: DraggableEventUIParams): void;
}
interface DraggableOptions {
    disabled?: bool;
    addClasses?: bool;
    appendTo?: any;
    axis?: string;
    cancel?: string;
    connectToSortable?: string;
    containment?: any;
    cursor?: string;
    cursorAt?: any;
    delay?: number;
    distance?: number;
    grid?: number[];
    handle?: any;
    helper?: any;
    iframeFix?: any;
    opacity?: number;
    refreshPositions?: bool;
    revert?: any;
    revertDuration?: number;
    scope?: string;
    scroll?: bool;
    scrollSensitivity?: number;
    scrollSpeed?: number;
    snap?: any;
    snapMode?: string;
    snapTolerance?: number;
    stack?: string;
    zIndex?: number;
}
interface DraggableEvents {
    create?: DraggableEvent;
    start?: DraggableEvent;
    drag?: DraggableEvent;
    stop?: DraggableEvent;
}
interface Draggable extends Widget, DraggableOptions, DraggableEvent {
}
interface DroppableEventUIParam {
    draggable: JQuery;
    helper: JQuery;
    position: {
        top: number;
        left: number;
    };
    offset: {
        top: number;
        left: number;
    };
}
interface DroppableEvent {
    (event: Event, ui: DroppableEventUIParam): void;
}
interface DroppableOptions {
    disabled?: bool;
    accept?: any;
    activeClass?: string;
    greedy?: bool;
    hoverClass?: string;
    scope?: string;
    tolerance?: string;
}
interface DroppableEvents {
    create?: DroppableEvent;
    activate?: DroppableEvent;
    deactivate?: DroppableEvent;
    over?: DroppableEvent;
    out?: DroppableEvent;
    drop?: DroppableEvent;
}
interface Droppable extends Widget, DroppableOptions, DroppableEvents {
}
interface MenuOptions {
    disabled?: bool;
    icons?: any;
    menus?: string;
    role?: string;
}
interface MenuUIParams {
}
interface MenuEvent {
    (event: Event, ui: MenuUIParams): void;
}
interface MenuEvents {
    blur?: MenuEvent;
    create?: MenuEvent;
    focus?: MenuEvent;
    select?: MenuEvent;
}
interface Menu extends Widget, MenuOptions, MenuEvents {
}
interface ProgressbarOptions {
    disabled?: bool;
    value?: number;
}
interface ProgressbarUIParams {
}
interface ProgressbarEvent {
    (event: Event, ui: ProgressbarUIParams): void;
}
interface ProgressbarEvents {
    change?: ProgressbarEvent;
    complete?: ProgressbarEvent;
    create?: ProgressbarEvent;
}
interface Progressbar extends Widget, ProgressbarOptions, ProgressbarEvents {
}
interface ResizableOptions {
    animate?: bool;
    animateEasing?: string;
    autoHide?: bool;
    cancel?: string;
    delay?: number;
    disabled?: bool;
    distance?: number;
    ghost?: bool;
    grid?: any;
    helper?: string;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
}
interface ResizableUIParams {
    element: JQuery;
    helper: JQuery;
    originalElement: JQuery;
    originalPosition: any;
    originalSize: any;
    position: any;
    size: any;
}
interface ResizableEvent {
    (event: Event, ui: ResizableUIParams): void;
}
interface ResizableEvents {
    resize?: ResizableEvent;
    start?: ResizableEvent;
    stop?: ResizableEvent;
}
interface Resizable extends Widget, ResizableOptions, ResizableEvents {
}
interface SelectableOptions {
    autoRefresh?: bool;
    cancel?: string;
    delay?: number;
    disabled?: bool;
    distance?: number;
    filter?: string;
    tolerance?: string;
}
interface SelectableEvents {
    selected? (event: Event, ui: {
            selected?: Element;
        }): void;
    selecting? (event: Event, ui: {
            selecting?: Element;
        }): void;
    start? (event: Event, ui: any): void;
    stop? (event: Event, ui: any): void;
    unselected? (event: Event, ui: {
            unselected: Element;
        }): void;
    unselecting? (event: Event, ui: {
            unselecting: Element;
        }): void;
}
interface Selectable extends Widget, SelectableOptions, SelectableEvents {
}
interface SliderOptions {
    disabled?: bool;
    max?: number;
    min?: number;
    orientation?: string;
    step?: number;
}
interface SliderUIParams {
}
interface SliderEvent {
    (event: Event, ui: SliderUIParams): void;
}
interface SliderEvents {
    change?: SliderEvent;
    create?: SliderEvent;
    slide?: SliderEvent;
    start?: SliderEvent;
    stop?: SliderEvent;
}
interface Slider extends Widget, SliderOptions, SliderEvents {
}
interface SortableOptions {
    axis?: string;
    cancel?: string;
    connectWith?: string;
    cursor?: string;
    cursorAt?: any;
    delay?: number;
    disabled?: bool;
    distance?: number;
    dropOnEmpty?: bool;
    forceHelperSize?: bool;
    forcePlaceholderSize?: bool;
    grid?: number[];
    opacity?: number;
    placeholder?: string;
    scroll?: bool;
    scrollSensitivity?: number;
    scrollSpeed?: number;
    tolerance?: string;
    zIndex?: number;
}
interface SortableUIParams {
    helper: JQuery;
    item: JQuery;
    offset: any;
    position: any;
    originalPosition: any;
    sender: JQuery;
}
interface SortableEvent {
    (event: Event, ui: SortableUIParams): void;
}
interface SortableEvents {
    activate?: SortableEvent;
    beforeStop?: SortableEvent;
    change?: SortableEvent;
    deactivate?: SortableEvent;
    out?: SortableEvent;
    over?: SortableEvent;
    receive?: SortableEvent;
    remove?: SortableEvent;
    sort?: SortableEvent;
    start?: SortableEvent;
    stop?: SortableEvent;
    update?: SortableEvent;
}
interface Sortable extends Widget, SortableOptions, SortableEvents {
}
interface SpinnerOptions {
    culture?: string;
    disabled?: bool;
    icons?: any;
    numberFormat?: string;
    page?: number;
}
interface SpinnerUIParams {
}
interface SpinnerEvent {
    (event: Event, ui: SpinnerUIParams): void;
}
interface SpinnerEvents {
    spin?: SpinnerEvent;
    start?: SpinnerEvent;
    stop?: SpinnerEvent;
}
interface Spinner extends Widget, SpinnerOptions, SpinnerEvents {
}
interface TabsOptions {
    collapsible?: bool;
    event?: string;
    heightStyle?: string;
}
interface TabsUIParams {
}
interface TabsEvent {
    (event: Event, ui: TabsUIParams): void;
}
interface TabsEvents {
    activate?: TabsEvent;
    beforeActivate?: TabsEvent;
    beforeLoad?: TabsEvent;
    load?: TabsEvent;
}
interface Tabs extends Widget, TabsOptions, TabsEvents {
}
interface TooltipOptions {
    disabled?: bool;
    items?: string;
    tooltipClass?: string;
    track?: bool;
}
interface TooltipUIParams {
}
interface TooltipEvent {
    (event: Event, ui: TooltipUIParams): void;
}
interface TooltipEvents {
    close?: TooltipEvent;
    open?: TooltipEvent;
}
interface Tooltip extends Widget, TooltipOptions, TooltipEvents {
}
interface EffectOptions {
    effect: string;
    easing?: string;
    duration: any;
    complete: Function;
}
interface BlindEffect {
    direction?: string;
}
interface BounceEffect {
    distance?: number;
    times?: number;
}
interface ClipEffect {
    direction?: number;
}
interface DropEffect {
    direction?: number;
}
interface ExplodeEffect {
    pieces?: number;
}
interface FadeEffect {
}
interface FoldEffect {
    size?: any;
    horizFirst?: bool;
}
interface HighlightEffect {
    color?: string;
}
interface PuffEffect {
    percent?: number;
}
interface PulsateEffect {
    times?: number;
}
interface ScaleEffect {
    direction?: string;
    origin?: string[];
    percent?: number;
    scale?: string;
}
interface ShakeEffect {
    direction?: string;
    distance?: number;
    times?: number;
}
interface SizeEffect {
    to?: any;
    origin?: string[];
    scale?: string;
}
interface SlideEffect {
    direction?: string;
    distance?: number;
}
interface TransferEffect {
    className?: string;
    to?: string;
}
interface JQueryPositionOptions {
    my?: string;
    at?: string;
    of?: any;
    collision?: string;
    using?: Function;
    within?: any;
}
interface MouseOptions {
    cancel?: string;
    delay?: number;
    distance?: number;
}
interface keyCode {
    BACKSPACE: number;
    COMMA: number;
    DELETE: number;
    DOWN: number;
    END: number;
    ENTER: number;
    ESCAPE: number;
    HOME: number;
    LEFT: number;
    NUMPAD_ADD: number;
    NUMPAD_DECIMAL: number;
    NUMPAD_DIVIDE: number;
    NUMPAD_ENTER: number;
    NUMPAD_MULTIPLY: number;
    NUMPAD_SUBTRACT: number;
    PAGE_DOWN: number;
    PAGE_UP: number;
    PERIOD: number;
    RIGHT: number;
    SPACE: number;
    TAB: number;
    UP: number;
}
interface UI {
    mouse(method: string): JQuery;
    mouse(options: MouseOptions): JQuery;
    mouse(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    mouse(optionLiteral: string, optionValue: any): any;
    accordion: Accordion;
    autocomplete: Autocomplete;
    button: Button;
    buttonset: Button;
    datepicker: Datepicker;
    dialog: Dialog;
    keyCode: keyCode;
    menu: Menu;
    progressbar: Progressbar;
    slider: Slider;
    spinner: Spinner;
    tabs: Tabs;
    tooltip: Tooltip;
    version: string;
}
interface WidgetOptions {
    disabled?: bool;
    hide?: any;
    show?: any;
}
interface Widget {
    (methodName: string): JQuery;
    (options: WidgetOptions): JQuery;
    (options: AccordionOptions): JQuery;
    (optionLiteral: string, optionName: string): any;
    (optionLiteral: string, options: WidgetOptions): any;
    (optionLiteral: string, optionName: string, optionValue: any): JQuery;
    (name: string, prototype: any): JQuery;
    (name: string, base: Function, prototype: any): JQuery;
}
interface JQuery {
    accordion(): JQuery;
    accordion(methodName: string): JQuery;
    accordion(options: AccordionOptions): JQuery;
    accordion(optionLiteral: string, optionName: string): any;
    accordion(optionLiteral: string, options: AccordionOptions): any;
    accordion(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    autocomplete(): JQuery;
    autocomplete(methodName: string): JQuery;
    autocomplete(options: AutocompleteOptions): JQuery;
    autocomplete(optionLiteral: string, optionName: string): any;
    autocomplete(optionLiteral: string, options: AutocompleteOptions): any;
    autocomplete(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    button(): JQuery;
    button(methodName: string): JQuery;
    button(options: ButtonOptions): JQuery;
    button(optionLiteral: string, optionName: string): any;
    button(optionLiteral: string, options: ButtonOptions): any;
    button(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    buttonset(): JQuery;
    buttonset(methodName: string): JQuery;
    buttonset(options: ButtonOptions): JQuery;
    buttonset(optionLiteral: string, optionName: string): any;
    buttonset(optionLiteral: string, options: ButtonOptions): any;
    buttonset(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    datepicker(): JQuery;
    datepicker(methodName: string): JQuery;
    datepicker(options: DatepickerOptions): JQuery;
    datepicker(optionLiteral: string, optionName: string): any;
    datepicker(optionLiteral: string, options: DatepickerOptions): any;
    datepicker(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    dialog(): JQuery;
    dialog(methodName: string): JQuery;
    dialog(options: DialogOptions): JQuery;
    dialog(optionLiteral: string, optionName: string): any;
    dialog(optionLiteral: string, options: DialogOptions): any;
    dialog(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    draggable(): JQuery;
    draggable(methodName: string): JQuery;
    draggable(options: DraggableOptions): JQuery;
    draggable(optionLiteral: string, optionName: string): any;
    draggable(optionLiteral: string, options: DraggableOptions): any;
    draggable(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    droppable(): JQuery;
    droppable(methodName: string): JQuery;
    droppable(options: DroppableOptions): JQuery;
    droppable(optionLiteral: string, optionName: string): any;
    droppable(optionLiteral: string, options: DraggableOptions): any;
    droppable(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    menu(): JQuery;
    menu(methodName: string): JQuery;
    menu(options: MenuOptions): JQuery;
    menu(optionLiteral: string, optionName: string): any;
    menu(optionLiteral: string, options: MenuOptions): any;
    menu(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    progressbar(): JQuery;
    progressbar(methodName: string): JQuery;
    progressbar(options: ProgressbarOptions): JQuery;
    progressbar(optionLiteral: string, optionName: string): any;
    progressbar(optionLiteral: string, options: ProgressbarOptions): any;
    progressbar(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    resizable(): JQuery;
    resizable(methodName: string): JQuery;
    resizable(options: ResizableOptions): JQuery;
    resizable(optionLiteral: string, optionName: string): any;
    resizable(optionLiteral: string, options: ResizableOptions): any;
    resizable(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    selectable(): JQuery;
    selectable(methodName: string): JQuery;
    selectable(options: SelectableOptions): JQuery;
    selectable(optionLiteral: string, optionName: string): any;
    selectable(optionLiteral: string, options: SelectableOptions): any;
    selectable(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    slider(): JQuery;
    slider(methodName: string): JQuery;
    slider(options: SliderOptions): JQuery;
    slider(optionLiteral: string, optionName: string): any;
    slider(optionLiteral: string, options: SliderOptions): any;
    slider(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    sortable(): JQuery;
    sortable(methodName: string): JQuery;
    sortable(options: SortableOptions): JQuery;
    sortable(optionLiteral: string, optionName: string): any;
    sortable(optionLiteral: string, options: SortableOptions): any;
    sortable(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    spinner(): JQuery;
    spinner(methodName: string): JQuery;
    spinner(options: SpinnerOptions): JQuery;
    spinner(optionLiteral: string, optionName: string): any;
    spinner(optionLiteral: string, options: SpinnerOptions): any;
    spinner(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    tabs(): JQuery;
    tabs(methodName: string): JQuery;
    tabs(options: TabsOptions): JQuery;
    tabs(optionLiteral: string, optionName: string): any;
    tabs(optionLiteral: string, options: TabsOptions): any;
    tabs(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    tooltip(): JQuery;
    tooltip(methodName: string): JQuery;
    tooltip(options: TooltipOptions): JQuery;
    tooltip(optionLiteral: string, optionName: string): any;
    tooltip(optionLiteral: string, options: TooltipOptions): any;
    tooltip(optionLiteral: string, optionName: string, optionValue: any): JQuery;
    addClass(classNames: string, speed?: number, callback?: Function): JQuery;
    addClass(classNames: string, speed?: string, callback?: Function): JQuery;
    addClass(classNames: string, speed?: number, easing?: string, callback?: Function): JQuery;
    addClass(classNames: string, speed?: string, easing?: string, callback?: Function): JQuery;
    removeClass(classNames: string, speed?: number, callback?: Function): JQuery;
    removeClass(classNames: string, speed?: string, callback?: Function): JQuery;
    removeClass(classNames: string, speed?: number, easing?: string, callback?: Function): JQuery;
    removeClass(classNames: string, speed?: string, easing?: string, callback?: Function): JQuery;
    switchClass(removeClassName: string, addClassName: string, duration?: number, easing?: string, complete?: Function): JQuery;
    switchClass(removeClassName: string, addClassName: string, duration?: string, easing?: string, complete?: Function): JQuery;
    toggleClass(className: string, duration?: number, easing?: string, complete?: Function): JQuery;
    toggleClass(className: string, duration?: string, easing?: string, complete?: Function): JQuery;
    toggleClass(className: string, aswitch?: bool, duration?: number, easing?: string, complete?: Function): JQuery;
    toggleClass(className: string, aswitch?: bool, duration?: string, easing?: string, complete?: Function): JQuery;
    effect(options: any): JQuery;
    effect(effect: string, options?: any, duration?: number, complete?: Function): JQuery;
    effect(effect: string, options?: any, duration?: string, complete?: Function): JQuery;
    hide(options: any): JQuery;
    hide(effect: string, options?: any, duration?: number, complete?: Function): JQuery;
    hide(effect: string, options?: any, duration?: string, complete?: Function): JQuery;
    show(options: any): JQuery;
    show(effect: string, options?: any, duration?: number, complete?: Function): JQuery;
    show(effect: string, options?: any, duration?: string, complete?: Function): JQuery;
    toggle(options: any): JQuery;
    toggle(effect: string, options?: any, duration?: number, complete?: Function): JQuery;
    toggle(effect: string, options?: any, duration?: string, complete?: Function): JQuery;
    enableSelection(): JQuery;
    disableSelection(): JQuery;
    focus(delay: number, callback?: Function): JQuery;
    uniqueId(): JQuery;
    removeUniqueId(): JQuery;
    scrollParent(): JQuery;
    zIndex(): JQuery;
    zIndex(zIndex: number): JQuery;
    position(options: JQueryPositionOptions): JQuery;
    widget: Widget;
    jQuery: JQueryStatic;
}
interface JQueryStatic {
    ui: UI;
    datepicker: Datepicker;
    widget: Widget;
    Widget: Widget;
}
module akra.ui {
    /**@const*/ 
    var $document: JQuery;
    /**@const*/ 
    var $body: JQuery;
    class Node extends util.Entity implements IUINode {
        /**@protected*/ 
        public _pUI: IUI;
        /**@protected*/ 
        public _eNodeType: EUINodeTypes;
        /**@inline*/ 
        public ui : IUI;
        /**@inline*/ 
        public nodeType : EUINodeTypes;
        constructor(pParent: IUINode, eNodeType?: EUINodeTypes);
        constructor(pUI: IUI, eNodeType?: EUINodeTypes);
        public render(): bool;
        public render(pParent: IUINode): bool;
        public render(pElement: HTMLElement): bool;
        public render(sSelector: string): bool;
        public recursiveRender(): void;
        public renderTarget(): JQuery;
        public hasRenderTarget(): bool;
        public addChild(pChild: IEntity): IEntity;
        public attachToParent(pParent: IUINode): bool;
        /**@protected*/ 
        public findRenderTarget(): IUINode;
        public relocated(pLocation: IUINode): void;
    }
    function isUI(parent: IUINode): bool;
    function isUI(parent: IUI): bool;
    function getUI(parent: IUINode): IUI;
    function getUI(parent: IUI): IUI;
    /**@inline*/ 
    function isUINode(pEntity: IEntity): bool;
    /**@inline*/ 
    function isLayout(pEntity: IEntity): bool;
    /**@inline*/ 
    function containsHTMLElement(pEntity: IEntity): bool;
}
module akra.ui {
    class HTMLNode extends Node implements IUIHTMLNode {
        public $element: JQuery;
        /**@protected*/ 
        public _fnEventRedirector: Function;
        /**@inline*/ 
        public el : JQuery;
        constructor(parent, pElement?: HTMLElement, eNodeType?: EUINodeTypes);
        constructor(parent, $element?: JQuery, eNodeType?: EUINodeTypes);
        public handleEvent(sEvent: string): bool;
        public disableEvent(sEvent: string): void;
        public hasRenderTarget(): bool;
        public renderTarget(): JQuery;
        /**@inline*/ 
        public getHTMLElement(): HTMLElement;
        public render(): bool;
        public render(pParent: IUINode): bool;
        public render(pElement: HTMLElement): bool;
        public render(pElement: JQuery): bool;
        public render(sSelector: string): bool;
        public attachToParent(pParent: IUINode, bRender?: bool): bool;
        public isFocused(): bool;
        public isRendered(): bool;
        public destroy(bRecursive?: bool, bPromoteChildren?: bool): void;
        /**@inline*/ 
        public width(): number;
        /**@inline*/ 
        public height(): number;
        public valueOf(): JQuery;
        public hide(): void;
        public show(): void;
        /**@protected*/ 
        public self(): JQuery;
        public click(e): void;
        public dblclick(e): void;
        public mousemove(e): void;
        public mouseup(e): void;
        public mousedown(e): void;
        public mouseover(e): void;
        public mouseout(e): void;
        public mouseenter(e): void;
        public mouseleave(e): void;
        public focusin(e): void;
        public focusout(e): void;
        public blur(e): void;
        public change(e): void;
        public keydown(e): void;
        public keyup(e): void;
        public resize(): void;
        public rendered(): void;
        public beforeRender(): void;
        static EVENTS: string[];
    }
}
module akra {
    interface IUIDNDNode extends IUIHTMLNode {
        setDraggable(bValue?: bool): void;
        isDraggable(): bool;
        dragStart(e: IUIEvent): void;
        dragStop(e: IUIEvent): void;
        move(e: IUIEvent): void;
        drop(e: IUIEvent): void;
    }
}
module akra.ui {
    class DNDNode extends HTMLNode implements IUIDNDNode {
        /**@protected*/ 
        public _bDraggableInited: bool;
        /**@protected*/ 
        public _bDroppableInited: bool;
        constructor(parent, element?, eNodeType?: EUINodeTypes);
        /**@inline*/ 
        public isDraggable(): bool;
        public setDraggable(bValue?: bool): void;
        public setDroppable(bValue?: bool): void;
        public attachToParent(pParent: IUINode, bRender?: bool): bool;
        public dragStart(e): void;
        public dragStop(e): void;
        public move(e): void;
        public drop(e): void;
    }
}
module akra {
    interface IUIComponentType {
        new(...argv: any[]): IUIComponent;
    }
    interface IUIComponentOptions {
        show?: bool;
        name?: string;
        html?: string;
        css?: any;
        class?: string;
        width?: number;
        height?: number;
        draggable?: bool;
        renderTo?: any;
        dragZone?: any;
        generic?: string;
        layout?: any;
        events?: any;
        parent?: IUIComponent;
    }
    enum EUIComponents {
        UNKNOWN,
        WINDOW,
        BUTTON,
        SWITCH,
        PANEL,
        TABS,
        LABEL,
        VECTOR,
        TREE,
        TREE_NODE,
        CANVAS,
        SLIDER,
        CHECKBOX,
        CHECKBOX_LIST,
        VIEWPORT_STATS,
        GRAPH,
        GRAPH_NODE,
        GRAPH_CONNECTOR,
        GRAPH_CONTROLS,
        GRAPH_CONNECTIONAREA,
    }
    interface IUIComponent extends IUIDNDNode {
        componentType: EUIComponents;
        genericType: string;
        layout: IUILayout;
        isGeneric(): bool;
        setLayout(eType: EUILayouts): bool;
        setLayout(sType: string): bool;
        createComponent(sType: string, pOptions?: IUIComponentOptions): IUIComponent;
        _createdFrom($component: JQuery): void;
        template(sURL: string, pData?: any): void;
    }
}
module akra {
    enum EAjaxDataTypes {
        TEXT,
        JSON,
        BLOB,
        ARRAY_BUFFER,
        DOCUMENT,
    }
    enum EAjaxHttpMethods {
        GET,
        POST,
    }
    enum EAjaxHttpCodes {
        OK,
        CREATED,
        ACCEPTED,
        PARTIAL_INFORMATION,
        MOVED,
        FOUND,
        METHOD,
        NOT_MODIFIED,
        BAD_REQUEST,
        UNAUTHORIZED,
        PAYMENT_REQUIRED,
        FORBIDDEN,
        NOT_FOUND,
        INTERNAL_ERROR,
        NOT_IMPLEMENTED,
        SERVICE_TEMPORARILY_OVERLOADED,
        GATEWAY_TIMEOUT,
    }
    interface IAjaxStatusCodeCallback {
        (code: number): void;
    }
    interface IAjaxStatusCodeMap {
        [code: number]: IAjaxStatusCodeCallback;
    }
    interface IAjaxErrorCallback {
        (request?: XMLHttpRequest, statusText?: string, error?: Error): void;
    }
    interface IAjaxSuccessCallback {
        (data?: any, statusText?: string, request?: XMLHttpRequest): void;
    }
    interface IAjaxBeforeSendCallback {
        (request?: XMLHttpRequest, settings?: IAjaxParams): bool;
    }
    interface IAjaxParams {
        url?: string;
        async?: bool;
        statusCode?: IAjaxStatusCodeMap;
        success?: IAjaxSuccessCallback;
        error?: IAjaxErrorCallback;
        beforeSend?: IAjaxBeforeSendCallback;
        data?: Object;
        cache?: bool;
        contentType?: string;
        dataType?: EAjaxDataTypes;
        type?: EAjaxHttpMethods;
        timeout?: number;
    }
    interface IAjaxResultSync {
        data: any;
        statusText: string;
        xhr: XMLHttpRequest;
    }
}
module akra.io {
    function stringToHttpMethod(sMethod: string): EAjaxHttpMethods;
    function stringToAjaxDataType(sDataType: string): EAjaxDataTypes;
    function ajaxDataTypeToXHRResponseType(eDataType: EAjaxDataTypes): string;
    function createXMLHttpRequest(): XMLHttpRequest;
    function queryString(pData: any, sPrefix?: string): string;
    var ajax: {
        (sUrl: string, pSettings?: IAjaxParams, pRequest?: XMLHttpRequest): IAjaxResultSync;
        (pSettings: IAjaxParams, pRequest?: XMLHttpRequest): IAjaxResultSync;
    };
}
interface BoundingBox {
    x: number;
    y: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
}
interface RaphaelAnimation {
    delay(delay: number): RaphaelAnimation;
    repeat(repeat: number): RaphaelAnimation;
}
interface RaphaelFont {
}
interface RaphaelElement {
    animate(params: {
            [key: string]: any;
        }, ms: number, easing?: string, callback?: Function): RaphaelElement;
    animate(animation: RaphaelAnimation): RaphaelElement;
    animateWith(el: RaphaelElement, anim: RaphaelAnimation, params: any, ms: number, easing?: string, callback?: Function): RaphaelElement;
    animateWith(el: RaphaelElement, anim: RaphaelAnimation, animation: RaphaelAnimation): RaphaelElement;
    attr(attrName: string, value: any): RaphaelElement;
    attr(params: {
            [key: string]: any;
        }): RaphaelElement;
    attr(attrName: string): any;
    attr(attrNames: string[]): any[];
    click(handler: Function): RaphaelElement;
    clone(): RaphaelElement;
    data(key: string): any;
    data(key: string, value: any): RaphaelElement;
    dblclick(handler: Function): RaphaelElement;
    drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) => {}, onstart: (x: number, y: number, event: DragEvent) => {}, onend: (DragEvent: any) => {}, mcontext?: any, scontext?: any, econtext?: any): RaphaelElement;
    getBBox(isWithoutTransform?: bool): BoundingBox;
    glow(glow?: {
            width?: number;
            fill?: bool;
            opacity?: number;
            offsetx?: number;
            offsety?: number;
            color?: string;
        }): RaphaelSet;
    hide(): RaphaelElement;
    hover(f_in: Function, f_out: Function, icontext?: any, ocontext?: any): RaphaelElement;
    id: string;
    insertAfter(): RaphaelElement;
    insertBefore(): RaphaelElement;
    isPointInside(x: number, y: number): bool;
    isVisible(): bool;
    matrix: RaphaelMatrix;
    mousedown(handler: Function): RaphaelElement;
    mousemove(handler: Function): RaphaelElement;
    mouseout(handler: Function): RaphaelElement;
    mouseover(handler: Function): RaphaelElement;
    mouseup(handler: Function): RaphaelElement;
    next: RaphaelElement;
    node: Element;
    onDragOver(f: Function): RaphaelElement;
    paper: RaphaelPaper;
    pause(anim?: RaphaelAnimation): RaphaelElement;
    prev: RaphaelElement;
    raphael: RaphaelStatic;
    remove();
    removeData(key?: string): RaphaelElement;
    resume(anim?: RaphaelAnimation): RaphaelElement;
    setTime(anim: RaphaelAnimation);
    setTime(anim: RaphaelAnimation, value: number): RaphaelElement;
    show(): RaphaelElement;
    status(): {
        anim: RaphaelAnimation;
        status: number;
    }[];
    status(anim: RaphaelAnimation): number;
    status(anim: RaphaelAnimation, value: number): RaphaelElement;
    stop(anim?: RaphaelAnimation): RaphaelElement;
    toBack(): RaphaelElement;
    toFront(): RaphaelElement;
    touchcancel(handler: Function): RaphaelElement;
    touchend(handler: Function): RaphaelElement;
    touchmove(handler: Function): RaphaelElement;
    touchstart(handler: Function): RaphaelElement;
    transform(): string;
    transform(tstr: string): RaphaelElement;
    unclick(handler?): RaphaelElement;
    undblclick(handler?): RaphaelElement;
    undrag(): RaphaelElement;
    unhover(): RaphaelElement;
    unhover(f_in, f_out): RaphaelElement;
    unmousedown(handler?): RaphaelElement;
    unmousemove(handler?): RaphaelElement;
    unmouseout(handler?): RaphaelElement;
    unmouseover(handler?): RaphaelElement;
    unmouseup(handler?): RaphaelElement;
    untouchcancel(handler?): RaphaelElement;
    untouchend(handler?): RaphaelElement;
    untouchmove(handler?): RaphaelElement;
    untouchstart(handler?): RaphaelElement;
}
interface RaphaelPath extends RaphaelElement {
    getPointAtLength(length: number): {
        x: number;
        y: number;
        alpha: number;
    };
    getSubpath(from: number, to: number): string;
    getTotalLength(): number;
}
interface RaphaelSet {
    clear();
    exclude(element: RaphaelElement): bool;
    forEach(callback: Function, thisArg?: any): RaphaelSet;
    pop(): RaphaelElement;
    push(...RaphaelElement: any[]): RaphaelElement;
    splice(index: number, count: number): RaphaelSet;
    splice(index: number, count: number, ...insertion: RaphaelElement[]): RaphaelSet;
    length: number;
    [key: number]: RaphaelElement;
    animate(params: {
            [key: string]: any;
        }, ms: number, easing?: string, callback?: Function): RaphaelElement;
    animate(animation: RaphaelAnimation): RaphaelElement;
    animateWith(el: RaphaelElement, anim: RaphaelAnimation, params: any, ms: number, easing?: string, callback?: Function): RaphaelElement;
    animateWith(el: RaphaelElement, anim: RaphaelAnimation, animation: RaphaelAnimation): RaphaelElement;
    attr(attrName: string, value: any): RaphaelElement;
    attr(params: {
            [key: string]: any;
        }): RaphaelElement;
    attr(attrName: string): any;
    attr(attrNames: string[]): any[];
    click(handler: Function): RaphaelElement;
    clone(): RaphaelElement;
    data(key: string): any;
    data(key: string, value: any): RaphaelElement;
    dblclick(handler: Function): RaphaelElement;
    drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) => {}, onstart: (x: number, y: number, event: DragEvent) => {}, onend: (DragEvent: any) => {}, mcontext?: any, scontext?: any, econtext?: any): RaphaelElement;
    getBBox(isWithoutTransform?: bool): BoundingBox;
    glow(glow?: {
            width?: number;
            fill?: bool;
            opacity?: number;
            offsetx?: number;
            offsety?: number;
            color?: string;
        }): RaphaelSet;
    hide(): RaphaelElement;
    hover(f_in: Function, f_out: Function, icontext?: any, ocontext?: any): RaphaelElement;
    id: string;
    insertAfter(): RaphaelElement;
    insertBefore(): RaphaelElement;
    isPointInside(x: number, y: number): bool;
    isVisible(): bool;
    matrix: RaphaelMatrix;
    mousedown(handler: Function): RaphaelElement;
    mousemove(handler: Function): RaphaelElement;
    mouseout(handler: Function): RaphaelElement;
    mouseover(handler: Function): RaphaelElement;
    mouseup(handler: Function): RaphaelElement;
    next: RaphaelElement;
    onDragOver(f: Function): RaphaelElement;
    paper: RaphaelPaper;
    pause(anim?: RaphaelAnimation): RaphaelElement;
    prev: RaphaelElement;
    raphael: RaphaelStatic;
    remove();
    removeData(key?: string): RaphaelElement;
    resume(anim?: RaphaelAnimation): RaphaelElement;
    setTime(anim: RaphaelAnimation);
    setTime(anim: RaphaelAnimation, value: number): RaphaelElement;
    show(): RaphaelElement;
    status(): {
        anim: RaphaelAnimation;
        status: number;
    }[];
    status(anim: RaphaelAnimation): number;
    status(anim: RaphaelAnimation, value: number): RaphaelElement;
    stop(anim?: RaphaelAnimation): RaphaelElement;
    toBack(): RaphaelElement;
    toFront(): RaphaelElement;
    touchcancel(handler: Function): RaphaelElement;
    touchend(handler: Function): RaphaelElement;
    touchmove(handler: Function): RaphaelElement;
    touchstart(handler: Function): RaphaelElement;
    transform(): string;
    transform(tstr: string): RaphaelElement;
    unclick(handler?): RaphaelElement;
    undblclick(handler?): RaphaelElement;
    undrag(): RaphaelElement;
    unhover(): RaphaelElement;
    unhover(f_in, f_out): RaphaelElement;
    unmousedown(handler?): RaphaelElement;
    unmousemove(handler?): RaphaelElement;
    unmouseout(handler?): RaphaelElement;
    unmouseover(handler?): RaphaelElement;
    unmouseup(handler?): RaphaelElement;
    untouchcancel(handler?): RaphaelElement;
    untouchend(handler?): RaphaelElement;
    untouchmove(handler?): RaphaelElement;
    untouchstart(handler?): RaphaelElement;
}
interface RaphaelMatrix {
    add(a: number, b: number, c: number, d: number, e: number, f: number, matrix: RaphaelMatrix): RaphaelMatrix;
    clone(): RaphaelMatrix;
    invert(): RaphaelMatrix;
    rotate(a: number, x: number, y: number);
    scale(x: number, y?: number, cx?: number, cy?: number);
    split(): {
        dx: number;
        dy: number;
        scalex: number;
        scaley: number;
        shear: number;
        rotate: number;
        isSimple: bool;
    };
    toTransformString(): string;
    translate(x: number, y: number);
    x(x: number, y: number);
    y(x: number, y: number);
}
interface RaphaelPaper {
    add(JSON): RaphaelSet;
    bottom: RaphaelElement;
    canvas: Element;
    circle(x: number, y: number, r: number): RaphaelElement;
    clear();
    defs: Element;
    ellipse(x: number, y: number, rx: number, ry: number): RaphaelElement;
    forEach(callback: number, thisArg: any): RaphaelStatic;
    getById(id: number): RaphaelElement;
    getElementByPoint(x: number, y: number): RaphaelElement;
    getElementsByPoint(x: number, y: number): RaphaelSet;
    getFont(family: string, weight?: string, style?: string, stretch?: string): RaphaelFont;
    getFont(family: string, weight?: number, style?: string, stretch?: string): RaphaelFont;
    height: number;
    image(src: string, x: number, y: number, width: number, height: number): RaphaelElement;
    path(pathString?: string): RaphaelPath;
    print(x: number, y: number, str: string, font: RaphaelFont, size?: number, origin?: string, letter_spacing?: number): RaphaelPath;
    rect(x: number, y: number, width: number, height: number, r?: number): RaphaelElement;
    remove();
    renderfix();
    safari();
    set(elements?: RaphaelElement[]): RaphaelSet;
    setFinish();
    setSize(width: number, height: number);
    setStart();
    setViewBox(x: number, y: number, w: number, h: number, fit: bool);
    text(x: number, y: number, text: string): RaphaelElement;
    top: RaphaelElement;
    width: number;
}
interface RaphaelStatic {
    (container: HTMLElement, width: number, height: number, callback?: Function): RaphaelPaper;
    (container: string, width: number, height: number, callback?: Function): RaphaelPaper;
    (x: number, y: number, width: number, height: number, callback?: Function): RaphaelPaper;
    (all: Array, callback?: Function): RaphaelPaper;
    (onReadyCallback?: Function): RaphaelPaper;
    angle(x1: number, y1: number, x2: number, y2: number, x3?: number, y3?: number): number;
    animation(params: any, ms: number, easing?: string, callback?: Function): RaphaelAnimation;
    bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): {
        min: {
            x: number;
            y: number;
        };
        max: {
            x: number;
            y: number;
        };
    };
    bezierBBox(bez: Array): {
        min: {
            x: number;
            y: number;
        };
        max: {
            x: number;
            y: number;
        };
    };
    color(clr: string): {
        r: number;
        g: number;
        b: number;
        hex: string;
        error: bool;
        h: number;
        s: number;
        v: number;
        l: number;
    };
    createUUID(): string;
    deg(deg: number): number;
    easing_formulas: any;
    el: any;
    findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number): {
        x: number;
        y: number;
        m: {
            x: number;
            y: number;
        };
        n: {
            x: number;
            y: number;
        };
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        alpha: number;
    };
    fn: any;
    format(token: string, ...parameters: any[]): string;
    fullfill(token: string, json: JSON): string;
    getColor(value?: number): string;
    getPointAtLength(path: string, length: number): {
        x: number;
        y: number;
        alpha: number;
    };
    getRGB(colour: string): {
        r: number;
        g: number;
        b: number;
        hex: string;
        error: bool;
    };
    getSubpath(path: string, from: number, to: number): string;
    getTotalLength(path: string): number;
    hsb(h: number, s: number, b: number): string;
    hsb2rgb(h: number, s: number, v: number): {
        r: number;
        g: number;
        b: number;
        hex: string;
    };
    hsl(h: number, s: number, l: number): string;
    hsl2rgb(h: number, s: number, l: number): {
        r: number;
        g: number;
        b: number;
        hex: string;
    };
    is(o: any, type: string): bool;
    isBBoxIntersect(bbox1: string, bbox2: string): bool;
    isPointInsideBBox(bbox: string, x: number, y: number): bool;
    isPointInsidePath(path: string, x: number, y: number): bool;
    matrix(a: number, b: number, c: number, d: number, e: number, f: number): RaphaelMatrix;
    ninja();
    parsePathString(pathString: string): string[];
    parsePathString(pathString: string[]): string[];
    parseTransformString(TString: string): string[];
    parseTransformString(TString: string[]): string[];
    path2curve(pathString: string): string[];
    path2curve(pathString: string[]): string[];
    pathBBox(path: string): BoundingBox;
    pathIntersection(path1: string, path2: string): {
        x: number;
        y: number;
        t1: number;
        t2: number;
        segment1: number;
        segment2: number;
        bez1: Array;
        bez2: Array;
    }[];
    pathToRelative(pathString: string): string[];
    pathToRelative(pathString: string[]): string[];
    rad(deg: number): number;
    registerFont(font: RaphaelFont): RaphaelFont;
    rgb(r: number, g: number, b: number): string;
    rgb2hsb(r: number, g: number, b: number): {
        h: number;
        s: number;
        b: number;
    };
    rgb2hsl(r: number, g: number, b: number): {
        h: number;
        s: number;
        l: number;
    };
    setWindow(newwin: Window);
    snapTo(values: number, value: number, tolerance?: number): number;
    snapTo(values: number[], value: number, tolerance?: number): number;
    st: any;
    svg: bool;
    toMatrix(path: string, transform: string): RaphaelMatrix;
    toMatrix(path: string, transform: string[]): RaphaelMatrix;
    transformPath(path: string, transform: string): string;
    transformPath(path: string, transform: string[]): string;
    type: string;
    vml: bool;
}
interface SwigOptions {
    allowErrors?: bool;
    autoescape?: bool;
    cache?: bool;
    encoding?: string;
    filters?: any;
    root?: string;
    tags?: any;
    extensions?: any;
    tzOffset?: number;
}
interface SwigTemplate {
    (data: any): string;
}
interface Swig {
    init(pOptions?: SwigOptions): void;
    compileFile(file: string): SwigTemplate;
    compile(template: string, info: any): SwigTemplate;
}
module akra.ui {
    function template(pNode: IUIComponent, sUrl: string, pData?: any): void;
    var COMPONENTS: {
        [type: string]: IUIComponentType;
    };
    class Component extends DNDNode implements IUIComponent {
        /**@protected*/ 
        public _eComponentType: EUIComponents;
        /**@protected*/ 
        public _sGenericType: string;
        /**@inline*/ 
        public componentType : EUIComponents;
        /**@inline*/ 
        public genericType : string;
        /**@inline*/ /**@inline*/ 
        public name : string;
        public layout : IUILayout;
        constructor(parent, sName?: string, eType?: EUIComponents, $el?: JQuery);
        constructor(parent, pOptions?: IUIComponentOptions, eType?: EUIComponents, $el?: JQuery);
        public template(sUrl: string, pData?: any): void;
        public rendered(): void;
        /**@inline*/ 
        public isGeneric(): bool;
        public setLayout(eType: EUILayouts): bool;
        public setLayout(sType: string): bool;
        public attachToParent(pParent: IUINode, bRender?: bool): bool;
        /**@protected*/ 
        public applyOptions(pOptions: IUIComponentOptions): void;
        public createComponent(sType: string, pOptions?: IUIComponentOptions): IUIComponent;
        public _createdFrom($comp: JQuery): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
    /**@inline*/ 
    function register(sType: string, pComponent: IUIComponentType): void;
    function isComponent(pEntity: IEntity, eComponent?: EUIComponents): bool;
    /**@inline*/ 
    function isGeneric(pEntity: IEntity): bool;
    function mergeOptions(sNameLeft: string, pOptionsRight: IUIComponentOptions): IUIComponentOptions;
    function mergeOptions(sNameLeft: string, sNameRight: string): IUIComponentOptions;
    function mergeOptions(pOptionsLeft: IUIComponentOptions, pOptionsRight: IUIComponentOptions): IUIComponentOptions;
}
module akra {
    interface IUIPanelOptions extends IUIComponentOptions {
        title?: string;
    }
    interface IUIPanel extends IUIComponent {
        title: string;
        index: number;
        isCollapsible(): bool;
        setCollapsible(bValue?: bool): void;
        titleUpdated(sTitle: string): void;
    }
}
module akra.ui {
    class Panel extends Component implements IUIPanel {
        public index: number;
        /**@protected*/ 
        public $title: JQuery;
        /**@protected*/ 
        public $controls: JQuery;
        /**@inline*/ /**@inline*/ 
        public title : string;
        constructor(parent, options?, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        public rendered(): void;
        /**@inline*/ 
        public isCollapsible(): bool;
        public setCollapsible(bValue?: bool): void;
        public titleUpdated(sTitle): void;
    }
    function isPanel(pEntity: IEntity): bool;
}
module akra {
    interface IUIPanel {
    }
    interface IUITabs extends IUIComponent {
        active: IUIPanel;
        select(i: number);
        select(pPanel: IUIPanel);
        findTabByTitle(sName: string): number;
        tabIndex(pPanel: IUIPanel): number;
    }
}
module akra.ui {
    class Tabs extends Component implements IUITabs {
        /**@protected*/ 
        public _pTabs: IUIPanel[];
        /**@protected*/ 
        public _iActiveTab: number;
        /**@protected*/ 
        public $bookmarks: JQuery;
        /**@inline*/ 
        public active : IUIPanel;
        /**@inline*/ 
        public length : number;
        constructor(parent, options?, eType?: EUIComponents);
        public addChild(pEntity: IEntity): IEntity;
        public tabIndex(pPanel: IUIPanel): number;
        public findTabByTitle(sName: string): number;
        public select(panel): void;
        public _tabTitleUpdated(pPanel: IUIPanel, sTitle: string): void;
        /**@protected*/ /**@inline*/ 
        public bookmarkFor(pPanel: IUIPanel): JQuery;
        /**@protected*/ 
        public createBookmarkFor(pPanel: IUIPanel): void;
    }
}
module akra {
    interface IUIButtonOptions extends IUIComponentOptions {
        text?: string;
    }
    interface IUIButton extends IUIComponent {
        text: string;
    }
}
module akra.ui {
    class Button extends Component implements IUIButton {
        /**@inline*/ /**@inline*/ 
        public text : string;
        constructor(ui, options?, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        /**@protected*/ 
        public applyOptions(pOptions: IUIButtonOptions): void;
    }
}
module akra {
    interface IUISwitch extends IUIComponent {
        value: bool;
        isOn(): bool;
        changed(bValue: bool): void;
        _setValue(bValue: bool): void;
    }
}
module akra.ui {
    class Switch extends Component implements IUISwitch {
        private $checkbox;
        /**@inline*/ /**@inline*/ 
        public value : bool;
        constructor(parent, options?, eType?: EUIComponents);
        /**@inline*/ 
        public _setValue(bValue: bool): void;
        public _createdFrom($comp: JQuery): void;
        /**@inline*/ 
        public isOn(): bool;
        public changed(bValue): void;
    }
}
module akra {
    interface IUILabelOptions extends IUIComponentOptions {
        text?: string;
        editable?: bool;
    }
    interface IUILabel extends IUIComponent {
        text: string;
        postfix: string;
        changed(value: string): void;
        editable(bValue?: bool): void;
        isEditable(): bool;
    }
}
module akra.ui {
    class Label extends Component implements IUILabel {
        /**@protected*/ 
        public $text: JQuery;
        /**@protected*/ 
        public $input: JQuery;
        /**@protected*/ 
        public _bEditable: bool;
        /**@protected*/ 
        public _sPostfix: string;
        /**@inline*/ /**@inline*/ 
        public text : string;
        /**@inline*/ /**@inline*/ 
        public postfix : string;
        constructor(ui, options?, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        /**@inline*/ 
        public isEditable(): bool;
        public editable(bValue?: bool): void;
        public rendered(): void;
        public click(e: IUIEvent): void;
        public keydown(e: IUIEvent): void;
        public focusout(e: IUIEvent): void;
        public changed(value): void;
    }
}
module akra {
    interface IVec2 {
    }
    interface IVec3 {
    }
    interface IVec4 {
    }
    interface IUIVector extends IUIComponent {
        x: IUILabel;
        y: IUILabel;
        z: IUILabel;
        w: IUILabel;
        totalComponents: number;
        value: any;
        toVec2(): IVec2;
        toVec3(): IVec3;
        toVec4(): IVec4;
        setVec2(v: IVec2): void;
        setVec3(v: IVec3): void;
        setVec4(v: IVec4): void;
        isEditable(): bool;
        editable(bValue?: bool): void;
    }
}
module akra.ui {
    class Vector extends Component implements IUIVector {
        public x: IUILabel;
        public y: IUILabel;
        public z: IUILabel;
        public w: IUILabel;
        public totalComponents: number;
        /**@protected*/ 
        public _iFixed: number;
        /**@protected*/ 
        public _bEditable: bool;
        /**@inline*/ 
        public value : any;
        constructor(ui, options?, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        public editable(bValue?: bool): void;
        /**@inline*/ 
        public isEditable(): bool;
        public changed(): void;
        /**@protected*/ 
        public useComponents(n: number): void;
        public setVec2(v: IVec2): void;
        public setVec3(v: IVec3): void;
        public setVec4(v: IVec4): void;
        public toVec2(): IVec2;
        public toVec3(): IVec3;
        public toVec4(): IVec4;
        public rendered(): void;
    }
}
module akra.ui {
    class Layout extends HTMLNode implements IUILayout {
        /**@protected*/ 
        public _eLayoutType: EUILayouts;
        /**@protected*/ 
        public _pAttrs: IUILayoutAttributes;
        /**@inline*/ 
        public layoutType : EUILayouts;
        constructor(parent, pElement?: HTMLElement, eType?: EUILayouts);
        constructor(parent, pElement?: JQuery, eType?: EUILayouts);
        public attachToParent(pParent: IUINode): bool;
        /**@inline*/ 
        public attr(sAttr: string): any;
        public setAttributes(pAttrs: IUILayoutAttributes): void;
        public childAdded(pChild: IEntity): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
}
module akra.ui {
    class Horizontal extends Layout {
        /**@protected*/ 
        public $row: JQuery;
        /**@protected*/ 
        public $table: JQuery;
        constructor(parent);
        public renderTarget(): JQuery;
        public removeChild(pChild: IEntity): IEntity;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
}
module akra.ui {
    class Vertical extends Layout {
        /**@protected*/ 
        public $table: JQuery;
        constructor(parent);
        public renderTarget(): JQuery;
        public removeChild(pChild: IEntity): IEntity;
        public toString(isRecursive?: bool, iDepth?: number): string;
    }
}
module akra {
    interface IUISlider extends IUIComponent {
        pin: IUIComponent;
        value: number;
        range: number;
    }
}
module akra.ui {
    class Slider extends Component implements IUISlider {
        /**@protected*/ 
        public _fRange: number;
        /**@protected*/ 
        public _fValue: number;
        /**@protected*/ 
        public $progress: JQuery;
        /**@protected*/ 
        public $text: JQuery;
        /**@inline*/ 
        public pin : IUIComponent;
        /**@inline*/ 
        public value : number;
        /**@inline*/ /**@inline*/ 
        public range : number;
        constructor(parent, options?, eType?: EUIComponents);
        public rendered(): void;
        public _updated(pPin: IUIComponent, e: IUIEvent): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
        public updated(value): void;
    }
}
module akra {
    interface IUICheckboxOptions extends IUIComponentOptions {
        text?: string;
    }
    interface IUICheckbox extends IUIComponent {
        checked: bool;
        text: string;
        isChecked(): bool;
        changed(bValue: bool): void;
        _setValue(bValue: bool): void;
    }
}
module akra {
    interface IUICheckbox {
    }
    interface IUICheckboxList extends IUIComponent {
        length: number;
        items: IUICheckbox[];
        checked: IUICheckbox;
        radio: bool;
        hasMultiSelect(): bool;
        changed(pCheckbox: IUICheckbox);
    }
}
module akra.ui {
    class Checkbox extends Component implements IUICheckbox {
        /**@protected*/ 
        public _bChecked: bool;
        /**@protected*/ 
        public $text: JQuery;
        /**@inline*/ /**@inline*/ 
        public checked : bool;
        /**@inline*/ /**@inline*/ 
        public text : string;
        public _setValue(bValue: bool): void;
        constructor(parent, options?: IUICheckboxOptions, eType?: EUIComponents);
        constructor(parent, name?: string, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        public rendered(): void;
        /**@inline*/ 
        public isChecked(): bool;
        public click(e: IUIEvent): void;
        public toString(isRecursive?: bool, iDepth?: number): string;
        public changed(value): void;
    }
    /**@inline*/ 
    function isCheckbox(pEntity: IEntity): bool;
}
module akra.ui {
    class CheckboxList extends Component implements IUICheckboxList {
        private _nSize;
        private _pItems;
        private _bMultiSelect;
        private _bLikeRadio;
        /**@inline*/ 
        public length : number;
        /**@inline*/ /**@inline*/ 
        public radio : bool;
        /**@inline*/ 
        public items : IUICheckbox[];
        /**@inline*/ 
        public checked : IUICheckbox;
        constructor(parent, options?, eType?: EUIComponents);
        public _createdFrom($comp: JQuery): void;
        public rendered(): void;
        /**@inline*/ 
        public hasMultiSelect(): bool;
        public update(): bool;
        /**@protected*/ 
        public addCheckbox(pCheckbox: IUICheckbox): void;
        public _childAdded(pLayout: IUILayout, pNode: IUINode): void;
        public _childRemoved(pLayout: IUILayout, pNode: IUINode): void;
        public _changed(pCheckbox: IUICheckbox, bCheked: bool): void;
        public changed(pCheckbox): void;
    }
}
module akra {
    interface IUIWindowOptions extends IUIComponentOptions {
        title?: string;
    }
    interface IUIWindow extends IUIComponent {
    }
}
module akra.ui {
    class Window extends Component implements IUIWindow {
        /**@protected*/ 
        public _pWindow;
        /**@protected*/ 
        public $document;
        constructor(pUI: IUI, options?: IUIWindowOptions);
    }
}
module akra {
    interface IUIRenderTargetStats extends IUIComponent {
        target: IRenderTarget;
    }
}
module akra.ui {
    class RenderTargetStats extends Component implements IUIRenderTargetStats {
        /**@protected*/ 
        public _pInfoElement: HTMLDivElement;
        /**@protected*/ 
        public _pValues: number[];
        /**@protected*/ 
        public _pRenderTarget: IRenderTarget;
        /**@protected*/ 
        public _pTicks: HTMLSpanElement[];
        /**@protected*/ 
        public _pUpdateInterval: number;
        /**@inline*/ 
        public info : HTMLDivElement;
        /**@inline*/ 
        public target : IRenderTarget;
        constructor(ui, options?, pRenderTarget?: IRenderTarget);
        private updateStats();
        public rendered(): void;
    }
}
module akra {
    interface IUITreeNode {
    }
    interface IUITree extends IUIComponent {
        rootNode: IUITreeNode;
        fromTree(pEntity: IEntity): void;
        sync(pEntity?: IEntity): void;
        select(pNode: IUITreeNode): bool;
        isSelected(pNode: IUITreeNode): bool;
        _link(pNode: IUITreeNode): void;
        _unlink(pNode: IUITreeNode): void;
        _createNode(pEntity: IEntity): IUITreeNode;
    }
}
module akra {
    interface IUITree {
    }
    interface IUITreeNode {
        el: JQuery;
        parent: IUITreeNode;
        tree: IUITree;
        source: IEntity;
        expanded: bool;
        totalChildren: number;
        selected: bool;
        expand(bValue?: bool): void;
        destroy(): void;
        sync(bRecursive?: bool): void;
        select(bValue?: bool): bool;
        waitForSync(): void;
        synced(): void;
    }
}
module akra.ui {
    interface IUITreeNodeMap {
        [guid: number]: IUITreeNode;
    }
    class TreeNode implements IUITreeNode {
        public el: JQuery;
        public parent: IUITreeNode;
        public tree: IUITree;
        public source: IEntity;
        public expanded: bool;
        /**@protected*/ 
        public _pNodeMap: IUITreeNodeMap;
        /**@protected*/ 
        public $childrenNode: JQuery;
        /**@inline*/ 
        public totalChildren : number;
        /**@inline*/ 
        public selected : bool;
        constructor(pTree: IUITree, pSource: IEntity);
        public expand(bValue?: bool): void;
        public select(isSelect?: bool): bool;
        /**@protected*/ 
        public getID(): string;
        /**@protected*/ 
        public sync(bRecursive?: bool): void;
        public synced(): void;
        public waitForSync(): void;
        /**@protected*/ 
        public removeChildren(): void;
        /**@protected*/ 
        public inChildren(pNode: IEntity): bool;
        /**@inline*/ /**@protected*/ 
        public sourceName(): string;
        /**@protected*/ 
        public addChild(pNode: IUITreeNode): void;
        public destroy(): void;
    }
    class Tree extends Component implements IUITree {
        /**@protected*/ 
        public _pNodeMap: IUITreeNodeMap;
        /**@protected*/ 
        public _pRootNode: IUITreeNode;
        /**@protected*/ 
        public _pSelectedNode: IUITreeNode;
        public fromTree(pEntity: IEntity): void;
        /**@inline*/ 
        public rootNode : IUITreeNode;
        constructor(ui, options?, eType?: EUIComponents);
        public select(pNode: IUITreeNode): bool;
        public isSelected(pNode: IUITreeNode): bool;
        public rendered(): void;
        public _createNode(pEntity: IEntity): IUITreeNode;
        public _link(pNode: IUITreeNode): void;
        public _unlink(pNode: IUITreeNode): void;
        public sync(pEntity?: IEntity): void;
    }
}
module akra {
    interface IUIGraph {
    }
    interface IUIGraphRoute {
    }
    interface IUIGraphConnectionArea {
    }
    enum EUIGraphNodes {
        UNKNOWN,
        ANIMATION_DATA,
        ANIMATION_PLAYER,
        ANIMATION_BLENDER,
        ANIMATION_MASK,
    }
    interface IGraphNodeAreaMap {
        [name: string]: IUIGraphConnectionArea;
    }
    interface IUIGraphNode extends IUIComponent {
        graphNodeType: EUIGraphNodes;
        graph: IUIGraph;
        areas: IGraphNodeAreaMap;
        findRoute(pNode: IUIGraphNode): IUIGraphRoute;
        isConnectedWith(pNode: IUIGraphNode): bool;
        activate(bState?: bool): void;
        isActive(): bool;
        isSuitable(): bool;
        sendEvent(e: IUIGraphEvent): void;
        highlight(bValue?: bool);
        canAcceptConnect(): bool;
        routing(): void;
    }
}
module akra {
    interface IUIGraphControls extends IUIPanel {
        graph: IUIGraph;
    }
}
module akra {
    interface IUIAnimationGraph {
    }
    interface IUIAnimationControls extends IUIGraphControls {
        graph: IUIAnimationGraph;
    }
}
module akra {
    interface RaphaelPaper {
    }
    interface IUIGraphConnector {
    }
    interface IUIGraphRoute {
    }
    enum EUIGraphDirections {
        IN,
        OUT,
    }
    enum EUIGraphTypes {
        UNKNOWN,
        ANIMATION,
    }
    enum EUIGraphEvents {
        UNKNOWN,
        DELETE,
        SHOW_MAP,
        HIDE_MAP,
    }
    interface IUIGraphEvent {
        type: EUIGraphEvents;
        traversedRoutes: IUIGraphRoute[];
    }
    interface IUIGraph extends IUIComponent {
        graphType: EUIGraphTypes;
        nodes: IUIGraphNode[];
        canvas: RaphaelPaper;
        createRouteFrom(pConnector: IUIGraphConnector): void;
        removeTempRoute(): void;
        connectTo(pConnector: IUIGraphConnector): void;
        isReadyForConnect(): bool;
    }
}
module akra.ui.graph {
    class Controls extends Panel implements IUIGraphControls {
        public controls: IUIComponent;
        public graph: IUIGraph;
        constructor(parent, options?, pGraph?: IUIGraph);
        public createNode(): IUIGraphNode;
        public rendered(): void;
    }
}
module akra {
    interface IAnimationBase {
    }
    interface IUIAnimationNode extends IUIGraphNode {
        animation: IAnimationBase;
    }
}
module akra {
    interface IAnimation {
    }
    interface IUIlabel {
    }
    interface IUIAnimationData extends IUIAnimationNode {
    }
}
module akra {
    interface IUIGraphNode {
    }
    enum EGraphConnectorOrient {
        UNKNOWN,
        UP,
        DOWN,
        LEFT,
        RIGHT,
    }
    interface IUIGraphConnector extends IUIComponent {
        route: IUIGraphRoute;
        orient: EGraphConnectorOrient;
        area: IUIGraphConnectionArea;
        node: IUIGraphNode;
        graph: IUIGraph;
        direction: EUIGraphDirections;
        isActive(): bool;
        activate(bValue?: bool): void;
        hasRoute(): bool;
        /** Mark as input connecotr */
        input(): bool;
        /** Mark as output connector */
        output(): bool;
        highlight(bToogle?: bool): void;
        routing(): void;
        sendEvent(e: IUIGraphEvent): void;
        activated(bValue: bool): void;
        routeBreaked(pRoute: IUIGraphRoute): void;
        connected(pTarget: IUIGraphConnector);
    }
}
module akra {
    interface IUIGraphConnector {
    }
    interface IUIGraphNode {
    }
    interface IUIGraphRoute {
    }
    interface IUIConnectionAreaOptions extends IUIComponentOptions {
        maxConnections?: number;
        maxInConnections?: number;
        maxOutConnections?: number;
    }
    interface IUIGraphConnectionArea extends IUIPanel {
        connectors: IUIGraphConnector[];
        node: IUIGraphNode;
        maxInConnections: number;
        maxOutConnections: number;
        maxConnections: number;
        connectorsCount(eDir?: EUIGraphDirections): number;
        findRoute(pNode: IUIGraphNode): IUIGraphRoute;
        setMode(iMode: number): void;
        isSupportsIncoming(): bool;
        isSupportsOutgoing(): bool;
        hasConnections(): bool;
        routing(): void;
        activate(bValue?: bool): void;
        isActive(): bool;
        sendEvent(e: IUIGraphEvent): void;
        connected(pFrom: IUIGraphConnector, pTo: IUIGraphConnector): void;
    }
}
module akra.ui.graph {
    class Connector extends Component implements IUIGraphConnector {
        /**@protected*/ 
        public _eOrient: EGraphConnectorOrient;
        /**@protected*/ 
        public _eDirect: EUIGraphDirections;
        /**@protected*/ 
        public _bActive: bool;
        /**@protected*/ 
        public _pRoute: IUIGraphRoute;
        /**@inline*/ /**@inline*/ 
        public orient : EGraphConnectorOrient;
        /**@inline*/ 
        public area : IUIGraphConnectionArea;
        /**@inline*/ 
        public node : IUIGraphNode;
        /**@inline*/ 
        public graph : IUIGraph;
        /**@inline*/ /**@inline*/ 
        public route : IUIGraphRoute;
        /**@inline*/ 
        public direction : EUIGraphDirections;
        constructor(parent, options?);
        public mousedown(e: IUIEvent): void;
        public mouseup(e: IUIEvent): void;
        public hasRoute(): bool;
        public rendered(): void;
        /**@inline*/ 
        public isConnected(): bool;
        /**@inline*/ 
        public isActive(): bool;
        public activate(bValue?: bool): void;
        public sendEvent(e: IUIGraphEvent): void;
        public input(): bool;
        public output(): bool;
        public highlight(bToggle?: bool): void;
        /**@inline*/ 
        public routing(): void;
        public connected(pTarget: IUIGraphConnector): void;
        public activated(value): void;
        public routeBreaked(pRoute): void;
    }
}
module akra.ui.graph {
    class MouseConnector extends Connector {
        constructor(pGraph: IUIGraph, options?);
        public mousedown(e: IUIEvent): void;
        public _onMouseMove(pGraph: IUIGraph, e: IUIEvent): void;
    }
}
module akra {
    interface IUIGraphConnector {
    }
    interface IUIGraphEvent {
    }
    interface IColor {
    }
    interface RaphaelPath {
    }
    interface IUIGraphRoute {
        left: IUIGraphConnector;
        right: IUIGraphConnector;
        path: RaphaelPath;
        color: IColor;
        isConnectedWithNode(pNode: IUIGraphNode): bool;
        isConnectedWith(pConnector: IUIGraphConnector): bool;
        isBridge(): bool;
        sendEvent(e: IUIGraphEvent): void;
        detach(): void;
        isActive(): bool;
        activate(bValue?: bool): void;
        remove(bRecirsive?: bool): void;
        destroy(): void;
        routing(): void;
    }
    interface IUITempGraphRoute extends IUIGraphRoute {
        routing(pRight?: IPoint): void;
    }
}
module akra.ui.graph {
    class Route implements IUIGraphRoute {
        /**@protected*/ 
        public _pLeft: IUIGraphConnector;
        /**@protected*/ 
        public _pRight: IUIGraphConnector;
        /**@protected*/ 
        public _bActive: bool;
        /**@protected*/ 
        public _bHighlighted: bool;
        /**@protected*/ 
        public _pPath: RaphaelPath;
        /**@protected*/ 
        public _pArrow: RaphaelPath;
        /**@protected*/ 
        public _pColor: IColor;
        /**@protected*/ 
        public _pInactiveColor: IColor;
        /**@protected*/ 
        public _fWeight: number;
        /**@protected*/ 
        public _fMaxWeight: number;
        /**@inline*/ 
        public inactiveColor : IColor;
        /**@inline*/ 
        public color : IColor;
        /**@inline*/ 
        public left : IUIGraphConnector;
        /**@inline*/ 
        public right : IUIGraphConnector;
        /**@inline*/ /**@inline*/ 
        public weight : number;
        /**@inline*/ /**@inline*/ 
        public arrow : RaphaelPath;
        /**@inline*/ /**@inline*/ 
        public path : RaphaelPath;
        /**@inline*/ 
        public canvas : RaphaelPaper;
        constructor(pLeft: IUIGraphConnector, pRight: IUIGraphConnector);
        /**@inline*/ 
        public isConnectedWithNode(pNode: IUIGraphNode): bool;
        /**@inline*/ 
        public isConnectedWith(pConnector: IUIGraphConnector): bool;
        /**@inline*/ 
        public isBridge(): bool;
        /**@inline*/ 
        public isActive(): bool;
        public detach(): void;
        public remove(bRecirsive?: bool): void;
        public sendEvent(e: IUIGraphEvent): void;
        public destroy(): void;
        public activate(bValue?: bool): void;
        public routing(): void;
        /**@protected*/ 
        public drawRoute(pFrom: IPoint, pTo: IPoint, eFromOr?: EGraphConnectorOrient, eToOr?: EGraphConnectorOrient): void;
        static calcPosition(pConnector: IUIGraphConnector): IPoint;
    }
    class TempRoute extends Route implements IUITempGraphRoute {
        constructor(pLeft: IUIGraphConnector);
        public routing(pRight?: IPoint): void;
    }
}
module akra.ui.graph {
    class ConnectionArea extends Panel implements IUIGraphConnectionArea {
        /**@protected*/ 
        public _iMode: number;
        /**@protected*/ 
        public _pConnectors: IUIGraphConnector[];
        /**@protected*/ 
        public _pTempConnect: IUIGraphConnector;
        /**@protected*/ 
        public _iConnectionLimit: number;
        /**@protected*/ 
        public _iInConnectionLimit: number;
        /**@protected*/ 
        public _iOutConnectionLimit: number;
        /**@protected*/ 
        public _eConectorOrient: EGraphConnectorOrient;
        /**@inline*/ 
        public connectors : IUIGraphConnector[];
        /**@inline*/ 
        public node : IUIGraphNode;
        /**@inline*/ 
        public graph : IUIGraph;
        /**@inline*/ 
        public maxInConnections : number;
        /**@inline*/ 
        public maxOutConnections : number;
        /**@inline*/ 
        public maxConnections : number;
        constructor(parent, options?: IUIConnectionAreaOptions, eType?: EUIComponents);
        public attachToParent(pParent: IUIGraphNode): bool;
        public _createdFrom($comp: JQuery): void;
        public findRoute(pNode: IUIGraphNode): IUIGraphRoute;
        public connectorsCount(eDir?: EUIGraphDirections): number;
        /**@inline*/ 
        public setMode(iMode: number): void;
        /**@inline*/ 
        public isSupportsIncoming(): bool;
        /**@inline*/ 
        public isSupportsOutgoing(): bool;
        /**@inline*/ 
        public isLimitReached(): bool;
        public hasConnections(): bool;
        public isActive(): bool;
        public activate(bValue?: bool): void;
        public sendEvent(e: IUIGraphEvent): void;
        public _onNodeMouseover(pNode: IUIGraphNode, e: IUIEvent): void;
        private onConnection(pConnector, pTarget);
        private destroyTempConnect();
        public _onNodeMouseout(pNode: IUIGraphNode, e: IUIEvent): void;
        /**@inline*/ 
        public routing(): void;
        public rendered(): void;
        public connected(pFrom, pTo): void;
    }
    /**@inline*/ 
    function isConnectionArea(pEntity: IEntity): bool;
}
module akra.ui.graph {
    class Node extends Component implements IUIGraphNode {
        /**@protected*/ 
        public _eGraphNodeType: EUIGraphNodes;
        /**@protected*/ 
        public _isActive: bool;
        /**@protected*/ 
        public _pAreas: IGraphNodeAreaMap;
        /**@protected*/ 
        public _isSuitable: bool;
        /**@inline*/ 
        public graphNodeType : EUIGraphNodes;
        /**@inline*/ 
        public graph : IUIGraph;
        /**@inline*/ 
        public areas : IGraphNodeAreaMap;
        constructor(pGraph: IUIGraph, options?, eType?: EUIGraphNodes, $el?: JQuery);
        /**@protected*/ 
        public onConnectionEnd(pGraph: IUIGraph): void;
        /**@protected*/ 
        public onConnectionBegin(pGraph: IUIGraph, pRoute: IUIGraphRoute): void;
        /**@protected*/ 
        public linkAreas(): void;
        /**@inline*/ 
        public isSuitable(): bool;
        public findRoute(pNode: IUIGraphNode): IUIGraphRoute;
        /**@inline*/ 
        public isConnectedWith(pNode: IUIGraphNode): bool;
        public canAcceptConnect(): bool;
        public mouseenter(e: IUIEvent): void;
        public mouseleave(e: IUIEvent): void;
        public rendered(): void;
        public move(e: IUIEvent): void;
        public dblclick(e: IUIEvent): void;
        public activate(bValue?: bool): void;
        /**@inline*/ 
        public isActive(): bool;
        /**@protected*/ 
        public init(): void;
        /**@protected*/ /**@inline*/ 
        public addConnectionArea(sName: string, pArea: IUIGraphConnectionArea): void;
        /**@protected*/ 
        public connected(pArea: IUIGraphConnectionArea, pFrom: IUIGraphConnector, pTo: IUIGraphConnector): void;
        public sendEvent(e: IUIGraphEvent): void;
        public highlight(bValue?: bool): void;
        public routing(): void;
        public beforeDestroy(node): void;
    }
}
module akra.ui.animation {
    class Node extends graph.Node implements IUIAnimationNode {
        constructor(parent, options?, eType?: EUIGraphNodes);
        public attachToParent(pParent: IUIAnimationGraph): bool;
        public _selected(pGraph: IUIAnimationGraph, pNode: IUIAnimationNode, bPlay: bool): void;
        /**@inline*/ 
        public animation : IAnimationBase;
        /**@inline*/ 
        public graph : IUIAnimationGraph;
        /**@protected*/ 
        public connected(pArea: IUIGraphConnectionArea, pFrom: IUIGraphConnector, pTo: IUIGraphConnector): void;
    }
}
module akra.ui.animation {
    class Data extends Node implements IUIAnimationData {
        private _pAnimation;
        /**@inline*/ /**@inline*/ 
        public animation : IAnimationBase;
        constructor(pGraph: IUIGraph, pAnim?: IAnimation);
        public rendered(): void;
    }
}
module akra {
    interface IAnimationFrame {
    }
    interface IAnimationContainer extends IAnimationBase {
        animationName: string;
        speed: number;
        animationTime: number;
        time: number;
        setAnimation(pAnimation: IAnimationBase): void;
        getAnimation(): IAnimationBase;
        enable(): void;
        disable(): void;
        isEnabled(): bool;
        leftInfinity(bValue: bool): void;
        rightInfinity(bValue: bool): void;
        setStartTime(fRealTime: number): void;
        getStartTime(): number;
        inLeftInfinity(): bool;
        inRightInfinity(): bool;
        setSpeed(fSpeed: number): void;
        getSpeed(): number;
        useLoop(bValue: bool): void;
        inLoop(): bool;
        reverse(bValue: bool): void;
        isReversed(): bool;
        rewind(fRealTime: number): void;
        pause(bValue?: bool): void;
        isPaused(): bool;
        durationUpdated(fDuration: number): void;
        enterFrame(fRealTime: number, fTime: number): void;
    }
}
module akra {
    interface IUIAnimationNode {
    }
    interface IAnimationController {
    }
    interface IAnimationBase {
    }
    interface IUIAnimationGraph extends IUIGraph {
        getController(): IAnimationController;
        selectNode(pNode: IUIAnimationNode, bPlay?: bool): void;
        capture(pController: IAnimationController): bool;
        addAnimation(pAnimation: IAnimationBase): void;
        removeAnimation(pAnimation: IAnimationBase);
        removeAnimation(sAnimation: string);
        removeAnimation(iAnimation: number);
        findNodeByAnimation(sName: string): IUIAnimationNode;
        findNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode;
        createNodeByController(pController: IAnimationController): void;
        createNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode;
    }
}
module akra {
    interface IUIAnimationPlayer extends IUIAnimationNode {
    }
}
module akra.animation {
    class Container extends Base implements IAnimationContainer {
        private _bEnable;
        private _fStartTime;
        private _fSpeed;
        private _bLoop;
        private _pAnimation;
        private _bReverse;
        private _fTrueTime;
        private _fRealTime;
        private _fTime;
        private _bPause;
        private _bLeftInfinity;
        private _bRightInfinity;
        constructor(pAnimation?: IAnimationBase, sName?: string);
        /**@inline*/ 
        public animationName : string;
        /**@inline*/ 
        public speed : number;
        /**@inline*/ 
        public animationTime : number;
        /**@inline*/ 
        public time : number;
        public play(fRealTime: number): void;
        /**@inline*/ 
        public stop(): void;
        public attach(pTarget: ISceneNode): void;
        public setAnimation(pAnimation: IAnimationBase): void;
        public _onDurationUpdate(pAnimation: IAnimationBase, fDuration: number): void;
        public getAnimation(): IAnimationBase;
        /**@inline*/ 
        public enable(): void;
        /**@inline*/ 
        public disable(): void;
        /**@inline*/ 
        public isEnabled(): bool;
        /**@inline*/ 
        public leftInfinity(bValue: bool): void;
        /**@inline*/ 
        public inLeftInfinity(): bool;
        /**@inline*/ 
        public inRightInfinity(): bool;
        /**@inline*/ 
        public rightInfinity(bValue: bool): void;
        /**@inline*/ 
        public setStartTime(fRealTime: number): void;
        /**@inline*/ 
        public getStartTime(): number;
        public setSpeed(fSpeed: number): void;
        /**@inline*/ 
        public getSpeed(): number;
        /**@inline*/ 
        public useLoop(bValue: bool): void;
        /**@inline*/ 
        public inLoop(): bool;
        /**@inline*/ 
        public reverse(bValue: bool): void;
        /**@inline*/ 
        public isReversed(): bool;
        public pause(bValue?: bool): void;
        /**@inline*/ 
        public rewind(fRealTime: number): void;
        /**@inline*/ 
        public isPaused(): bool;
        /**@protected*/ 
        public calcTime(fRealTime: number): void;
        public frame(sName: string, fRealTime: number): IAnimationFrame;
        public durationUpdated(fDuration): void;
        public enterFrame(fRealTime, fTime): void;
    }
    /**@inline*/ 
    function isContainer(pAnimation: IAnimationBase): bool;
    function createContainer(pAnimation?: IAnimationBase, sName?: string): IAnimationContainer;
}
module akra.ui.animation {
    class Player extends Node implements IUIAnimationPlayer {
        private _pSpeedLabel;
        private _pSlider;
        private _pPlayBtn;
        private _pLoopBtn;
        private _pReverseBtn;
        private _pLeftInf;
        private _pRightInf;
        private _pNameLabel;
        private _pAnimation;
        /**@protected*/ 
        public $time: JQuery;
        /**@inline*/ 
        public animation : IAnimationBase;
        constructor(pGraph: IUIGraph, pContainer?: IAnimationContainer);
        /**@protected*/ 
        public onConnectionBegin(pGraph: IUIGraph, pRoute: IUIGraphRoute): void;
        /**@protected*/ 
        public setup(): void;
        public _setLeftInf(pCheckbox: IUICheckbox, bValue: bool): void;
        public _setRightInf(pCheckbox: IUICheckbox, bValue: bool): void;
        public _reverse(pCheckbox: IUICheckbox, bValue: bool): void;
        public _useLoop(pCheckbox: IUICheckbox, bValue: bool): void;
        public _pause(pCheckbox: IUICheckbox, bValue: bool): void;
        public _play(pCheckbox: IUICheckbox, bValue: bool): void;
        public _setName(pLabel: IUILabel, sName): void;
        public _setSpeed(pLabel: IUILabel, x): void;
        public _durationUpdated(pContainer: IAnimationContainer, fDuration: number): void;
        public _enterFrame(pContainer: IAnimationContainer, fRealTime: number, fTime: number): void;
        public rendered(): void;
    }
}
module akra {
    interface IUIAnimationMask extends IUIAnimationNode {
        getMask(): FloatMap;
    }
}
module akra.ui.animation {
    class Mask extends Node implements IUIAnimationMask {
        private _pAnimation;
        private _pMask;
        private _pSliders;
        private _pViewBtn;
        /**@inline*/ /**@inline*/ 
        public animation : IAnimationBase;
        constructor(pGraph: IUIGraph);
        /**@protected*/ 
        public init(): void;
        public rendered(): void;
        private create(pMask?, pAnimation?);
        public getMask(): FloatMap;
        private static createSlider(pParent, $location, pMask, sName);
    }
}
module akra {
    interface IUIAnimationBlender extends IUIAnimationNode {
        getMaskNode(iAnim: number): IUIAnimationMask;
        setMaskNode(iAnim: number, pNode: IUIAnimationMask): void;
        setup(): void;
    }
}
module akra.ui.animation {
    interface IBlenderSliderContainer {
        slider: IUISlider;
        animation: IAnimationBase;
    }
    class Blender extends Node implements IUIAnimationBlender {
        private _pBlend;
        private _pSliders;
        private _pNameLabel;
        private _pMaskNodes;
        /**@inline*/ 
        public animation : IAnimationBase;
        constructor(pGraph: IUIGraph, pBlender?: IAnimationBlend);
        /**@protected*/ 
        public onConnectionBegin(pGraph: IUIGraph, pRoute: IUIGraphRoute): void;
        public _textChanged(pLabel: IUILabel, sValue: string): void;
        public destroy(): void;
        public getMaskNode(iAnimation: number): IUIAnimationMask;
        public setMaskNode(iAnimation: number, pNode: IUIAnimationMask): void;
        public setup(): void;
        /**@protected*/ 
        public connected(pArea: IUIGraphConnectionArea, pFrom: IUIGraphConnector, pTo: IUIGraphConnector): void;
        public rendered(): void;
    }
}
module akra.ui.animation {
    class Controls extends graph.Controls implements IUIAnimationControls {
        public graph: IUIAnimationGraph;
        constructor(parent, options?);
        public createData(): IUIAnimationNode;
        public createPlayer(): IUIAnimationNode;
        public createBlender(): IUIAnimationNode;
        public createMask(): IUIAnimationNode;
    }
}
module akra.ui.graph {
    class Graph extends Component implements IUIGraph {
        /**@protected*/ 
        public _eGraphType: EUIGraphTypes;
        /**@protected*/ 
        public _pCanvas: RaphaelPaper;
        /**@protected*/ 
        public _pTempRoute: IUITempGraphRoute;
        /**@inline*/ 
        public nodes : IUIGraphNode[];
        /**@inline*/ 
        public graphType : EUIGraphTypes;
        /**@inline*/ 
        public canvas : RaphaelPaper;
        constructor(parent, options?, eType?: EUIGraphTypes);
        public createRouteFrom(pConnector: IUIGraphConnector): void;
        public removeTempRoute(): void;
        public isReadyForConnect(): bool;
        public connectTo(pTo: IUIGraphConnector): void;
        public rendered(): void;
        public mouseup(e: IUIEvent): void;
        public mousemove(e: IUIEvent): void;
        public keydown(e: IUIEvent): void;
        public click(e: IUIEvent): void;
        public connectionBegin(pRoute): void;
        public connectionEnd(): void;
        static event(eType: EUIGraphEvents): IUIGraphEvent;
    }
}
module akra.ui.animation {
    class Graph extends graph.Graph implements IUIAnimationGraph {
        private _pSelectedNode;
        private _pAnimationController;
        private _pTimer;
        constructor(parent, options);
        private setTimer(pTimer);
        public getController(): IAnimationController;
        public selectNode(pNode: IUIAnimationNode): void;
        public nodeSelected(pNode, bPlay): void;
        public addAnimation(pAnimation: IAnimationBase): void;
        public removeAnimation(pAnimation: IAnimationBase): void;
        public removeAnimation(sAnimation: string): void;
        public removeAnimation(iAnimation: number): void;
        public findNodeByAnimation(sName: string): IUIAnimationNode;
        public findNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode;
        public createNodeByController(pController: IAnimationController): void;
        public createNodeByAnimation(pAnimation: IAnimationBase): IUIAnimationNode;
        public capture(pController: IAnimationController): bool;
        private onControllerPlay(pAnimation);
        public addChild(pChild: IEntity): IEntity;
    }
}
module akra.ui {
    class UI implements IUI {
        /**@protected*/ 
        public _pManager: ISceneManager;
        /**@inline*/ 
        public type : ESceneTypes;
        constructor(pManager?: ISceneManager);
        /**@inline*/ 
        public getManager(): ISceneManager;
        public createHTMLNode(pElement: HTMLElement): IUIHTMLNode;
        public createDNDNode(pElement: HTMLElement): IUIDNDNode;
        public createComponent(sType: string, pOptions?: IUIComponentOptions): IUIComponent;
        public createLayout(eType?: EUILayouts, pAttrs?: IUILayoutAttributes): IUILayout;
        public createLayout(sType?: string, pAttrs?: IUILayoutAttributes): IUILayout;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
    }
}
module akra.core {
    class Engine implements IEngine {
        private _pResourceManager;
        private _pSceneManager;
        private _pParticleManager;
        private _pRenderer;
        private _pComposer;
        /** stop render loop?*/
        private _pTimer;
        private _iAppPausedCount;
        /** is paused? */
        private _isActive;
        /** frame rendering sync / render next frame? */
        private _isFrameMoving;
        /** is all needed files loaded */
        private _isDepsLoaded;
        private _pGamepads;
        private _fElapsedAppTime;
        /**@inline*/ 
        public time : number;
        /**@inline*/ 
        public elapsedTime : number;
        constructor(pOptions?: IEngineOptions);
        public enableGamepads(): bool;
        public getGamepads(): IGamepadMap;
        private parseOptions(pOptions);
        /**@inline*/ 
        public getScene(): IScene3d;
        /**@inline*/ 
        public getSceneManager(): ISceneManager;
        /**@inline*/ 
        public getParticleManager(): IParticleManager;
        /**@inline*/ 
        public getResourceManager(): IResourcePoolManager;
        /**@inline*/ 
        public getRenderer(): IRenderer;
        /**@inline*/ 
        public getComposer(): IAFXComposer;
        /**@inline*/ 
        public isActive(): bool;
        /**@inline*/ 
        public isDepsLoaded(): bool;
        public exec(bValue?: bool): void;
        /**@inline*/ 
        public getTimer(): IUtilTimer;
        public renderFrame(): bool;
        public play(): bool;
        public pause(isPause?: bool): bool;
        /**@inline*/ 
        public createMesh(sName?: string, eOptions?: number, pDataBuffer?: IRenderDataCollection): IMesh;
        /**@inline*/ 
        public createRenderDataCollection(iOptions?: number): IRenderDataCollection;
        /**@inline*/ 
        public createBufferMap(): IBufferMap;
        /**@inline*/ 
        public createAnimationController(iOptions?: number): IAnimationController;
        public _depsLoaded(pLoader: IDepsManager, pDeps: IDependens): void;
        static depends(sData: string): void;
        static depends(pData: IDependens): void;
        static DEPS_ROOT: string;
        static DEPS: IDependens;
        /**@protected*/ 
        public _iGuid: number;
        /**@inline*/ 
        public getGuid(): number;
        /**@protected*/ 
        public _pUnicastSlotMap: IEventSlotMap;
        /**@protected*/ 
        public _pBroadcastSlotList: IEventSlotListMap;
        /**@protected*/ 
        static _pEventTable: IEventTable;
        /**@inline*/ 
        public getEventTable(): IEventTable;
        /**@inline*/ 
        public connect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public disconnect(pSender: IEventProvider, sSignal: string, sSlot: string, eType?: EEventTypes): bool;
        /**@inline*/ 
        public bind(sSignal: string, fnListener: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public unbind(sSignal: string, fnListener?: Function, eType?: EEventTypes): bool;
        /**@inline*/ 
        public _syncTable(pFrom: IEventProvider): void;
        public frameStarted(): void;
        public frameEnded(): void;
        public depsLoaded(deps): void;
        public inactive(): void;
        public active(): void;
    }
}
module akra {
}
