---
slug: "/first-post"
title: "first-blog post"
date: "2020-10-20"
published: false
---

## React學習筆記 1

1. 大觀念及框架比較：
   1. React不是一種語言，是一種框架(frame work)，所用的語言是JavaScript，也就是React用一整套library和IDE，讓你用某一種風格和思維來寫JavaScript，讓套用這種框架寫法的人，很好溝通，交換模組，做大專案的應用。
   2. angular和vue會管到route，react不處理route，專做one page app，如果要route的就直接組合html的連結就好了。
   3. React用virtual DOM來處理，也就是操弄virtual DOM來改變內容，操弄virtual DOM的好處是，只需要改變要改的一部分就好，不用重新載入整個DOM，所以速度可以很快。 
   4. index.html裡有個node的id是root，ReactDOM.render()，React的原理就是把這個node render出來。
   5. 也就是React的這個特性，所以有人認為react比較像用javascript寫html，vue比較像用html寫javascript，而angular和一般的javascript很像，只是功能更強大，有很多library。
   6. 三種框架都是有獨立component的下傳機制，以利協作。
2. 不用再去select各個element，而是可以直接用jsx寫html(一個一個的node)，每一個node在React裡稱做component。例如：React底下，可以直接return一個element`<div />`，一般的JavaScript並不行。
3. 在React框架下，寫的code都是一個一個模組化，從atom => component =>... => page，都是component。
4. 主要App的code都在.src裡，有index.js，各個component.js，比較複雜的專案，一個component就一個資料夾。
5. 傳統的javascript的寫法，是要有一個html，裡面要有一堆element，然後js檔再去select，做邏輯判斷，要更動element就得createElement..等等。react則是所有的html tag都是直接用jsx產生，不用再去select了。jsx寫法是改良自mtml，和html幾乎是一樣，所以比querySelector和createElement直覺多了。
6. jsx裡用curly bracket包起來的，就是javascript。
7. 寫出的元件的可再用性比傳統的JS來得高，例如某個component點下去，那個component就會改變，改變後的狀態就只需要修改那個component就好了。而傳統JS不是以component來分，所以改變後，則可能需要動到其他地方程式碼。
8. 原理：
   1. index.js裡面去掛上app.js，再用app.js去render 各個component。
   2. 各個component可在這個render裡，用各個component的attribute，把各個參數傳到這個component的property裡，在component裡跑完，再跑回這個render裡顯示，用法如下：
      1. attribute名稱 = {};
      2. 字串處理：`xxx${JS的variable}XXX`
      3. render()只能return一個element。
   3. property(arguement)的傳遞：
      1. 可以把property看成是是某object，可以麻煩一點，在component裡面才設各個物件(或變數)等於prop.物件(或變數)，或用destructure：{各個attribute} = 某object;
      2. 其中各個attribute可以是variable、function、object都可以，畢竟在JS的世界，everything is object。傳下去的假如是function，在引數那邊也是要用curly bracket包住。
      3. 也可以簡化成引數裡直接：{property的各個attribute}
      4. 統整以上：在爸爸component裡的各個attributes會包成一個prop的大object，傳到小孩component的小括號裡，所以有兩個作法：一是把prop在component裡面做destructure，這時component裡的prop就沒有大括號；二是簡化寫法，把prop直接在小括號裡面destructure了，所以小括號裡面直接就是大括號包住attribute的名稱，而沒有prop這個大object。
   4. 靠import和export傳來傳去，如果import或export不是單一，指令有點不一樣。
   5. 複雜的資料可以用一個object的component存起來export，要用就像object一樣使用。
9. 版本：
   1. 舊版的create app後，app是用class，新版的app是用function，大部分app.js會用到setState，所以要改成class。
   2. 舊版的jsx語法不是class，而是className，新版兩種都可以用。
