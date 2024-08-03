import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LogoAnimation } from '@/components';
import { useNavigate, useRouteError } from 'react-router-dom';
import { getTeam } from '@/services';
import { useTeamStore } from '@/store';
import { useAppContext } from '@/contexts';

type FormData = {
  code: string;
};

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const navigate = useNavigate();
  const {setCode} = useAppContext();
  const routeErrors = useRouteError() as any;
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await getTeam(data.code);
      setCode(data.code);
      const setTeams = useTeamStore.getState().setTeams;
      setTeams(response.data)
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <div className="text-center mb-4 login">
        <LogoAnimation />
        <h1 className="h2">ورود به بازی</h1>
        <p className="lead"></p>
      </div>

      <div className="card shadow-xl !rounded-xl">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">کود مسابقه</label>
                <input
                  type="password"
                  {...register("code", { required: "کود مسابقه ضروری است" })}
                  className={`form-control form-control-lg ${errors.code ? "is-invalid" : ""}`}
                />
                {errors.code && <div className="invalid-feedback">{errors.code.message}</div>}
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
                  <p className="mb-0">اشتباه می باشد</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
 
