declare class TweenLite{
    constructor()

    static to( target:Object, duration:Number, vars:Object ) : TweenLite

    delay()

}


declare class TimelineLite{
    constructor()


    set( target:Object,vars:Object ) : TimelineLite
    call( callback,params?:Array<any>,scope?:any) : TimelineLite
    to( target:Object, duration:Number, vars:Object ) : TimelineLite
    play(): TimelineLite
    pause(): TimelineLite
    kill(): TimelineLite
    delay(second): TimelineLite
    restart(includeDelay: Boolean,suppressEvents: Boolean): TimelineLite

}