10. export和import徹底研究：
    1. 最常的使用方式是`import A from './A'`：
        A這個檔案有default export的話，就會被import成A。

        ```js
            //A.js
            export default 42;
        ```

        雖然export 42，但有default，所以import成什麼名字都可以，你import的名稱和export的名稱無關，import可以取任何想import而成的名字，以下import都可行：

        ```js
            import MyA from './A';
            import Something from './A'
        ```

    2. 第二種用法為`import { A } from './A'`
        1. 只有export是取名為A時（不是default），才會被import。
            `export const A = 42;`
            而以下import都没用：

            ```js
            import { myA } from './A';
            import { Something } from './A'
            ```

        2. 和default混合時的使用方式：

            ```js
                //A.js
                export default 42;
                export const myA = 43;
                export const Something = 44;
                //B.js
                import A, { myA, Something } from './A';
            ```

    3. 其他用法：
        把export的非default名稱，改名後才import

        ```javascript
            //A.js
            export default 42;
            export const myA = 43;
            export const Something = 44;
            //B.js
            import X, { myA as MyX, Something as XSomething } from './A';
        ```

    4. 參考自：
        <https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281>
11. 主頁和app間值的傳送：
    1. class：透過主頁(index)內app的屬性指定特定值，值就會傳到app內去操弄DOM，app內要呼叫這個值就用`this.props.屬性`。
    class透過render這個function將jsx return回index。
    2. function：主頁(index)語法和class法相同，是用app的屬性指定特定值，值就會傳到app內去操弄DOM了，app內要呼叫這個值就不用this保留字了，直接用props參數來傳，要呼叫這個值就用`props.屬性`。
       1. function不需透過render，可以直接return jsx。
       2. 可以用`const {a,b,c} = props;`來destructuring
       3. 最方便的方式是在parameter的地方直接放`{a,b,c}`來destructuring
    3. 之所以在class裡要用this.props而function裡不用this，直接用props，是因為class本身不是object，而this代表的是class造出來的object，所以在class中要用props，就要加上this，代表是這個class造出來的object。function本身是object，所以叫props時，就不用加this。
    4. index.js裡如果需要比較複雜的程式處理事情，就會丟出來給另一個component來做。這個component的js檔裡面，fuction的return前可以做loop、if、等複雜判斷，再丟給return，以畫出較複雜的大component。
    5. 用jsx來render出大、小階層不一的component，靠得是import、export、`<component名 />`傳來傳去；數值、資料則會靠attribute和parameter傳來傳去，有的object資料也會靠export和import傳來傳去。
    6. props是保留字：
       1. 沒有先宣吿props，在component裡還是可以用。
       2. constructor裡如果要用props，就得宣告，才不會出錯。
    7. 靠props傳來傳去時，記得要destructure。
12. state：
    1. React靠props來向下傳資料，無法向上傳資料，但靠event來向上觸發以改變state。
       1. 用法是在頂端，例如app.js中，不需要關鍵字fuction，定義一個method。把這個method放在目標Component的一個attribute中，當成props傳下去。
       2. 有state、有function需要被傳下去的Component，操控其他子孫component，甚至負責和後端溝通的component，例如App.js，稱為container component。相對container component的是presentational components，單純負責呈現畫面，和互動沒什麼關係，不需要state。
       3. 這個fuction在Component的props中，會被event觸發，然後會上傳到頂端的app.js中被執行。
            1. 在constructor中會設好this.state的attribute，這些attribute的選擇，主要是會隨著browser一些event的發生而變動。
            2. 可以在這個fuction中放一個setState的method。
            3. 這個setState裡面要放至少一個this.state裡的attribute，因為browser的event發生而會從這個fuction回傳值，改變了這個attribute，而改變這個this.state。靠這this.state的改變，來改變其他props，再用props下傳改變其他Component。
    2. 完全靠props來向下傳資料的好處是，可以預期其他的Component非常的pure和deterministic，值不會亂變。
    3. 為什麼最頂端的App不是用function，而是用class的方式呢？
       1. 因為需要借用react寫好的this.state來修改，而function沒有extend的功能，自然無法改this.state。
       2. 所以有state的話，就得用class。
       3. 並不是只有最頂端的app.js可以用class，任何需要用到自己的state的component都可以用class。
       4. 如果用到的state和其他Component無關，就把自己設成class，這樣state最多就傳到自己和兒女而已，和其他父母兄弟的component無關。
    4. 最頂端用class的方式的話，import就要有Component。
    5. constructor和props非必要，只有props需要在constructor裡面操作時，才需要。也就是在reder之前就需要計算props的話，就要constructor和props。
