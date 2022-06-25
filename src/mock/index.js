import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import pages from "./pages";

let mock = new MockAdapter(axios);

pages.installData(mock);
