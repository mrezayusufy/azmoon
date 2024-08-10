type Props = {
  onSubmit: any;
  register: any;
  errors: any;
  label: string;
  buttonText: string;
} 
export const FormComponent : React.FC<Props> = ({
  onSubmit,
  register,
  errors,
  label,
  buttonText,
}) => (
  <div className="col-md-3 mt-4 mt-md-0 ">
    <div className="bg-white shadow-lg mb-4 rounded-xl">
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
              className={`form-control ${errors ? "is-invalid" : ""}`}
              type="text" 
              {...register}
            />
            {errors && (
              <div className="invalid-feedback">این فیلد مورد نیاز است</div>
            )}
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);