13. this.setState()：
    1. react是用這個function來更新變數，要注意的是，他只適合用來更新event改變時造成的更新。也就是說，以前JS用callback function那些eventListener的情況，現在才用setState()來更新。
    2. 計算結果的更新不要用this.setState()來更新，直接讓變數更新就好。因為效率緣故，一個event可能只會更新一次state，下一個event發生前this.state可能都還不會更新。
    3. class裡面的set.State之所以裡面的state需要加上curly bracket，也是destructure的關係。
14. 奇怪的地方：
    1. 和JS不同，function的定義竟然不用保留字function。
    2. 後來發現是因為JS在class裡定義method本來就不用保留字。
    3. class裡一般不會在render()以外設variable，variable都設在render裡面，這樣component才讀得到。
    4. 如果要設在render()以外，就要設在this.state裡，這樣component也可以讀得到。
15. Component的life cycle：
    1. Mounting：constructor()=>render()=>componentDidMount()=>render()
    2. componentWillMount：
        1. 大家錯用，不安全，所以將會React 17會取消這項功能，寫好的code會不能在React 17中跑。
        2. 要在render之前做些什麼事，可以放在constructor裡做，而不要放在componentWillMount。
        3. 一些component load後只有要跑一次的fetch，因為fetch完會更新state，所以不應該在component render完成前跑，這樣會造成component沒被更新，所以應該放到componentDidMount跑。
    3. State Update：setState()=>render()
    4. Unmounting：去別的網頁之前執行
16. props.children：state之外的另一種回傳方式，主要是回傳DOM的操作方式。
17. autobind this：不易理解的觀念
    1. 原本ES6以前，如果在class或function裡定義一個method，而且要在callback裡使用this.method，this會是undefined。
    2. 這時候就需要在constructor裡寫上一行：this.method = this.method.bind(this)，而React也提供一項功能，在constructor裡打上autobind(this)，就會把所有method綁定了。
    3. 然而ES6之後有內建autobind功能了，所以只要用ES6之後的語法arrow function，就會autobind，什麼事都不用做，就可以用this.method在callback之中了。
18. build完的檔是最佳化過的檔了，也轉成瀏覽器可以跑的檔了，可以直接拿build的檔去任何地方用。
19. 有dependency的放containers，獨立的放components資料夾。
20. 新style in line的用法，是用雙curly bracket下，用物件的屬性語法，jsx就會自動解析成css給DOM。至於為什麼是雙curly bracket，我認為第一個barcket代表這是javascript的語法了，不是style或html了，第二個bracket代表這是在object裡面。
21. 檔案處理：
    1. desktop上傳檔案在手機上就等於開啟相片和開照相機。
    2. FileReader：
        1. fileReader.readAsDataURL(檔案)可以把相片檔案轉成記憶體中的URL，顯示在瀏覽器中。
        2. fileReader.onloadend = arrow function，讓檔案讀完了之後，可以做arrow function裡的事。
    3. FormData：
        1. 用來把檔案包起來變成form的格式，這樣才能fetch出去。
        2. formData.append('用什麼名字包起來',檔案);
    4. 用ref把button的外觀取代inpute file的外觀，但保有inpute file的功能。
    5. inpute file的功能中，如果第二次選取的檔名和第一次選取的檔名不同的話，onChange的event不會被觸發。解決方式是另外設定一個const來放event.target.file，然後後續都用這個const來處理後續，然後把event.target.value設成空字串。
