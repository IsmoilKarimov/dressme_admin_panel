import { useContext, useEffect, useState } from "react";
import { BackIcon, StarIcon } from "../../../assets/icon";
import CancelModal from "./modalCancel";
import ColorModal from "./modalColor";
import Carousel from "./carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClothesDataContext } from "../../../context/clothesDataContext";
import { SellersContext } from "../../../context/sellersContext";

export const ClothMoreAbout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  // const [allPhotosModalOpen, setAllPhotosModalOpen] = useState(false);

  const url = "https://api.dressme.uz";
  const [data, setData] = useState([]);

  const seasons = data?.seasons;
  const colors = data?.colors;
  const sections = data?.sections ? data?.sections : [];
  const subSections = data?.sub_sections ? data?.sub_sections : [];

  const params = useParams();
  let token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    axios(`${url}/api/admin/products/${params?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((d) => {
      setData(d?.data?.product);
    });
  }, []);

  // Products Context
  const [showSellers] = useContext(SellersContext);
  const [, , reFetch] = useContext(ClothesDataContext);

  const approveFunc = () => {
    axios
      .post(
        `${url}/api/admin/change-product-status/${params?.id}`,
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
          navigate("/clothes");
        }
      })
      .catch((v) => {
        console.log(v);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="md:border-b py-[18px] flex items-center mb-[6px]">
        <Link
          to="/clothes"
          className="rounded-md border border-[#D5D5D5] mr-[30px]"
        >
          <BackIcon />
        </Link>
        {showSellers === "pending" ? (
          <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
            Ожидающие товары
          </div>
        ) : null}
        {showSellers === "approved" ? (
          <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
            Одобренные товары
          </div>
        ) : null}
        {showSellers === "declined" ? (
          <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
            Отказанные товары
          </div>
        ) : null}
        {showSellers === "status_update" ? (
          <div className="font-AeonikProMedium text-[18px] md:text-[24px] text-black">
            Обновленные товары
          </div>
        ) : null}
      </div>

      <div className="flex items-center md:hidden">
        <div className="mr-[10px] tex-[30px] text-[#B5B5B5] font-AeonikProRegular">
          01
        </div>
        <div className="border-b border-[#D5D5D5] w-full"></div>
      </div>

      <div className="w-full flex items-center justify-between my-[12px] md:my-9">
        <div className="bg-[#E5F2FA] py-[5px] px-[10px] rounded-[4px] font-AeonikProMedium text-[13px] md:text-[18px]">
          <span className="text-[#007DCA]">Обновлено: </span>
          Фото/цвет, Информация
        </div>

        <div className="hidden md:flex items-center ml-auto">
          {showSellers === "pending" ? (
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
          {showSellers === "approved" ? (
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
          {showSellers === "declined" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
          {showSellers === "status_update" ? (
            <div className="flex items-center ml-auto">
              <button
                onClick={() => approveFunc()}
                type="button"
                className="text-[#12C724] text-lg not-italic font-AeonikProMedium"
              >
                Одобрить
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap md:flex-nowrap w-full md:gap-[30px]">
        <div className="w-full md:w-[25%] md:max-w-[350px] md:h-[400px]">
          <div className="flex items-center mb-[5px]">
            <div className="font-AeonikProRegular text-[16px] mr-[5px] ml-[10px]">
              Фото
            </div>
            <StarIcon />
          </div>
          <Carousel data={data} height={"h-[377px]"} />
        </div>

        <div className="md:pr-[30px] pt-[20px] md:pt-0 md:border-r border-[#E5E5E5] flex flex-wrap md:flex-nowrap gap-[25px] w-full md:w-[50%]">
          {/* 1 */}
          <div className="font-AeonikProRegular text-[16px] w-full md:w-[50%]">
            <div className="flex flex-wrap gap-[11px] md:gap-[0]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Раздел одежды</span> <StarIcon />
                </div>
                <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {sections?.length > 1
                    ? sections?.map((item) => {
                        return item?.name_ru + ", ";
                      })
                    : sections[0]?.name_ru}
                </div>
              </div>
              <div className="w-full md:hidden">
                <div className="whitespace-nowrap overflow-x-auto h-fit md:hidden flex items-center mb-[5px]">
                  <span className={`mr-[5px]`}>Подраздел одежды</span>
                  {subSections?.length ? <StarIcon /> : null}
                </div>
                <div
                  className={`
                  } md:hidden flex items-center whitespace-nowrap overflow-x-auto h-fit text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]`}
                >
                  {subSections?.length > 1
                    ? subSections?.map((item) => {
                        return item?.name_ru + ", ";
                      })
                    : subSections[0]?.name_ru
                    ? subSections[0]?.name_ru
                    : "-"}
                </div>
              </div>
            </div>

            <div className="flex gap-[11px] md:gap-[0]">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Сезон одежды</span> <StarIcon />
                </div>
                <div className="flex items-center border h-[40px] border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
                  {seasons?.length
                    ? seasons?.map((item) => {
                        return (
                          <span key={item?.id}>{item?.name_ru + " "}</span>
                        );
                      })
                    : "-"}
                </div>
              </div>
              <div className="w-full md:hidden">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Цвет</span> <StarIcon />
                </div>
                <div className="p-[8px] w-fit h-[40px] flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px]">
                  {colors?.length ? (
                    <div className="flex items-center">
                      <div
                        style={{ backgroundColor: colors[0]?.hex }}
                        className={`last:mr-0 w-[20px] h-[20px] border rounded-[50%]`}
                      ></div>
                      <div className={colors.length > 1 ? "ml-[10px]" : null}>
                        {colors.length > 1 ? colors.length - 1 + "+" : null}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>

            <div className="flex mb-[25px] gap-[11px] md:gap-[0]">
              <div className="w-full md:w-fit md:mr-[15px]">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Пол</span> <StarIcon />
                </div>
                <div className="h-[40px] flex items-center border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3">
                  {data?.gender?.name_ru}
                </div>
              </div>
              <div className="w-full md:w-fit">
                <div className="mr-[5px] mb-[5px]">Возрастная категория</div>
                <div className="flex items-center  text-[16px] text-black">
                  <div className="flex items-center h-[40px] border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.min_age_category}
                  </div>
                  <span className="border-t border-[#E5E5E5] w-[15px] mx-[5px]"></span>
                  <div className="flex items-center h-[40px] border border-[#E5E5E5] rounded-[8px] py-3 px-5">
                    {data?.max_age_category}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Категория одежды</span> <StarIcon />
            </div>
            <div className="flex w-full mb:block gap-[11px] md:gap-[0]">
              <div className="flex w-full md:flex-wrap xxxl:flex-nowrap justify-between mb-[25px] gap-[10px]">
                <div className="h-[40px] w-full  whitespace-nowrap font-AeonikProRegular text-[16px] xxxl:w-full rounded-lg border border-[#E5E5E5]  py-[12px] px-[15px] text-black">
                  {data?.category?.name_ru}
                </div>
                <button
                  onClick={() => setColorModalOpen(true)}
                  className="whitespace-nowrap font-AeonikProMedium text-[16px] w-full xxxl:max-w-[160px] border-[1.5px] border-[#007DCA] rounded-lg text-[#007DCA] py-[12px] px-[15px] bg-white"
                >
                  Все размеры
                </button>
              </div>
            </div>

            <div className="flex items-center md:hidden mb-[12px]">
              <div className="mr-[10px] tex-[30px] text-[#B5B5B5] font-AeonikProRegular">
                02
              </div>
              <div className="border-b border-[#D5D5D5] w-full"></div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Качество на русском</span> <StarIcon />
            </div>
            <div className="h-[40px] border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
              {data?.quality_ru}
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на русском</span>
            </div>
            <div className="h-[40px] border border-[#E5E5E5] rounded-[8px] p-3 md:mb-[25px]">
              {data?.composition_ru ? (
                <span className="font-AeonikProRegular text-[16px] text-black">
                  {data?.composition_ru}
                </span>
              ) : (
                "-"
              )}
            </div>
            <div className="w-full hidden md:block">
              <div className="flex items-center mb-[5px]">
                <span className="mr-[5px]">Магазин</span> <StarIcon />
              </div>
              <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                {data?.shop?.name ? data?.shop?.name : "-"}
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="w-full md:w-[50%]">
            <div className="hidden md:flex items-center mb-[5px]">
              <span className={`mr-[5px]`}>Подраздел одежды</span>{" "}
              {subSections?.length ? <StarIcon /> : null}
            </div>
            <div
              className={`hidden md:block border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
            >
              {subSections?.length > 1
                ? subSections?.map((item) => {
                    return item?.name_ru + ", ";
                  })
                : subSections[0]?.name_ru
                ? subSections[0]?.name_ru
                : "-"}
            </div>
            <div className="hidden md:flex items-center mb-[5px]">
              <span className="mr-[5px]">Цвет</span> <StarIcon />
            </div>
            <div className="w-fit h-[42px] px-[10px] hidden md:flex items-center justify-center border border-[#E5E5E5] rounded-[8px] mb-[25px] min-w-[43px]">
              {colors?.length
                ? colors?.map((item) => {
                    return (
                      <div
                        key={item?.id}
                        style={{ backgroundColor: item?.hex }}
                        className={`mr-[8px] border last:mr-0 w-[22px] h-[22px] rounded-[50%]`}
                      ></div>
                    );
                  })
                : "-"}
            </div>
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Артикул</span>
            </div>
            <div className="h-[40px] flex items-center border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]">
              {data?.sku}
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px] whitespace-nowrap">
                    Производитель
                  </span>
                  <StarIcon />
                </div>
                <div className="h-[40px] w-full flex items-center text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {data?.producer?.name_ru}
                </div>
              </div>
            </div>
            <div>
              <div className="w-full">
                <div className="flex items-center mb-[5px]">
                  <span className="mr-[5px]">Тип</span>
                  <StarIcon />
                </div>
                <div className="h-[40px] w-full flex items-center text-[16px] text-black border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
                  {data?.type?.name_ru}
                </div>
              </div>
            </div>

            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Состав на узбекском</span>
            </div>
            <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.composition_uz ? (
                <span className="flex items-center font-AeonikProRegular text-[16px] text-black">
                  {data?.composition_uz}
                </span>
              ) : (
                "-"
              )}
            </div>
            <div className="w-full flex flex-col">
              <div className="hidden md:flex items-center mb-[5px]">
                <span className={`mr-[5px]`}>Локация</span> <StarIcon />
              </div>
              <div
                className={`hidden md:block h-fit border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
              >
                {data?.locations
                  ? data?.locations?.map((item) => {
                      return (
                        <div
                          className="border border-[#E5E5E5] p-[6px] rounded-lg mb-[2px]"
                          key={item?.id}
                        >
                          {item?.address}
                        </div>
                      );
                    })
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[25%]">
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Качество на узбекском</span> <StarIcon />
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.quality_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на русском</span> <StarIcon />
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.name_ru}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Название на узбекском</span> <StarIcon />
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] text-black rounded-[8px] p-3 mb-[25px]">
            {data?.name_uz}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на русском</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] text-black p-3 mb-[25px]">
            {data?.description_ru ? data?.description_ru : "-"}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Описание на узбекском</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] text-black p-3 mb-[25px]">
            {data?.description_uz ? data?.description_uz : "-"}
          </div>
          <div className="flex items-center mb-[5px]">
            <span className="mr-[5px]">Бренд</span>
          </div>
          <div className="h-[40px] flex items-center border border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
            {data?.brand?.name ? data?.brand?.name : "-"}
          </div>
          <div className="w-full block md:hidden">
            <div className="flex items-center mb-[5px]">
              <span className="mr-[5px]">Магазин</span> <StarIcon />
            </div>
            <div className="border whitespace-nowrap overflow-x-auto text-[16px] text-black min-h-[42px] h-fit border-[#E5E5E5] rounded-[8px] p-3 mb-[25px]">
              {data?.shop?.name ? data?.shop?.name : "-"}
            </div>
          </div>
          <div className="w-full flex md:hidden flex-col">
            <div className="flex items-center mb-[5px]">
              <span className={`mr-[5px]`}>Локация</span> <StarIcon />
            </div>
            <div
              className={`block h-fit border border-[#E5E5E5] text-[16px] text-black rounded-[8px] p-3 mb-[25px]`}
            >
              {data?.locations
                ? data?.locations?.map((item) => {
                    return (
                      <div
                        className="border border-[#E5E5E5] p-[6px] rounded-lg mb-[2px]"
                        key={item?.id}
                      >
                        {item?.address}
                      </div>
                    );
                  })
                : "-"}
            </div>
          </div>
        </div>

        <div className="flex md:hidden w-full gap-[12px] mb-[20px]">
          <button
            onClick={() => setModalOpen(true)}
            className={`${
              data?.status === "pending" || data?.status === "approved"
                ? ""
                : "hidden"
            } w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#E85151]`}
          >
            Отказать
          </button>
          <button
            onClick={() => approveFunc()}
            className={`${
              data?.status === "pending" || data?.status === "declined"
                ? ""
                : "hidden"
            } w-full text-[16px] font-AeonikProMedium text-white p-[12px] rounded-lg bg-[#1BD22D]`}
          >
            Одобрить
          </button>
        </div>
      </div>

      <CancelModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        id={data?.id}
      />
      <ColorModal
        setColorModalOpen={setColorModalOpen}
        colorModalOpen={colorModalOpen}
        category={data?.category_id}
        data={data}
      />
    </div>
  );
};
