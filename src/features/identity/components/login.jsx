import { useForm } from "react-hook-form";
import {
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "@core/http-service";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();


  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const routeErrors = useRouteError();

  const onSubmit = (data) => {
    submitForm(data, { method: "post" });
  };

  return (
    <>
      <div className="text-center mt-4">
        <img src='/' style={{ height: "100px" }} alt="logo"/>
        <h1 className="h2"> ورود به بازی</h1>
        <p className="lead"> آزمون </p>
        <p className="lead">
         
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
           
              <div className="mb-3">
                <label className="form-label">کود مسابقه</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.code && "is-invalid"
                  }`}
                  type="password"
                  {...register("code", { required: true })}
                />
               
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? 'منتظر بمانید' : 'ورود'}
                </button>
              </div>
              {routeErrors && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response?.data.map((error, id) => (
                    <p className="mb-0 " key={id}>
                      {'اشتباه می باشد'}
                    </p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {

    const response = await httpService.get(`/Game/teams?code=${data.code}`);
    if (response.status === 200) {
      localStorage.setItem("code", data.code);
      return redirect("/");
    }
  } catch (error) {
    // Handle error and return response error to the component
    return error;
  }
}

export default Login;
