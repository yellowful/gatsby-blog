import { useEffect } from "react"

//因為手機的touch和桌機的mouse是不同的event，所以要分開設定監聽的events
const events = [`mousedown`, `touchstart`]

//會import到index.js也就是Search的component裡面去，被稱為useClickOutside()
//會把最外層的div的ref傳進來，也會把unfocus之後要做什麼用onClickOutside傳進來
const useClickOutside = (ref, onClickOutside) => {
  
  //如果Search框是在focus上，就會有current，||左邊是false，就判斷右邊的Search框有沒有包含touchstart或mousedown被trigger的element，沒有的話，就回傳true，是unfocus，有的話就回傳false，是focus
  //如果Search框不是是在focus上，就不會有current，就回傳true，是unfocus。
  const isOutside = element => !ref.current || !ref.current.contains(element)
  
  //監聽到mousedown或touchstart的時候，把event.target傳給isOutside判斷這個target是不是在search框內
  const onClick = event => {
    if (isOutside(event.target)) {
      //如果是outside，執行onClickOutside()，把hasFocuse設成false，讓Search消失
      onClickOutside()
    }
  }

  //component載入後就監聽mousedown和touchstart，離開時就不監聽
  //監聽到event的話就執行onClick
  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, onClick)
    }

    return () => {
      for (const event of events) document.removeEventListener(event, onClick)
    }
  })
}

export default useClickOutside