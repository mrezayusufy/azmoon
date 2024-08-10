import { useAppContext } from "@/contexts";
import { ITeam } from "@/interfaces";
import { postScore } from "@/services";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
type FormInput = {
  teamId: string;
  score: string;
}
export const ScoreForm = () => {
  const {state, setTeam, setScore} = useAppContext();
  const {formState: {errors}, handleSubmit, register}= useForm<FormInput>({
    defaultValues: {
      score: "0",
      teamId: "1"
    }
  })
  const onSubmit = async(data: FormInput) => {
    const {teamId, score} = data;
    try {
      setScore(+score);
      const teams = state.teams as ITeam[];
      const index = teams?.findIndex(i => i.teamId === parseInt(teamId));
      teams[index].score = parseInt(score);
      setTeam(teams);
      await postScore(state.code, teamId, score);
      toast.success("امتیاز با موفقیت ثبت شد");
    } catch (error) {
      toast.error("امتیاز ثبت نشد")
    }
  }
  return <form className="bg-white shadow-lg mb-4 px-4 py-4 rounded-xl col-md-5 mt-4 mt-md-0" onSubmit={handleSubmit(onSubmit)}>
  <h1 className="font-bold text-gray-700">ثبت امتیاز</h1>
  <ul className="card-body flex flex-col gap-y-2">
    {state.teams?.map(item => <li key={item.teamId}>
      <label className="flex gap-x-2" >
        <input type="radio" value={item.teamId} {...register("teamId")} />
        <span>{item.name}</span>
      </label>
    </li>)}
    {errors.teamId && (
      <i className="invalid-feedback">این فیلد مورد نیاز است</i>
    )}
    <li>
      <label>
        <span>امتیاز</span>
        <input className={`form-control ${errors.score ? "is-invalid" : ""}`} type="number" {...register("score")} />
        {errors.score && (
          <i className="invalid-feedback">این فیلد مورد نیاز است</i>
        )}
      </label>
    </li>
    <li className="text-center mt-3">
      <button type="submit" className="btn btn-primary">
        ثبت کنید
      </button>
    </li>
  </ul>
</form>
}