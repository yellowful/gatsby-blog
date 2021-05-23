---
slug: "/secod-post"
title: "secod-blog post"
date: "2020-10-23"
published: true
---

## React 學習筆記 2

1. 大觀念及框架比較：
   1. React 不是一種語言，是一種框架(frame work)，所用的語言是 JavaScript，也就是 React 用一整套 library 和 IDE，讓你用某一種風格和思維來寫 JavaScript，讓套用這種框架寫法的人，很好溝通，交換模組，做大專案的應用。
   2. angular 和 vue 會管到 route，react 不處理 route，專做 one page app，如果要 route 的就直接組合 html 的連結就好了。
   3. React 用 virtual DOM 來處理，也就是操弄 virtual DOM 來改變內容，操弄 virtual DOM 的好處是，只需要改變要改的一部分就好，不用重新載入整個 DOM，所以速度可以很快。
   4. index.html 裡有個 node 的 id 是 root，ReactDOM.render()，React 的原理就是把這個 node render 出來。
   5. 也就是 React 的這個特性，所以有人認為 react 比較像用 javascript 寫 html，vue 比較像用 html 寫 javascript，而 angular 和一般的 javascript 很像，只是功能更強大，有很多 library。
   6. 三種框架都是有獨立 component 的下傳機制，以利協作。
2. 不用再去 select 各個 element，而是可以直接用 jsx 寫 html(一個一個的 node)，每一個 node 在 React 裡稱做 component。例如：React 底下，可以直接 return 一個 element`<div />`，一般的 JavaScript 並不行。
3. 在 React 框架下，寫的 code 都是一個一個模組化，從 atom => component =>... => page，都是 component。
4. 主要 App 的 code 都在.src 裡，有 index.js，各個 component.js，比較複雜的專案，一個 component 就一個資料夾。
5. 傳統的 javascript 的寫法，是要有一個 html，裡面要有一堆 element，然後 js 檔再去 select，做邏輯判斷，要更動 element 就得 createElement..等等。react 則是所有的 html tag 都是直接用 jsx 產生，不用再去 select 了。jsx 寫法是改良自 mtml，和 html 幾乎是一樣，所以比 querySelector 和 createElement 直覺多了。
6. jsx 裡用 curly bracket 包起來的，就是 javascript。
7. 寫出的元件的可再用性比傳統的 JS 來得高，例如某個 component 點下去，那個 component 就會改變，改變後的狀態就只需要修改那個 component 就好了。而傳統 JS 不是以 component 來分，所以改變後，則可能需要動到其他地方程式碼。
8. 原理：
   1. index.js 裡面去掛上 app.js，再用 app.js 去 render 各個 component。
   2. 各個 component 可在這個 render 裡，用各個 component 的 attribute，把各個參數傳到這個 component 的 property 裡，在 component 裡跑完，再跑回這個 render 裡顯示，用法如下：
      1. attribute 名稱 = {};
      2. 字串處理：`xxx${JS的variable}XXX`
      3. render()只能 return 一個 element。
   3. property(arguement)的傳遞：
      1. 可以把 property 看成是是某 object，可以麻煩一點，在 component 裡面才設各個物件(或變數)等於 prop.物件(或變數)，或用 destructure：{各個 attribute} = 某 object;
      2. 其中各個 attribute 可以是 variable、function、object 都可以，畢竟在 JS 的世界，everything is object。傳下去的假如是 function，在引數那邊也是要用 curly bracket 包住。
      3. 也可以簡化成引數裡直接：{property 的各個 attribute}
      4. 統整以上：在爸爸 component 裡的各個 attributes 會包成一個 prop 的大 object，傳到小孩 component 的小括號裡，所以有兩個作法：一是把 prop 在 component 裡面做 destructure，這時 component 裡的 prop 就沒有大括號；二是簡化寫法，把 prop 直接在小括號裡面 destructure 了，所以小括號裡面直接就是大括號包住 attribute 的名稱，而沒有 prop 這個大 object。
   4. 靠 import 和 export 傳來傳去，如果 import 或 export 不是單一，指令有點不一樣。
   5. 複雜的資料可以用一個 object 的 component 存起來 export，要用就像 object 一樣使用。
