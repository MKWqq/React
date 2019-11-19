import {downModelListAPI,} from "&/libs/api/basedata/other";
export function download(name) {
  let url = "";
  downModelListAPI(name).then(({data}) => {
    data.map((v) => {
      if (v.name === name) {
        url = v.url;
      }
    });
    let a = document.createElement("a")
    a.href = /Blob]$/.test(Object.prototype.toString.call(url)) ? URL.createObjectURL(url) : url
    a.download = name
    a.click()
    URL.revokeObjectURL(a)
  });
}
