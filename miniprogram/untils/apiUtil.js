export class ApiUtil {
  static Toast(toastCtrl, msg) {
    let toast = toastCtrl.create({
      message: msg
    });
    toast.present();
  }

  static FormatDateTimeStr(val) {
    val = new Date(val);

    var year = val.getFullYear().toString();
    var month = val.getMonth() + 1;
    month = month > 9 ? month.toString() : "0" + month.toString();

    var date = val.getDate();
    date = date > 9 ? date.toString() : "0" + date.toString();

    var hour = val.getHours();
    hour = hour > 9 ? hour.toString() : "0" + hour.toString();

    var minute = val.getMinutes();
    minute = minute > 9 ? minute.toString() : "0" + minute.toString();

    var second = val.getSeconds();
    second = second > 9 ? second.toString() : "0" + second.toString();

    return year + "-" + month + "-" + date +
      " " + hour + ":" + minute + ":" + second;
  }
  static dateFtt(fmt, date) { //author: meizz   
    var o = {
      "M+": date.getMonth() + 1, //月份   
      "d+": date.getDate(), //日   
      "h+": date.getHours(), //小时   
      "m+": date.getMinutes(), //分   
      "s+": date.getSeconds(), //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), 
      "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  static FormatTimeStr(val) {
    val = new Date(val);

    var hour = val.getHours();
    hour = hour > 9 ? hour.toString() : "0" + hour.toString();

    var minute = val.getMinutes();
    minute = minute > 9 ? minute.toString() : "0" + minute.toString();

    var second = val.getSeconds();
    second = second > 9 ? second.toString() : "0" + second.toString();

    return hour + ":" + minute;
  }
  static FormatDateStr(val) {
    val = new Date(val);

    var year = val.getFullYear().toString();
    var month = val.getMonth() + 1;
    month = month > 9 ? month.toString() : "0" + month.toString();

    var date = val.getDate();
    date = date > 9 ? date.toString() : "0" + date.toString();

    return year + "-" + month + "-" + date;
  }

  static IsMobileNo(str) {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(str);
  }
  static FormatPercent(val) {
    val = val * 100.0;
    return val.toFixed(2) + '%';
  }
  static FormatPrice(val) {
    val = val * 1.0;
    return val.toFixed(2);
  }
  static FormatNumber(val, digits) {
    val = val * 1.0;
    return val.toFixed(digits);
  }
  static FormatDate(val) {
    return val.substr(0, 10);
  }
  static Storage = null;


  static Datetime_str(timespan) {
    var now = new Date().getTime() / 1000;
    timespan = now - timespan;
    if (timespan < 0) {
      return "刚刚";
    }
    if (timespan > 365 * 24 * 3600) {
      return (timespan / (365 * 24 * 3600)).toFixed(0) + "年前";
    } else if (timespan > 30 * 24 * 3600) {
      return (timespan / (30 * 24 * 3600)).toFixed(0) + "月前";
    } else if (timespan > 24 * 3600) {
      return (timespan / (24 * 3600)).toFixed(0) + "天前";
    } else if (timespan > 3600) {
      return (timespan / 3600).toFixed(0) + "小时前";
    } else if (timespan > 60) {
      return (timespan / 60).toFixed(0) + "分钟前";
    } else if (timespan) {
      return (timespan).toFixed(0) + "秒前";
    }
    return "刚刚";
  }
  static Datetime2(timespan) {
    var now = new Date(parseInt(timespan) * 1000)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    return {
      year: year,
      month: month,
      date: date
    };
  }
  static StrToDate(timestr) {
    var s = timestr.split(" ");
    var date = s[0].split("-");
    var time = s[1].split(":");

    var year = Number(date[0]);
    var month = Number(date[1]) - 1;
    var day = Number(date[2]);

    var hour = Number(time[0]);
    var minute = Number(time[1]);
    var second = Number(time[2]);

    if (second) {
      return new Date(year, month, day, hour, minute, second);
    } else {
      return new Date(year, month, day, hour, minute);
    }

  }
  static getNowDateFormat() {
    var date = new Date();
    return this.FormatDateStr(date.getTime());
  }
  static getNextDateFormat() {
    var date = new Date();
    return this.FormatDateStr(date.getTime() + 24 * 3600 * 1000);
  }
}