9. 版本：
   1. 舊版的 create app 後，app 是用 class，新版的 app 是用 function，大部分 app.js 會用到 setState，所以要改成 class。
   2. 舊版的 jsx 語法不是 class，而是 className，新版兩種都可以用。
10. export 和 import 徹底研究：

    1. 最常的使用方式是`import A from './A'`：
       A 這個檔案有 default export 的話，就會被 import 成 A。

       ```js
       //A.js
       export default 42
       ```

       雖然 export 42，但有 default，所以 import 成什麼名字都可以，你 import 的名稱和 export 的名稱無關，import 可以取任何想 import 而成的名字，以下 import 都可行：

       ```js
       import MyA from "./A"
       import Something from "./A"
       ```

    2. 第二種用法為`import { A } from './A'`

       1. 只有 export 是取名為 A 時（不是 default），才會被 import。
          `export const A = 42;`
          而以下 import 都没用：

          ```js
          import { myA } from "./A"
          import { Something } from "./A"
          ```

       2. 和 default 混合時的使用方式：

          ```js
          //A.js
          export default 42
          export const myA = 43
          export const Something = 44
          //B.js
          import A, { myA, Something } from "./A"
          ```

    3. 其他用法：
       把 export 的非 default 名稱，改名後才 import

       ```javascript
       //A.js
       export default 42
       export const myA = 43
       export const Something = 44
       //B.js
       import X, { myA as MyX, Something as XSomething } from "./A"
       ```

    4. 參考自：
       <https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281>

11. 主頁和 app 間值的傳送：
    1. class：透過主頁(index)內 app 的屬性指定特定值，值就會傳到 app 內去操弄 DOM，app 內要呼叫這個值就用`this.props.屬性`。
       class 透過 render 這個 function 將 jsx return 回 index。
    2. function：主頁(index)語法和 class 法相同，是用 app 的屬性指定特定值，值就會傳到 app 內去操弄 DOM 了，app 內要呼叫這個值就不用 this 保留字了，直接用 props 參數來傳，要呼叫這個值就用`props.屬性`。
       1. function 不需透過 render，可以直接 return jsx。
       2. 可以用`const {a,b,c} = props;`來 destructuring
       3. 最方便的方式是在 parameter 的地方直接放`{a,b,c}`來 destructuring
    3. 之所以在 class 裡要用 this.props 而 function 裡不用 this，直接用 props，是因為 class 本身不是 object，而 this 代表的是 class 造出來的 object，所以在 class 中要用 props，就要加上 this，代表是這個 class 造出來的 object。function 本身是 object，所以叫 props 時，就不用加 this。
    4. index.js 裡如果需要比較複雜的程式處理事情，就會丟出來給另一個 component 來做。這個 component 的 js 檔裡面，fuction 的 return 前可以做 loop、if、等複雜判斷，再丟給 return，以畫出較複雜的大 component。
    5. 用 jsx 來 render 出大、小階層不一的 component，靠得是 import、export、`<component名 />`傳來傳去；數值、資料則會靠 attribute 和 parameter 傳來傳去，有的 object 資料也會靠 export 和 import 傳來傳去。
    6. props 是保留字：
       1. 沒有先宣吿 props，在 component 裡還是可以用。
       2. constructor 裡如果要用 props，就得宣告，才不會出錯。
    7. 靠 props 傳來傳去時，記得要 destructure。
