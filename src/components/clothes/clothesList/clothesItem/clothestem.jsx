/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, NoImgIcon } from "../../../../assets/icon";
import axios from "axios";
import { IdsContext } from "../../../../context/idContext";
import { ClothesDataContext } from "../../../../context/clothesDataContext";

export default function ClothesItem({
  data,
  click,
  setModalOpen,
  index,
  toast,
  showProducts,
}) {
  const url = "https://api.dressme.uz";
  let token = sessionStorage.getItem("token");

  const [, , reFetch] = useContext(ClothesDataContext);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-product-status/${data?.id}`,
        {
          status: "approved",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((d) => {
        if (d.status === 200) {
          toast.success(d?.data?.message);
          reFetch();
        }
      })
      .catch((v) => {
        console.log(v);
      });
  };

  const [, setId] = useContext(IdsContext);

  return (
    <div className="flex items-center w-full mb-8 md:mb-14 md:pt-[40px]">
      <div
        onClick={() => {
          click(data?.id);
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
          data?.isCheck
            ? "bg-[#007DCA] border-[#007DCA]"
            : "bg-white border-checkboxBorder"
        } hidden md:flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${
            data?.isCheck ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <CheckIcon />
        </span>
      </div>
      <div className="relative h-[100px] hidden border-lightBorderColor border rounded-[12px] bg-white px-5 py-[10px] md:flex items-center w-full">
        <div className="w-[3%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {index}
        </div>
        <div className="w-[9%]">
          <div
            style={{
              backgroundImage: `url(${data?.photos[0]?.url_photo})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="absolute top-[-25px] bg-[#FCFCFC] border border-[#F2F2F2] w-[110px] h-[150px] flex items-center justify-center rounded-[12px]"
          >
            {data?.photos[0]?.url_photo ? null : <NoImgIcon />}
          </div>
        </div>
        <div className="w-[16%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.name_ru}
        </div>
        <div className="w-[12%] px-4 break-all flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.sku}
        </div>
        <div className="w-[10%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.type?.name_ru}
        </div>
        <div className="w-[11%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.created_at}
        </div>
        <div className="w-[11%] px-4 flex items-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
          {data?.cost?.price
            ? parseInt(data?.cost?.price)
                ?.toLocaleString()
                ?.split(",")
                ?.join(" ") + " сум"
            : "-"}
        </div>
        <Link
          to={`cloth/${data?.id}`}
          className="w-[8%] cursor-pointer flex items-center justify-center text-center hover:underline text-weatherWinterColor text-[16px] not-italic font-AeonikProMedium"
        >
          Подробнее
        </Link>

        <div className="w-[20%] px-4 flex items-center justify-center text-tableTextTitle2 text-base not-italic font-AeonikProMedium md:mr-10">
          {showProducts !== "updated" ? (
            <div className="flex items-center gap-x-2">
              {" "}
              <button
                onClick={() => approveFunc()}
                className={`${
                  data?.status === "pending" || data?.status === "declined"
                    ? ""
                    : "hidden"
                } w-fit px-2 py-1 rounded-[20px] font-AeonikProMedium border border-[#5EB267] text-[#5EB267]`}
              >
                Одобрить
              </button>
              <button
                onClick={() => {
                  setId(data?.id);
                  setModalOpen(true);
                }}
                className={`${
                  data?.status === "pending" || data?.status === "approved"
                    ? ""
                    : "hidden"
                } w-fit px-2 py-1 rounded-[20px] font-AeonikProMedium border border-[#E85353] text-[#E85353]`}
              >
                Отказать
              </button>
            </div>
          ) : null}

          {showProducts === "updated" ? (
            <button
              onClick={() => approveFunc()}
              className={`w-fit px-2 py-1 rounded-[20px] border border-[#5EB267] text-[#5EB267]`}
            >
              Одобрить
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile */}

      <div className="block md:hidden border rounded-[8px] border-[#F2F2F2] p-[10px] w-full mb-[12px] last:mb-[0]">
        <div className="flex items-center w-full justify-between mb-[8px]">
          <div
            onClick={() => {
              click(data?.id);
            }}
            className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${
              data?.isCheck
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } md:hidden flex items-center justify-center rounded mr-[8px]`}
          >
            <span
              className={`${
                data?.isCheck ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <CheckIcon size={"small"} />
            </span>
          </div>

          <div className="flex items-center">
            <div className="border-b min-w-[10px]"></div>
            <div className="mx-[5px] text-[16px] font-AeonikProRegular text-[#D2D2D2]">
              {index < 10 ? "0" : ""}
              {index}
            </div>
            <div className="border-b min-w-[10px]"></div>
          </div>

          <Link
            to={`cloth/${data?.id}`}
            className="text-[#007DCA] text-[12px] font-AeonikProMedium cursor-pointer"
          >
            Подробнее
          </Link>
        </div>
        <div className="h-[148px] w-full rounded-lg overflow-hidden mb-[12px] border border-[#f2f2f2]">
          <img
            src={data?.photos[0]?.url_photo}
            alt="img"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[45%]">
            Название
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Артикул
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[15%]">
            Тип
          </div>
        </div>
        <div className="py-[5px] px-[15px] flex mb-[10px]">
          <div className="w-[45%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.name_ru}
          </div>
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.sku}
          </div>
          <div className="w-[15%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.type?.name_ru}
          </div>
        </div>
        <div className="bg-[#FCFCFC] border py-[5px] px-[15px] border-[#F2F2F2] rounded-[8px] flex mb-[8px]">
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[45%]">
            Дата
          </div>
          <div className="text-[#3F6175] text-[12px] font-AeonikProMedium w-[40%]">
            Цена
          </div>
        </div>
        <div className="py-[5px] px-[15px] flex mb-[24px]">
          <div className="w-[45%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.created_at}
          </div>
          <div className="w-[40%] text-[11px] font-AeonikProMedium text-[#2C2C2C]">
            {data?.cost?.price
              ? parseInt(data?.cost?.price)
                  ?.toLocaleString()
                  ?.split(",")
                  ?.join(" ") + " сум"
              : "-"}
          </div>
        </div>

        {showProducts !== "updated" ? (
          <div className="w-full flex gap-[30px]">
            <button
              onClick={() => {
                setId(data?.id);
                setModalOpen(true);
              }}
              className={`${
                data?.status === "pending" || data?.status === "approved"
                  ? ""
                  : "hidden"
              } rounded-[8px] py-[8px] w-full bg-[#FFE1E1] text-[12px] font-AeonikProMedium text-[#E51515]`}
            >
              Отказать
            </button>
            <button
              onClick={() => approveFunc()}
              className={`${
                data?.status === "pending" || data?.status === "declined"
                  ? ""
                  : "hidden"
              } rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
            >
              Одобрить
            </button>
          </div>
        ) : null}
        {showProducts === "updated" ? (
          <div className="w-full flex gap-[30px]">
            <button
              onClick={() => approveFunc()}
              className={` rounded-[8px] py-[8px] w-full bg-[#DEFCE1] text-[12px] font-AeonikProMedium text-[#12C724]`}
            >
              Одобрить
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
