/*
	Placeholders user defined callbacks
 */
export default class ImposiumEvents {
	public static experienceCreated:(data:any)=>any = null;
	public static uploadProgress:(data:any)=>any = null;
	public static gotExperience:(data:any)=>any = null;
	public static gotScene:(data:any)=>any = null;
	public static gotMessage:(data:any)=>any = null;
	public static onError:(error:Error)=>any = null;
}