12. state：
    1. React 靠 props 來向下傳資料，無法向上傳資料，但靠 event 來向上觸發以改變 state。
       1. 用法是在頂端，例如 app.js 中，不需要關鍵字 fuction，定義一個 method。把這個 method 放在目標 Component 的一個 attribute 中，當成 props 傳下去。
       2. 有 state、有 function 需要被傳下去的 Component，操控其他子孫 component，甚至負責和後端溝通的 component，例如 App.js，稱為 container component。相對 container component 的是 presentational components，單純負責呈現畫面，和互動沒什麼關係，不需要 state。
       3. 這個 fuction 在 Component 的 props 中，會被 event 觸發，然後會上傳到頂端的 app.js 中被執行。
          1. 在 constructor 中會設好 this.state 的 attribute，這些 attribute 的選擇，主要是會隨著 browser 一些 event 的發生而變動。
          2. 可以在這個 fuction 中放一個 setState 的 method。
          3. 這個 setState 裡面要放至少一個 this.state 裡的 attribute，因為 browser 的 event 發生而會從這個 fuction 回傳值，改變了這個 attribute，而改變這個 this.state。靠這 this.state 的改變，來改變其他 props，再用 props 下傳改變其他 Component。
    2. 完全靠 props 來向下傳資料的好處是，可以預期其他的 Component 非常的 pure 和 deterministic，值不會亂變。
    3. 為什麼最頂端的 App 不是用 function，而是用 class 的方式呢？
       1. 因為需要借用 react 寫好的 this.state 來修改，而 function 沒有 extend 的功能，自然無法改 this.state。
       2. 所以有 state 的話，就得用 class。
       3. 並不是只有最頂端的 app.js 可以用 class，任何需要用到自己的 state 的 component 都可以用 class。
       4. 如果用到的 state 和其他 Component 無關，就把自己設成 class，這樣 state 最多就傳到自己和兒女而已，和其他父母兄弟的 component 無關。
    4. 最頂端用 class 的方式的話，import 就要有 Component。
    5. constructor 和 props 非必要，只有 props 需要在 constructor 裡面操作時，才需要。也就是在 reder 之前就需要計算 props 的話，就要 constructor 和 props。
13. this.setState()：
    1. react 是用這個 function 來更新變數，要注意的是，他只適合用來更新 event 改變時造成的更新。也就是說，以前 JS 用 callback function 那些 eventListener 的情況，現在才用 setState()來更新。
    2. 計算結果的更新不要用 this.setState()來更新，直接讓變數更新就好。因為效率緣故，一個 event 可能只會更新一次 state，下一個 event 發生前 this.state 可能都還不會更新。
    3. class 裡面的 set.State 之所以裡面的 state 需要加上 curly bracket，也是 destructure 的關係。
14. 奇怪的地方：
    1. 和 JS 不同，function 的定義竟然不用保留字 function。
    2. 後來發現是因為 JS 在 class 裡定義 method 本來就不用保留字。
    3. class 裡一般不會在 render()以外設 variable，variable 都設在 render 裡面，這樣 component 才讀得到。
    4. 如果要設在 render()以外，就要設在 this.state 裡，這樣 component 也可以讀得到。
15. Component 的 life cycle：
    1. Mounting：constructor()=>render()=>componentDidMount()=>render()
    2. componentWillMount：
       1. 大家錯用，不安全，所以將會 React 17 會取消這項功能，寫好的 code 會不能在 React 17 中跑。
       2. 要在 render 之前做些什麼事，可以放在 constructor 裡做，而不要放在 componentWillMount。
       3. 一些 component load 後只有要跑一次的 fetch，因為 fetch 完會更新 state，所以不應該在 component render 完成前跑，這樣會造成 component 沒被更新，所以應該放到 componentDidMount 跑。
    3. State Update：setState()=>render()
    4. Unmounting：去別的網頁之前執行
16. props.children：state 之外的另一種回傳方式，主要是回傳 DOM 的操作方式。
17. autobind this：不易理解的觀念
    1. 原本 ES6 以前，如果在 class 或 function 裡定義一個 method，而且要在 callback 裡使用 this.method，this 會是 undefined。
    2. 這時候就需要在 constructor 裡寫上一行：this.method = this.method.bind(this)，而 React 也提供一項功能，在 constructor 裡打上 autobind(this)，就會把所有 method 綁定了。
    3. 然而 ES6 之後有內建 autobind 功能了，所以只要用 ES6 之後的語法 arrow function，就會 autobind，什麼事都不用做，就可以用 this.method 在 callback 之中了。
