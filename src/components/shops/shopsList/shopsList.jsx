import { useContext, useEffect, useState } from "react";
import { AllowedIcon, BackIcon, CheckIcon, EditedIcon, NotAllowedIcon, SearchIcon, StarIcon, WaitingForAllowIcon } from "../../../assets/icon";
import { PhoneNavbar } from "../../phoneNavbar";
import { ProductsContext } from "../../../context/productsContext";
import { ShopsDataContext } from "../../../context/shopsDataContext";
import { ToastContainer} from "react-toastify";

import WiFiLoader from "../../../assets/loader/wifi_loader.gif";
import CancelModal from "../../clothes/clothesList/ModalCancel";
import ShopsItem from "./shopsItem/shopsItem";

export default function ShopsList() {

  const [modalOpen, setModalOpen] = useState(false);

  const [dataShops, setDataShops, , loader] = useContext(ShopsDataContext);

  // console.log(dataShops,'dataShops');

  let newData = dataShops;

  // console.log(newData,'newData');

  const [filteredData, setFilteredData] = useState([]);

  console.log(filteredData,'filteredData-shops');
  
  useEffect(() => {
    setFilteredData(newData);
  }, [newData]);

  const filterFunc = (e) => {
    const filtered = dataShops?.map((seller) => {
      console.log(seller,'seller');
      const filteredShops = seller?.shops?.filter((shop) => {
        return shop?.name_ru
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
 
      return { ...seller, shops: filteredShops };
    });
 
    setFilteredData(filtered);
  };

   // // Count items -----------

  let waitingCount = 0;
  let allowedCount = 0;
  let notAllowedCount = 0;
  let updatedCount = 0;

  filteredData?.forEach((seller) => {
    // console.log(seller,'seller-shop');
    seller?.shops?.forEach((shop) => {
        if (shop?.status === "pending") {
          ++waitingCount;
        } else if (shop?.status === "approved") {
          ++allowedCount;
        } else if (shop?.status === "declined") {
          ++notAllowedCount;
        } else if (shop?.status === "updated") {
          ++updatedCount;
        }
    });
  });
    
  let allCount = waitingCount + allowedCount + notAllowedCount + updatedCount;
  
  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

   let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

   const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = dataShops?.map((item) => {
        return { ...item, isCheck: true };
      });
      setDataShops(newArr);
    } else if (id === "allNotCheck") {
      let newArr = dataShops?.map((item) => {
        return { ...item, isCheck: false };
      });
      setDataShops(newArr);
    } else {
      let newArr = dataShops?.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setDataShops(newArr);
    }
  };

    useEffect(() => {
    let newData = dataShops?.filter((item) => item.isCheck === true);
    if (newData?.length) {
      setSomeChecked(true);
    } else {
      setSomeChecked(false);
    }
  }, [dataShops]);
  
  // Products Context
  const [showProducts, setShowProducts] = useContext(ProductsContext);

  console.log(showProducts,'showProducts-shop');

  let dataCount = 0;
  if (showProducts === "pending") {
    dataCount = waitingCount;
  } else if (showProducts === "approved") {
    dataCount = allowedCount;
  } else if (showProducts === "declined") {
    dataCount = notAllowedCount;
  } else if (showProducts === "updated") {
    dataCount = updatedCount;
  }

  function approveFunc () {  }

    // up btn

  useEffect(() => {
    let upBtn = document.querySelector("#upBtn");

    upBtn.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });

    window.addEventListener("scroll", () => {
      let scrollTop = window.scrollY;

      if (scrollTop > 80) {
        upBtn.style.display = "flex";
      } else {
        upBtn.style.display = "none";
      }
    });
  }, []);

   useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  console.log(dataCount,'dataCount-shop');


