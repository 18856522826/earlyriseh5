    var sum=[];
    var ltime=[];
    var rtime=[];
    var tt=0;
    var time="";//时间
    var sumtime=0;
    var times=[];
    var ll=[];
    var rr=[];
    var content=""
var messort=function(l,r){
    sum.length=0;
    ll.length=0;
    rr.length=0;
    ltime.length=0;
    rtime.length=0;
    sumtim(l,ltime,ll);
    sumtim(r,rtime,rr);
    sum= sumsort(ltime,rtime,ll,rr);
    console.log(sum)
    return sum;
};
function sumtim(l,ltime,ll){
    if(l==undefined){
        return 0
    }
    for(var i=0;i<l.length;i++){
        tt=l[i].indexOf("_");
        time= l[i].substring(0,tt);
        time=time.replace(/:/g,"-");
        time=time.replace(/\s/g,"-");
        times=time.split("-")
        sumtime= parseInt(times[3])*86400+parseInt(times[4])*3600+parseInt(times[5])*60+parseInt(times[6])
        ltime.push(sumtime);
        content=l[i].substring(tt+1,l[i].length)
        ll.push(content);
    };
}
function sumsort(ltime,rtime,ll,rr){
         var l=0;
         var r=0;
         if(ll==undefined||rr==undefined){
             sum=ll.concat(rr)
             console.log(sum)
             return sum;
         }
    while(ltime[l]!=null&&rtime[r]!=null){ 
         if(ltime[l]>=rtime[r]){
             sum.push(rr[r])
             r++;
         }else{
             sum.push(ll[l])
             l++;
         }
    }
    console.log(sum)
    if(ltime[l]!=null){
        var ltt=ll.slice(l,ll.length)
        sum= sum.concat(ltt)
    }else{
        var rtt=rr.slice(r,rr.length)
        sum= sum.concat(rtt)
    }
    console.log(sum)
    return sum;
 }
export {
    messort
}