18. build 完的檔是最佳化過的檔了，也轉成瀏覽器可以跑的檔了，可以直接拿 build 的檔去任何地方用。
19. 有 dependency 的放 containers，獨立的放 components 資料夾。
20. 新 style in line 的用法，是用雙 curly bracket 下，用物件的屬性語法，jsx 就會自動解析成 css 給 DOM。至於為什麼是雙 curly bracket，我認為第一個 barcket 代表這是 javascript 的語法了，不是 style 或 html 了，第二個 bracket 代表這是在 object 裡面。
21. 檔案處理：
    1. desktop 上傳檔案在手機上就等於開啟相片和開照相機。
    2. FileReader：
       1. fileReader.readAsDataURL(檔案)可以把相片檔案轉成記憶體中的 URL，顯示在瀏覽器中。
       2. fileReader.onloadend = arrow function，讓檔案讀完了之後，可以做 arrow function 裡的事。
    3. FormData：
       1. 用來把檔案包起來變成 form 的格式，這樣才能 fetch 出去。
       2. formData.append('用什麼名字包起來',檔案);
    4. 用 ref 把 button 的外觀取代 inpute file 的外觀，但保有 inpute file 的功能。
    5. inpute file 的功能中，如果第二次選取的檔名和第一次選取的檔名不同的話，onChange 的 event 不會被觸發。解決方式是另外設定一個 const 來放 event.target.file，然後後續都用這個 const 來處理後續，然後把 event.target.value 設成空字串。
22. jsx 的語法：
    1. form：
       1. sumit 一定要搭配 form 才會有效
       2. react 底下的 form
          1. 不能用 sumit 搭配 form，因為會引發網頁離開。
          2. 可以改用 tag button。
          3. techyons 裡的 form template 有一堆有的沒的 tag 最好都刪掉，或改成 div，以免出現怪異行為。
          4. 例如 for、value 在 Reac 裡沒什麼用，可以刪掉。
    2. radio：react 底下要去操作單選的 radio 先預載某個選項的話：
       1. 要單一選項的 checked 的 property 設成 true，其他選項設成 false。
       2. 不能用 onClick，要用 onChange。
       3. name 如果不能使用了，只能用外面包 label 去用他。
    3. property 改成 camel 命名，例如 class 改成 className，onchange 改成 onChange。
    4. listener：
       1. 聽欄位的完整內容用：onChange
       2. 聽 enter 鍵用：onKeyDown 或 onKeyPress
    5. size：
       1. 螢幕截圖的尺寸：window.innerWidth、window.innerHeight
       2. 圖片的尺寸：.offsetWidth 和.offsetHeight
    6. property：
       1. placeholder：欄位裡要預顯示文字
    7. input：
       1. file：onChange 對於和上次選取相同檔名，因為會被視為沒有 change，所以 event 會無法觸發。所以要把 event.target.file 指定給其他變數進行後續使用，然後把 event.target.value 設為空字串。
23. ref：
    1. 概念是把第一種 dom 的功能套用在第二種 dom 的外型上，第一種 dom 功能雖好，但是太醜之類的。
    2. 例如把 input type 是 file 的功能套在 button 上
       1. 把 input 外觀隱藏起來：style={{display:'none'}}
       2. 設定 ref={(fileInput)=>{this.fileInput=fileInput}}
          1. 點下去後 ref 的 fileInput 會得到檔案
          2. 把 fileInput 送到 this.fileInput 中，this.fileInput 才能和 button 有所連接，而這個 ImageUpload 的 component 必須是一個 class，才會有 this，function 不會有 this
          3. this.fileInput 會是一個 ref 的物件，這個物件有個 method 是.click()，注意，不是.onClick，所以可以把 button 設定：onClick={()=>this.fileInput.click()}
    3. 例如按 enter 之後，自動 focus 移到下一個欄位
       1. 去要操控的 dom 中先設 ref：
          `ref={this.inputName}；`
       2. 在 constructor 中把這個 ref 建立和連接起來：
          this.inputName = React.createRef();
       3. 利用這個 ref 的.current 就代表這個 dom，可以用這個 dom 的 method 操控 dom：（這裡顯示的是另一個 dom=>email 的 ref）：
          this.inputEmail.current.focus();