22. jsx的語法：
    1. form：
       1. sumit一定要搭配form才會有效
       2. react底下的form
          1. 不能用sumit搭配form，因為會引發網頁離開。
          2. 可以改用tag button。
          3. techyons裡的form template有一堆有的沒的tag最好都刪掉，或改成div，以免出現怪異行為。
          4. 例如for、value在Reac裡沒什麼用，可以刪掉。
    2. radio：react底下要去操作單選的radio先預載某個選項的話：
        1. 要單一選項的checked的property設成true，其他選項設成false。
        2. 不能用onClick，要用onChange。
        3. name如果不能使用了，只能用外面包label去用他。
    3. property改成camel命名，例如class改成className，onchange改成onChange。
    4. listener：
        1. 聽欄位的完整內容用：onChange
        2. 聽enter鍵用：onKeyDown或onKeyPress
    5. size：
        1. 螢幕截圖的尺寸：window.innerWidth、window.innerHeight
        2. 圖片的尺寸：.offsetWidth和.offsetHeight
    6. property：
        1. placeholder：欄位裡要預顯示文字
    7. input：
        1. file：onChange對於和上次選取相同檔名，因為會被視為沒有change，所以event會無法觸發。所以要把event.target.file指定給其他變數進行後續使用，然後把event.target.value設為空字串。
23. ref：
    1. 概念是把第一種dom的功能套用在第二種dom的外型上，第一種dom功能雖好，但是太醜之類的。
    2. 例如把input type是file的功能套在button上
        1. 把input外觀隱藏起來：style={{display:'none'}}
        2. 設定ref={(fileInput)=>{this.fileInput=fileInput}}
            1. 點下去後ref的fileInput會得到檔案
            2. 把fileInput送到this.fileInput中，this.fileInput才能和button有所連接，而這個ImageUpload的component必須是一個class，才會有this，function不會有this
            3. this.fileInput會是一個ref的物件，這個物件有個method是.click()，注意，不是.onClick，所以可以把button設定：onClick={()=>this.fileInput.click()}
    3. 例如按enter之後，自動focus移到下一個欄位
        1. 去要操控的dom中先設ref：
           `ref={this.inputName}；`
        2. 在constructor中把這個ref建立和連接起來：
           this.inputName = React.createRef();
        3. 利用這個ref的.current就代表這個dom，可以用這個dom的method操控dom：（這裡顯示的是另一個dom=>email的ref）：
           this.inputEmail.current.focus();
24. react hooks：
    1. 有幾個優點：
       1. 不用複雜的class和setState的語法。
       2. 專屬的setState()名稱，容易追蹤那個function改變state。
    2. 使用時機：
       1. 這個component需要有自己的state的時候，這個時機和class component一樣。
       2. 最棒的時機是，原有的function component需要state的時候，用hooks改寫幅度超小。
    3. 用法：
       1. `import React, {useState} from 'react';`
       2. 用useState宣告state和宣告設定state的function名稱：
        `const [state_variable,set_state_function_name] = useState(default_state_value);`
       3. 當成props傳下去：
           1. 如果要用event，要把值直接設定成state

                ```js
                    onClick={set_state_function_name(event)}
                ```

           2. 如果沒有要用event，要觸發就執行某些function，或設定state為其他值

                ```js
                    onClick={()=>{
                                set_state_function_name(其他值);
                                other_function();
                            }}
                ```

    4. useEffect()：
       1. 用來做class component的以下事情：
          1. componentDidMount。
          2. `render(){  判斷式;  return jsx}`判斷式在做的事。
       2. 我覺得沒有向useState()那麼好用，雖然用起來比較簡短clean，但是我覺得用class的用法比較直覺。
       3. 主要是設定什麼時候觸發state的更新，並且可以讓這個function component產生side effect，所以使用要小心，不見得什麼project都該改成hooks來做。
25. npm run biuld，建立精簡過的檔案。
26. Error Boundary：
    1. 弄一個ErrorBoundary的container component，而且會用到this.state，所以會用class不是fuction，名稱是自訂的。
    2. 主要是有componentDidCatch的功能：如果component本身有任何錯誤，就會跑componentDidCatch。
    3. constructor的this.state裡面放hasError這個attribute。
    4. componentDidCatch裡面放this.setState，用來改變hasError。
    5. render()設定錯誤就呈現錯誤訊息，正確就呈現props.children。
    6. 到parent去，用這個container component把要用的component包起來。
