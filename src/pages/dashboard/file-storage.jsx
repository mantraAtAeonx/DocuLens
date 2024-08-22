import React, { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { EyeIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { CircularPagination } from "@/components/core/pagination";
import UploadFilesModal from "@/components/core/upload-file";
import { apiConnector } from "@/services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slices/authSlice";
import Spinner from "../../components/loader/spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function FileStorage() {
  const dispatch = useDispatch();
  const [startValue, setStartValue] = useState(0);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const { loading } = useSelector((state) => state.auth);

  const request = async () => {
    dispatch(setLoading(true));
    await apiConnector("GET", `/invoices?start=${startValue}&limit=12`)
      .then((res) => {
        setData(res.data);
        setTotal(res.count);
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
    dispatch(setLoading(false));
  };

  useEffect(() => {
    request();
  }, [startValue]);
  return (
    <div className="mx-auto my-20 flex flex-col gap-8">
      <Card>
        <UploadFilesModal refreshList={request} />
      </Card>
      {data && !loading ? (
        <>
          <Card>
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="m-0 p-4"
            >
              <h2 className="text-lg font-semibold mb-4"> Files</h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-4 p-4">
              <div className="grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4">
                {data?.map((file, index) => (
                  <Link
                    to={file.file_path}
                    target="_blank"
                    key={index}
                    className=" hover:bg-blue-gray-50 p-2 rounded-lg duration-200 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <DocumentIcon className=" w-10 h-10" />
                      <div>
                        <h6 className="text-gray-800 mt-1 text-sm font-semibold">
                          {file.name}
                        </h6>
                        {/* <p className="text-sm">120kbs</p> */}
                        <div className="text-sm leading-5 text-white bg-amber-300 text-center rounded-full py-[0.15rem]">
                          {file?.classification_result}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
          {total > 12 && (
            <div className="w-full flex items-center justify-center">
              <CircularPagination
                lastIndex={Math.ceil(total / 12)}
                setStartValue={setStartValue}
              />
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full my-24 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
