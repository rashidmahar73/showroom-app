import { Fragment } from "react";

import { Navbar } from "../components";

function AppLayout({ children }: any) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}

export default AppLayout;
