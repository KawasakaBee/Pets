import React, { ReactNode, useState } from 'react';
import './container.scss';

interface IContainerProp {
  children: ReactNode;
}

export function Container({ children }: IContainerProp) {
  const [ligthTheme, setLightTheme] = useState(true);

  return (
    <div className={ligthTheme ? 'app' : 'app dark'}>
      <p className={ligthTheme ? "version" : "version dark-version"}>Alpha v1.5</p>
      <button className={ligthTheme ? "app__theme" : "app__theme dark-button"} onClick={() => setLightTheme(!ligthTheme)}>Change theme</button>
      {children}
    </div>
  )
}