27. 放到github上：
    1. 先要push到github上。
    2. 改package.json檔，放上github repository的連結，例如："homepage": "https://yellowful.github.io/StarWarBot/"。
    3. 在terminal裡下指令：`npm install --save gh-pages`
        改package.json檔，裡的scripts：

        ```javascript
            "scripts": {
        +   "predeploy": "npm run build",
        -   "deploy": "gh-pages -d build"
        +   "deploy": "gh-pages -b master -d build"
            }
        ```

    4. 在terminal裡下指令：`npm run deploy`
    5. github的pages設定裡把master改成gh-pages branch
    6. build的時候，會做幾件事情：
        1. babel轉換：將各個node的library轉成舊的javascript，因為瀏覽器甚至對ECMS6的支援性還很差。
        2. minify：將程式變短變小，例如：只剩一行、變數只剩一個字，這樣可以加快瀏覽器下載和解析的速度。
        3. uglify：因為javascript是看得到原始碼的，所以會把程式弄的比較機器化，讓人類比較難看得懂。
28. 放到heroku上：
    1. deploy react app為了避免錯誤，記得先git merge到master。
    2. 先安裝npm serve package：
       npm install serve --s
    3. package.json：
       1. 加這行，讓在local端測試可以用npm run dev：
            "start:dev": "react-scripts start"
       2. 改這行，讓遠端用："start":"serve -s build"
       3. 也可以參考react官方網頁，關於deploy到static網站，改成:
           "start:dev": "react-scripts start",
           "start":"serve -s build",
           "build": "react-scripts build",
           "test": "react-scripts test",
           "eject": "react-scripts eject"
       4. 在local端測試就用：
           1. npm start:dev
           2. npm run start:dev
       5. homepage也可以改掉，沒改掉好像也沒影響。
    4. 在heroku網頁介面中開啟一個新的app
       1. 連接遠端已經存在的專案：heroku git:remote -a 遠端app名稱
       2. 依document的git指令deploy到這個app中
           1. git push heroku master
           2. 如果失敗，可以改用：
               git push heroku HEAD:master
    5. 環境變數：
        1. 把前端app的後端網址無法換成process.env.backendURL：
            1. backendURL是從環境變數傳進去，上傳到heroku之後，雖然heroku可以設定環境變數，但是沒有意義，原因是app的code的runtime不是在heroku上，heroku只是把檔案傳給browser，真正的runtime是在browser上，所以在heroku上設的環境變數沒有機會傳給app，而app在browser上run的時候，跟browser要環境變數是要不到的，因為我們無法向client設定環境變數。
            2. 就算heroku有什麼辦法可以把heroku的環境變數傳進去的話，保密的意義也不大，駭客在client端可以解析app的程式碼看到環境變數是多少，甚至也可以看browser向誰request資料，直接看到後端網址。
        2. 環境變數只能解決後端不想把敏感資料放原始碼和github一起公開的問題，完全無法解決前端洩漏敏感資料的問題，所以api key或其他不想讓人知道的敏感資料，只能放在後端，永遠不要放前端。
29. 自己猜React是怎麼用javascript寫出來的：
    1. React的Library裡面有export default ReactDOM的class，這個class有個method，叫.render()。
    2. 我們App是一個從React.Component繼承而來的class，裡面可以定義一個method叫render()，這個render()和ReactDOM.render()不一樣，但是這個method需要回傳一段很像是html的文字，其實是jsx文字，我們把整個App export給index.js。
    3. 我們在index.js中，呼叫ReactDOM.render()，這個React.DOMrender()會去跟App這個React.Component延伸而來的class要render()這個method，然後得到render()這個method所回傳的jsx，ReactDOM.render()就像是一個畫家，會把他給畫成html，再丟給瀏覽器。
    4. function component：
       1. 一定要在App.render的return裡面以jsx的方式出現，所以function需要return的也是jsx。
       2. function component會export給App.js，所以function component就和App.js裡定義的function沒有什麼兩樣。
       3. 但是App.js裡的其他function為什麼不會是function component呢？因為那些function沒有：
          1. return jsx
          2. function名稱被改寫成jsx放在render()的return中。
       4. 所以React的library裡還有export一個function(可能吧？)叫做React，App.js和所有的function component都需要import這個React，他就是在做這幾件事情：
          1. 這個function是不是有return jsx。
          2. 這個function名稱有沒有被放在render()的return中。
          3. 如果都是的話，他就是合法的jsx語法，可以被ReactDOM.render()正確的畫出來。
