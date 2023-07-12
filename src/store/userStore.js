import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { supabase } from "@/helpers/supabaseConfig";
export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);
  const userInfo = reactive({
    username: "",
    website: "",
    avatar_url: "",
    full_name: "",
  });
  const session = ref();
  const emailSession = ref("");
  const id_user = ref("");

  const getSession = async () => {
    try {
      await supabase.auth.getSession().then(({ data }) => {
        session.value = data.session;
        emailSession.value = data.session?.user?.email;
        id_user.value = data.session?.user?.id;
        console.log("id_user", id_user.value);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = () => {
    try {
      supabase.auth.onAuthStateChange((_, _session) => {
        console.log("checkAuth", _session);
        session.value = _session;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", id_user.value)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        userInfo.username = data.username;
        userInfo.website = data.website;
        userInfo.avatar_url = data.avatar_url;
        userInfo.full_name = data.full_name;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfile = async () => {
    try {
      //cambiar logica
      const updates = {
        id: id_user.value,
        username: userInfo.username,
        full_name: userInfo.full_name,
        website: userInfo.website,
        avatar_url: userInfo.avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (!error) alert("Actualizado Con Exito");
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      getProfile();
    }
  };

  const socialLogin = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    console.log({ data });
    console.log({ error });

  };

  const loginUser = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log({ data });
    console.log({ error });
  };

  const registerUser = async (email, password) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log({ data });
    console.log({ error });
  };

  const userCheck = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log({ user });
  };
  /*
  **El codigo de abajo es exclusivo para api laravel con paso de parametros, no quedó completada
  **Esta incompleto pero funciona
  const router = useRouter()
  const route = useRoute()
  const BASE_URL = 'https://bc85-201-138-154-72.ngrok-free.app/authenticationAPI/public/'


const getParameterByName = (name) => {
  // obtenemos el nombre del parametro limpio
  name = name.replace(/[\[\]]/g, '\\$&');
  //verificamos por regex que exita el valor
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    //si no existe retornamos null
    if (!results) return null;
    if (!results[2]) return '';
    // existe? lo retornamos el parametro
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const socialLogin = async (provider) => {
  try {
    const response = await axios.post(`${BASE_URL}api/auth`, {provider})
    console.log({response})
    window.location.href = response.data.redirectUrl;
  } catch (error) {
    console.log({error})
  }
  };


  */
  return {
    socialLogin,
    userCheck,
    loginUser,
    registerUser,
    user,
    userInfo,
    session,
    getSession,
    checkAuth,
  };
});