24. react hooks：

    1. 有幾個優點：
       1. 不用複雜的 class 和 setState 的語法。
       2. 專屬的 setState()名稱，容易追蹤那個 function 改變 state。
    2. 使用時機：
       1. 這個 component 需要有自己的 state 的時候，這個時機和 class component 一樣。
       2. 最棒的時機是，原有的 function component 需要 state 的時候，用 hooks 改寫幅度超小。
    3. 用法：

       1. `import React, {useState} from 'react';`
       2. 用 useState 宣告 state 和宣告設定 state 的 function 名稱：
          `const [state_variable,set_state_function_name] = useState(default_state_value);`
       3. 當成 props 傳下去：

          1. 如果要用 event，要把值直接設定成 state

             ```js
                 onClick={set_state_function_name(event)}
             ```

          2. 如果沒有要用 event，要觸發就執行某些 function，或設定 state 為其他值

             ```js
                 onClick={()=>{
                             set_state_function_name(其他值);
                             other_function();
                         }}
             ```

    4. useEffect()：
       1. 用來做 class component 的以下事情：
          1. componentDidMount。
          2. `render(){ 判斷式; return jsx}`判斷式在做的事。
       2. 我覺得沒有向 useState()那麼好用，雖然用起來比較簡短 clean，但是我覺得用 class 的用法比較直覺。
       3. 主要是設定什麼時候觸發 state 的更新，並且可以讓這個 function component 產生 side effect，所以使用要小心，不見得什麼 project 都該改成 hooks 來做。

25. npm run biuld，建立精簡過的檔案。
26. Error Boundary：
    1. 弄一個 ErrorBoundary 的 container component，而且會用到 this.state，所以會用 class 不是 fuction，名稱是自訂的。
    2. 主要是有 componentDidCatch 的功能：如果 component 本身有任何錯誤，就會跑 componentDidCatch。
    3. constructor 的 this.state 裡面放 hasError 這個 attribute。
    4. componentDidCatch 裡面放 this.setState，用來改變 hasError。
    5. render()設定錯誤就呈現錯誤訊息，正確就呈現 props.children。
    6. 到 parent 去，用這個 container component 把要用的 component 包起來。
27. 放到 github 上：

    1. 先要 push 到 github 上。
    2. 改 package.json 檔，放上 github repository 的連結，例如："homepage": "https://yellowful.github.io/StarWarBot/"。
    3. 在 terminal 裡下指令：`npm install --save gh-pages`
       改 package.json 檔，裡的 scripts：

       ```javascript
           "scripts": {
       +   "predeploy": "npm run build",
       -   "deploy": "gh-pages -d build"
       +   "deploy": "gh-pages -b master -d build"
           }
       ```

    4. 在 terminal 裡下指令：`npm run deploy`
    5. github 的 pages 設定裡把 master 改成 gh-pages branch
    6. build 的時候，會做幾件事情：
       1. babel 轉換：將各個 node 的 library 轉成舊的 javascript，因為瀏覽器甚至對 ECMS6 的支援性還很差。
       2. minify：將程式變短變小，例如：只剩一行、變數只剩一個字，這樣可以加快瀏覽器下載和解析的速度。
       3. uglify：因為 javascript 是看得到原始碼的，所以會把程式弄的比較機器化，讓人類比較難看得懂。