return(
<div>
    <div className="md:mb-[15px] md:border-b py-[18px] flex items-center justify-between">
        <div className="block md:hidden w-full">
            <PhoneNavbar filterFuncCloThes={filterFunc} />
        </div>

        {showProducts === "pending" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "approved" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "declined" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}
        {showProducts === "updated" ? (
        <div className="font-AeonikProMedium text-[24px] text-black hidden md:block">
            Все магазины
        </div>
        ) : null}

        <label
            className="overflow-hidden px-[13px] relative w-full max-w-[400px] hidden md:flex items-center border border-searchBgColor rounded-lg ">
            <input
                className="text-[13px] md:text-base outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black"
                type="email" placeholder="Поиск" required inputMode="search" onChange={(e)=> filterFunc(e)}
            />
            <button
                className="bg-[#F7F7F7] h-full w-[50px] rounded-r-lg flex items-center justify-center absolute top-0 right-0 active:scale-90">
                <SearchIcon />
            </button>
        </label>
    </div>

    <div className="w-full mt-4 pb-2">
      <div className="flex items-center justify-between gap-x-1 mb-[25px] md:mb-[0]">
        <div className="flex gap-x-1">
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                Общее количество:
            </span>
            <span className="text[#303030] text-[13px] md:text-[20px] not-italic font-AeonikProMedium">
                {allCount}
            </span>
        </div>

        {/* Выбранные */}
        <div className="hidden w-full md:w-fit md:flex items-center gap-x-[30px] border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
        <span className=" font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
        </span>
        <div className="flex items-center">
            {showProducts === "pending" ? (
            <div className="flex items-center ml-auto">
                <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                Одобрить
                </button>
                <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
                <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
                >
                Отказать
                </button>
            </div>
            ) : null}
            {showProducts === "approved" ? (
            <div className="flex items-center ml-auto">
                <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-lg not-italic font-AeonikProMedium"
                >
                Отказать
                </button>
            </div>
            ) : null}
            {showProducts === "declined" ? (
            <div className="flex items-center ml-auto">
                <button
                // onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                Одобрить
                </button>
            </div>
            ) : null}
            {showProducts === "status_update" ? (
            <div className="flex items-center ml-auto">
                <button
                // onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
                >
                Одобрить
                </button>
            </div>
            ) : null}
        </div>
        </div>
      </div>

      <div className="flex mb-[24px] md:hidden">
        <div
          onClick={() => setShowProducts("pending")}
          className={`${
            showProducts === "pending"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Ожидающие товары</div>{" "}
          <div>({waitingCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("approved")}
          className={`${
            showProducts === "approved"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Одобренные товары</div>{" "}
          <div>({allowedCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("declined")}
          className={`${
            showProducts === "declined"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Отказанные товары</div>{" "}
          <div>({notAllowedCount})</div>
        </div>
        <div
          onClick={() => setShowProducts("status_update")}
          className={`${
            showProducts === "status_update"
              ? "text-[#007DCA] border-[#007DCA]"
              : "text-[#303030] border-[#F2F2F2]"
          } border-b pb-[12px] text-center text-[11px] ll:text-[14px] px-[2x] cursor-pointer font-AeonikProRegular`}
        >
          <div className="mb-[3px]">Обновленные товары</div>{" "}
          <div>({updatedCount})</div>
        </div>
      </div>

      <div className="flex md:hidden mb-[18px] items-center justify-between gap-x-1">
        <div
          onClick={() => {
            onCheck(checkIndicator);
            setAllChecked(!allChecked);
          }}
          className="select-none cursor-pointer flex md:hidden items-center text-[14px] font-AeonikProMedium text-[#303030]"
        >
          Выбрать все
          <div
            className={`ml-[8px] cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } flex items-center justify-center rounded`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon size={"small"} />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile selected */}
      <div className="w-full md:hidden flex items-center justify-between pb-[24px]">
        <div className=" font-AeonikProMedium text-base ll:text-sm md:text-lg text-mobileTextColor">
          Выбранные:
        </div>
        <div className="flex items-center">
          {showProducts === "pending" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
              <span className="w-[2px] h-4 bg-addLocBorderRight mx-[15px]"></span>
              <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-base not-italic font-AeonikProMedium"
              >
                Отказать
              </button>
            </div>
          ) : null}
          {showProducts === "approved" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => setModalOpen(true)}
                type="button"
                className="text-[#E51515] text-base not-italic font-AeonikProMedium"
              >
                Отказать
              </button>
            </div>
          ) : null}
          {showProducts === "declined" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
          {showProducts === "updated" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-base not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 hidden md:flex justify-end items-center md:justify-between mx-auto pb-6">
        <section className="flex items-center w-fit bg-LocationSelectBg rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setShowProducts("pending")}
            className={`${
              showProducts === "pending"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <WaitingForAllowIcon />
            </span>
            <span>Ожидающие товары ({waitingCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("approved")}
            className={`${
              showProducts === "approved"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <AllowedIcon />
            </span>
            <span>Одобренные товары ({allowedCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("declined")}
            className={`${
              showProducts === "declined"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <NotAllowedIcon />
            </span>
            <span>Отказанные товары ({notAllowedCount})</span>
          </button>
          <span className="w-[1px] h-5 bg-[#C5C5C5] mx-[5px]"></span>
          <button
            type="button"
            onClick={() => setShowProducts("updated")}
            className={`${
              showProducts === "updated"
                ? "text-weatherWinterColor border-[1.5px]"
                : "text[#303030]"
            }  text-[16px] leading-none not-italic font-AeonikProMedium	 border-weatherWinterColor w-[260px] h-[44px] rounded-lg flex items-center justify-center gap-x-1`}
          >
            <span className="mr-[5px]">
              <EditedIcon />
            </span>
            <span>Обновленные товары ({updatedCount})</span>
          </button>
        </section>

        <div
          onClick={() => {
            onCheck(checkIndicator);
            setAllChecked(!allChecked);
          }}
          className="hidden md:flex items-center cursor-pointer select-none font-AeonikProMedium"
        >
          Выбрать все
          <div
            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } hidden md:flex items-center justify-center rounded ml-[10px]`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon />
            </span>
          </div>
        </div>
      </div>

      {dataCount ? (
          filteredData?.map((item) => {
            console.log(item,'dataCount-shops')
            return (
              <div className="w-full" key={item?.id}>
                <div className="mx-auto font-AeonikProRegular text-[16px]">
                  <div className="w-full ">
                    
                    {/* Status Waiting */}
                    {showProducts === "pending"
                      ? item?.shops?.map((item_2,index) => {
                        console.log(item_2,'item_2-shops');         
                          return (
                            <div key={item_2?.id}>
                              {item_2?.status === "pending" ? (
                                <div className="mb-8">
                                  {index === 0 ? (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
                                        <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
                                          <div
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                              allChecked
                                                ? "bg-[#007DCA] border-[#007DCA]"
                                                : "bg-white border-checkboxBorder"
                                            } flex items-center justify-center rounded mr-[8px]`}
                                          >
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "hidden md:flex items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon />
                                            </span>
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "flex md:hidden items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon
                                                size={"small"}
                                              />
                                            </span>
                                          </div>
                                          <button
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className="text-[#007DCA] mr-[7px]"
                                          >
                                            {item?.name}
                                          </button>
                                          ({item?.shops?.length || 0})
                                        </div>
                                      </div>

                                      <div className="mb-[18px] flex items-center text-tableTextTitle">
                                        <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                          <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            No:
                                          </div>
                                          <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Фото
                                          </div>
                                          <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Название
                                          </div>
                                          <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Артикул
                                          </div>
                                          <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Тип
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Дата
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Цена
                                          </div>
                                          <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Действие
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  <ShopsItem
                                    data={item_2}
                                    index={index}
                                    onCheck={onCheck}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })                          
                      : null}

                    {/* Status Allowed */}
                    {showProducts === "approved"
                      ? item?.shops?.map((item_2, index) => {
                        console.log(item_2,'item_2-shops');
                          return (
                            <div key={item_2?.id}>
                              {item_2?.status === "approved" ? (
                                <div className="mb-8">
                                  {index === 0 ? (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
                                        <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
                                          <div
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                              allChecked
                                                ? "bg-[#007DCA] border-[#007DCA]"
                                                : "bg-white border-checkboxBorder"
                                            } flex items-center justify-center rounded mr-[8px]`}
                                          >
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "hidden md:flex items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon />
                                            </span>
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "flex md:hidden items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon
                                                size={"small"}
                                              />
                                            </span>
                                          </div>
                                          <button
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className="text-[#007DCA] mr-[7px]"
                                          >
                                            {item?.name}
                                          </button>
                                          ({item?.shops?.length || 0})
                                        </div>
                                      </div>

                                      <div className="mb-[20px] flex items-center text-tableTextTitle">
                                        <div className=" min-w-[24px]  min-h-[24px] hidden md:flex mr-[8px]"></div>
                                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                          <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            No:
                                          </div>
                                          <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Фото
                                          </div>
                                          <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Название
                                          </div>
                                          <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Артикул
                                          </div>
                                          <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Тип
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Дата
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Цена
                                          </div>
                                          <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Действие
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  <ShopsItem
                                    data={item_2}
                                    index={index}
                                    onCheck={onCheck}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status NotAllowed */}
                    {showProducts === "declined"
                      ? item?.shops?.map((item_2,index) => {
                          return (
                            <div key={item_2?.id}>
                              {item_2?.status === "declined" ? (
                                <div className="mb-8">
                                  {index === 0 ? (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
                                        <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
                                          <div
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                              allChecked
                                                ? "bg-[#007DCA] border-[#007DCA]"
                                                : "bg-white border-checkboxBorder"
                                            } flex items-center justify-center rounded mr-[8px]`}
                                          >
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "hidden md:flex items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon />
                                            </span>
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "flex md:hidden items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon
                                                size={"small"}
                                              />
                                            </span>
                                          </div>
                                          <button
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className="text-[#007DCA] mr-[7px]"
                                          >
                                            {item?.name}
                                          </button>
                                          ({item?.shops?.length || 0})
                                        </div>
                                      </div>

                                      <div className="mb-[10px] flex items-center text-tableTextTitle">
                                        <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                          <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            No:
                                          </div>
                                          <div className="w-[8%] text-[#5c753f] text-lg not-italic font-AeonikProMedium">
                                            Фото
                                          </div>
                                          <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Название
                                          </div>
                                          <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Артикул
                                          </div>
                                          <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Тип
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Дата
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Цена
                                          </div>
                                          <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Действие
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  <ShopsItem
                                    data={item_2}
                                    index={index}
                                    onCheck={onCheck}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                    {/* Status Updated */}
                    {showProducts === "updated"
                      ? item?.shops?.map((item_2,index) => {
                          return (
                            <div key={item_2?.id}>
                              {item_2?.status === "updated" ? (
                                <div className="mb-8">
                                  {index === 1 ? (
                                    <div className="w-full">
                                      <div className="flex items-center justify-between mb-4 md:mb-7 font-AeonikProMedium text-[16px]">
                                        <div className="text-[20px] md:text-[24px] font-AeonikProMedium flex items-center">
                                          <div
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className={`cursor-pointer min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px] border border-checkboxBorder ${
                                              allChecked
                                                ? "bg-[#007DCA] border-[#007DCA]"
                                                : "bg-white border-checkboxBorder"
                                            } flex items-center justify-center rounded mr-[8px]`}
                                          >
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "hidden md:flex items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon />
                                            </span>
                                            <span
                                              className={`${
                                                allChecked
                                                  ? "flex md:hidden items-center justify-center"
                                                  : "hidden"
                                              }`}
                                            >
                                              <CheckIcon
                                                size={"small"}
                                              />
                                            </span>
                                          </div>
                                          <button
                                            onClick={() => {
                                              onCheck(
                                                checkIndicator
                                              );
                                              setAllChecked(
                                                !allChecked
                                              );
                                            }}
                                            className="text-[#007DCA] mr-[7px]"
                                          >
                                            {item?.name}
                                          </button>
                                          ({item?.shops?.name})
                                        </div>
                                      </div>

                                      <div className="mb-[10px] flex items-center text-tableTextTitle">
                                        <div className=" min-w-[24px]  min-h-[24px] hidden md:flex  mr-[8px]"></div>
                                        <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor px-5 h-10 md:flex items-center w-full">
                                          <div className="w-[4%]  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            No:
                                          </div>
                                          <div className="w-[8%] text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Фото
                                          </div>
                                          <div className="w-[16%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Название
                                          </div>
                                          <div className="w-[12%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Артикул
                                          </div>
                                          <div className="w-[10%] px-4  text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Тип
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Дата
                                          </div>
                                          <div className="w-[11%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Цена
                                          </div>
                                          <div className="w-[20%] px-4 text-[#3F6175] text-lg not-italic font-AeonikProMedium">
                                            Действие
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}

                                  <ShopsItem
                                    data={item_2}
                                    index={index}
                                    onCheck={onCheck}
                                  />
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      : null}

                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center bg-lightBgColor rounded-lg h-[calc(100vh-280px)]">
            {loader ? (
              <div
                style={{
                  backgroundImage: `url('${WiFiLoader}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
                className="w-[100px] h-[100px]"
              ></div>
            ) : (
              <div className="font-AeonikProMedium text-xl">Нет товаров</div>
            )}
          </div>
        )}

    </div>

    <CancelModal setModalOpen={setModalOpen} modalOpen={modalOpen} />

    <button
        id="upBtn"
        className="fixed bg-bgColor opacity-70 bottom-5 right-5 hidden items-center justify-center w-[48px] h-[48px] border border-[#c1c1c1] rounded-full shadow-[0_9px_25px_0_#8480b147] active:scale-90"
      >
        <div className="rotate-90">
          <BackIcon width={24} height={24} />
        </div>
      </button>

      <ToastContainer />

</div>
)
}