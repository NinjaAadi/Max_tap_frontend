import Navbar from "./components/navbar/navbar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ads from "./components/ads/ads";
import Category from "./components/category/category";
import ShowAllAds from "./components/ads/show_ads.js/show_add";
import CreateAd from "./components/ads/create_ads/create_ads";
import ViewAllCategory from "./components/category/view_all_category/view_all_category";
import CreateCategory from "./components/category/create_category/create_category";
import CreateAdvertiser from "./components/advertiser/create_advertiser/create_advertiser";
import ViewAllAdvertiser from "./components/advertiser/view__all_advertiser/view_all_advertise";
import Advertiser from "./components/advertiser/advertiser";
import { Fragment } from "react";
import EditAdModal from "./components/ads/modals/edit_ad";
import DeledeAdModal from "./components/ads/modals/delete_ad";
const App = () => {
  return (
    <Fragment>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Ads />}>
              <Route exact path="/showallads" element={<ShowAllAds />} />
              <Route exact path="/editad/:id" element={<EditAdModal />} />
              <Route exact path="/createad" element={<CreateAd />} />
              <Route exact path="/deletead/:id" element={<DeledeAdModal />} />
            </Route>
            <Route exact path="/category" element={<Category />}>
              <Route
                exact
                path="/category/viewallcategory"
                element={<ViewAllCategory />}
              />
              <Route
                exact
                path="/category/createcategory"
                element={<CreateCategory />}
              />
            </Route>
            <Route exact path="/advertiser" element={<Advertiser />}>
              <Route
                exact
                path="/advertiser/viewalladvertiser"
                element={<ViewAllAdvertiser />}
              />
              <Route
                exact
                path="/advertiser/createadvertiser"
                element={<CreateAdvertiser />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
