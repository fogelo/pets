/* 
Чем же отличается useEffect от useLayoutEffect? 

useEffect работает по следующему сценарию - сначала на основе return создается виртуальное дерево, затем оно отдается на отрисовку в браузер
и только затем вызывается каллбек переданный в useEffect, и после этого деревео заново строится (если был вызван setState).


чтобы увидеть разницу в этом примере нужно замедлить процессор на x6

рендер - это не отрисовака браузера, а это вызов компонента реактом и построение virtual dom

useEffect - рендер(построение VDOM)>отрисовка браузером>вызов каллбека в useEffect>рендер>отрисовка браузером 
useLayoutEffect - рендер>вызов каллбека в useEffect>рендер>отрисовка браузером

*/

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const UseLayoutEffect = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    let i = 0;

    while (i < 200000000) {
      i++;
    }

    setWidth(ref.current.clientWidth);
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: 100, height: 100, background: "green", color: "white" }}
    >
      width: {width}
    </div>
  );
};

export default UseLayoutEffect;
