/* eslint-disable react/prop-types */

import { CheckIcon, StarRatengIcon} from "../../../../assets/icon";
import { deliveryIcon, manGenderIcon, womanGenderIcon } from "../../../../assets/shopIcons/icon";
export default function ShopsItem({
  data,
  index,
  onCheck,
}) {

  console.log(data, 'dataaaaaaaaaaaaaaaa');

  return (
    <div className="w-full flex flex-row">
      <div className="w-fullh-full flex items-center justify-center">
        <div
          onClick={() => {
            onCheck(data?.id);
          }}
          className={`cursor-pointer w-[24px] h-[24px] border border-checkboxBorder ${
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

      </div>

      <div
        key={data?.id}
        className="w-full h-fit md:h-[100px] border border-borderColor md:pr-10 p-[10px] md:p-0 rounded-lg flex md:flex-row flex-col justify-between items-center"
      >
        
        <div className="w-full md:w-fit flex flex-col md:flex-row items-center md:justify-start  md:border-0 border-b border-borderColor">
          <div className="w-full md:w-fit flex items-center justify-between  md:pr-7 md:pl-5 text-xl font-AeonikProRegular ">
            <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
            <span className="text-checkboxBorder md:text-black flex items-center">
              <span className="md:hidden flex">0</span>
              {index + 1} 
            </span>
            <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
          </div>
          <div className="w-full md:w-fit flex items-center my-[15px] md:my-0 ">
            <figure className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
              <img
                src={data?.url_logo_photo}
                alt=""
                className="w-full h-full object-contain"
              />
            </figure>
            <div className="w-fit flex flex-col ml-5 md:ml-8">
              <p className="w-fit text-[13px] md:w-[350px] ls:text-[14px] xs:text-xl xs:font-AeonikProMedium font-AeonikProRegular  mb-3">
                {data?.name || null}
              </p>
              <div className="w-full flex items-center">
                <div className="w-fit flex items-center ">
                  <div className="w-fit flex items-center mr-[6px]">
                    <StarRatengIcon/>
                  </div>
                  <div className="not-italic font-AeonikProRegular  text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                    <p className="font-AeonikProRegular text-[12px] md:text-[14px] ls:font-AeonikProMedium text-black mr-1">
                      {data?.overall_rating || 0}
                    </p>
                    <p className="text-setTexOpacity font-AeonikProRegular text-[10px] ls:text-[12px] md:text-[14px] ">
                      ({data?.rated_users_count || 0}){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-fit flex items-center justify-between sm:gap-x-[130px] mt-3 md:mt-0">
          <div className="flex items-center gap-x-1 ">
            {(Number(data?.gender?.id) === 3 || Number(data?.gender?.id) == 1) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={manGenderIcon} alt="" />
            </div>}
            {(Number(data?.gender?.id) === 3 || Number(data?.gender?.id) == 2) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={womanGenderIcon} alt="" />
            </div>}
          </div>
          <div className="h-[36px] ll:h-12 px-1 ls:px-[10px] md:w-[260px] ll:px-5 active:opacity-70 border border-borderColor rounded-lg flex items-center justify-center gap-x-1 ll:gap-x-3 ">
            <img src={deliveryIcon} alt="" />
            <span className="font-AeonikProMedium">{data?.delivery?.name_ru}</span>
          </div>
        </div>
        <div className="w-full md:w-fit flex items-center justify-between gap-x-4 sm:gap-x-[50px] mt-4 ll:mt-6 md:mt-0">
          <button
            // onClick={() => navigate(`/store/locations/shop/:${data?.id}`)}
            className="md:text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
          >
            Локации
          </button>
          <p
            // onClick={() => goDetail(data?.id)}
            className="text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0  px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-Editbg"
          >
            Подробнее
          </p>
        </div>
      </div>

    </div>
  );
}