28. 放到 heroku 上：
    1. deploy react app 為了避免錯誤，記得先 git merge 到 master。
    2. 先安裝 npm serve package：
       npm install serve --s
    3. package.json：
       1. 加這行，讓在 local 端測試可以用 npm run dev：
          "start:dev": "react-scripts start"
       2. 改這行，讓遠端用："start":"serve -s build"
       3. 也可以參考 react 官方網頁，關於 deploy 到 static 網站，改成:
          "start:dev": "react-scripts start",
          "start":"serve -s build",
          "build": "react-scripts build",
          "test": "react-scripts test",
          "eject": "react-scripts eject"
       4. 在 local 端測試就用：
          1. npm start:dev
          2. npm run start:dev
       5. homepage 也可以改掉，沒改掉好像也沒影響。
    4. 在 heroku 網頁介面中開啟一個新的 app
       1. 連接遠端已經存在的專案：heroku git:remote -a 遠端 app 名稱
       2. 依 document 的 git 指令 deploy 到這個 app 中
          1. git push heroku master
          2. 如果失敗，可以改用：
             git push heroku HEAD:master
    5. 環境變數：
       1. 把前端 app 的後端網址無法換成 process.env.backendURL：
          1. backendURL 是從環境變數傳進去，上傳到 heroku 之後，雖然 heroku 可以設定環境變數，但是沒有意義，原因是 app 的 code 的 runtime 不是在 heroku 上，heroku 只是把檔案傳給 browser，真正的 runtime 是在 browser 上，所以在 heroku 上設的環境變數沒有機會傳給 app，而 app 在 browser 上 run 的時候，跟 browser 要環境變數是要不到的，因為我們無法向 client 設定環境變數。
          2. 就算 heroku 有什麼辦法可以把 heroku 的環境變數傳進去的話，保密的意義也不大，駭客在 client 端可以解析 app 的程式碼看到環境變數是多少，甚至也可以看 browser 向誰 request 資料，直接看到後端網址。
       2. 環境變數只能解決後端不想把敏感資料放原始碼和 github 一起公開的問題，完全無法解決前端洩漏敏感資料的問題，所以 api key 或其他不想讓人知道的敏感資料，只能放在後端，永遠不要放前端。
29. 自己猜 React 是怎麼用 javascript 寫出來的：
    1. React 的 Library 裡面有 export default ReactDOM 的 class，這個 class 有個 method，叫.render()。
    2. 我們 App 是一個從 React.Component 繼承而來的 class，裡面可以定義一個 method 叫 render()，這個 render()和 ReactDOM.render()不一樣，但是這個 method 需要回傳一段很像是 html 的文字，其實是 jsx 文字，我們把整個 App export 給 index.js。
    3. 我們在 index.js 中，呼叫 ReactDOM.render()，這個 React.DOMrender()會去跟 App 這個 React.Component 延伸而來的 class 要 render()這個 method，然後得到 render()這個 method 所回傳的 jsx，ReactDOM.render()就像是一個畫家，會把他給畫成 html，再丟給瀏覽器。
    4. function component：
       1. 一定要在 App.render 的 return 裡面以 jsx 的方式出現，所以 function 需要 return 的也是 jsx。
       2. function component 會 export 給 App.js，所以 function component 就和 App.js 裡定義的 function 沒有什麼兩樣。
       3. 但是 App.js 裡的其他 function 為什麼不會是 function component 呢？因為那些 function 沒有：
          1. return jsx
          2. function 名稱被改寫成 jsx 放在 render()的 return 中。
       4. 所以 React 的 library 裡還有 export 一個 function(可能吧？)叫做 React，App.js 和所有的 function component 都需要 import 這個 React，他就是在做這幾件事情：
          1. 這個 function 是不是有 return jsx。
          2. 這個 function 名稱有沒有被放在 render()的 return 中。
          3. 如果都是的話，他就是合法的 jsx 語法，可以被 ReactDOM.render()正確的畫出來。
