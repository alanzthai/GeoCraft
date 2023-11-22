import { React, useState, useContext } from "react";
import '../../App.css';
import AuthContext from '../../auth'
import GlobalStoreContext from "../../store";
import { AppBanner, MapCard, MapCreateModal, DeleteMapModal, ForkMapModal, ExportMapModal } from '../../components'
import "./ProfilePage.scss";

export default function ProfilePage() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('myMaps');
  const [newMapShow, setNewMapShow] = useState(false);
  const [deleteMapShow, setDeleteMapShow] = useState(false);
  const [forkMapShow, setForkMapShow] = useState(false);
  const [exportMapShow, setExportMapShow] = useState(false);
  const username = auth.getUsername();

  async function handleClose(event) {
    setNewMapShow(false)
  }
  // async function handleNewMap(event) {
  //   setNewMapShow(true)
  // }
  async function handleDeleteMapClose(event) {
    setDeleteMapShow(false)
  }
  async function handleDeleteMap(event) {
    setDeleteMapShow(true);
  }
  async function handleForkClose(event) {
    setForkMapShow(false)
  }
  async function handleFork(event) {
    setForkMapShow(true);
  }
  async function handleExportClose(event) {
    setExportMapShow(false)
  }
  async function handleExport(event) {
    setExportMapShow(true);
  }

  // var testMap1 = {
  //   title: 'USA Map',
  //   author: 'Darren',
  //   likes: ['Darren', 'Brian'],
  //   dislikes: [],
  //   published: true
  // }
  // var testMap2 = {
  //   title: 'test map 2',
  //   author: 'Brian',
  //   likes: ['Darren'],
  //   dislikes: ['Brian'],
  //   published: false
  // }
  var functions = {
    handleDeleteMap: handleDeleteMap,
    handleFork: handleFork,
    handleExport: handleExport
  }

  // const publishedArray = [testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1, testMap1];
  // const unpubArray = [testMap2, testMap2, testMap2, testMap2, testMap2]

  // const createMapCards = (maps, functions) => {
  //   return maps.map((map, index) => (
  //     <div class="col-md-3 mb-2" key={index}>
  //       <MapCard map={map} functions={functions} />
  //     </div>
  //   ));
  // };

  // const createRows = (maps, functions, includeAddMap) => {
  //   const rows = [];
  //   if (includeAddMap) {
  //     rows.push(
  //       <div class="row g-2" key={0}>
  //         <div class="col-md-3 mb-3 add-map">
  //           <button type="button" class="btn btn-outline-dark w-100 h-100 add-map-btn" onClick={handleNewMap}>
  //             + Create new map
  //           </button>
  //         </div>

  //         {createMapCards(maps.slice(0, 3), functions)}
  //       </div>
  //     );
  //   }

  //   else {
  //     rows.push(
  //       <div class="row g-2" key={0}>
  //         {createMapCards(maps.slice(0, 4), functions)}
  //       </div>
  //     );
  //   }

  //   for (let i = 3; i < maps.length; i += 4) {
  //     const rowMaps = maps.slice(i, i + 4);
  //     rows.push(
  //       <div class="row g-2" key={i}>
  //         {createMapCards(rowMaps, functions)}
  //       </div>
  //     );
  //   }

  //   return rows;
  // };

  function createRows(mapCards) {
    const rows = [];
    const cardsPerRow = 4;

    for (let i = 0; i < mapCards.length; i += cardsPerRow) {
      const row = mapCards.slice(i, i + cardsPerRow).map((map, index) => (
        <div className="col-md-3 mb-2" key={index}>
          <MapCard map={map} functions={functions} />
        </div>
      ));

      rows.push(
        <div className="row g-2" key={i / cardsPerRow}>
          {row}
        </div>
      );
    }

    return <div>{rows}</div>;
  }

  return (
    <div class="profile-container">
      <AppBanner />
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">

          <div class="text-white d-flex flex-row profile-banner">
            <div class="ms-4 mt-5 d-flex flex-column">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1ceyneFkZchgkrwN7dZxWNl_C5Dctvc5BzNh_rEzPQ&s"
                alt="Default Profile Pic"
                class="img-fluid img-thumbnail mt-4 mb-2 profile-pic"
              />

              <button type="button" class="btn btn-outline-dark edit-profile-btn" data-mdb-ripple-color="dark">
                Edit profile
              </button>
            </div>

            <div class="ms-3 username-text">
              <h2>{username}</h2>
            </div>
          </div>

          <div class="p-4 bg-light">
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">{(store.idNamePairs.filter(pair => pair.ownerName === username)).length}</p>
                <p class="small text-muted mb-0">Maps</p>
              </div>

              <div class="px-3">
                <p class="mb-1 h5">{(store.idNamePairs.filter(pair => pair.likes.includes(pair.ownerEmail))).length}</p>
                <p class="small text-muted mb-0">Likes</p>
              </div>
            </div>
          </div>

          <div class="card-body p-4 text-black">
            {/* <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <p class="font-italic mb-1">Web Developer</p>
                <p class="font-italic mb-1">Lives in New York</p>
                <p class="font-italic mb-0">Photographer</p>
              </div>
            </div> */}
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  class={`nav-link ${activeTab === 'myMaps' ? 'active' : ''}`}
                  onClick={() => setActiveTab('myMaps')}
                  data-bs-toggle="tab"
                >
                  My Maps
                </button>
                <button
                  class={`nav-link ${activeTab === 'likedMaps' ? 'active' : ''}`}
                  onClick={() => setActiveTab('likedMaps')}
                  data-bs-toggle="tab"
                >
                  Liked Maps
                </button>
              </div>
            </nav>
            <div className="tab-content" >
              {/* {activeTab === 'myMaps' && createRows(unpubArray, functions, true)}
              {activeTab === 'likedMaps' && createRows(publishedArray, functions, false)} */}
              {activeTab === 'myMaps' && createRows(store.idNamePairs.filter(pair => pair.ownerName === username))}
              {activeTab === 'likedMaps' && createRows(store.idNamePairs)}
            </div>
          </div>
        </div>
      </div >
      <MapCreateModal show={newMapShow} handleClose={handleClose} />
      <DeleteMapModal deleteMapShow={deleteMapShow} handleDeleteMapClose={handleDeleteMapClose} />
      <ForkMapModal forkMapShow={forkMapShow} handleForkMapClose={handleForkClose} />
      <ExportMapModal exportMapShow={exportMapShow} handleExportMapClose={handleExportClose} />
    </div >
  );
}