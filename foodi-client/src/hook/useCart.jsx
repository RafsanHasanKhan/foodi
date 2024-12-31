import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token')

  const { data: cart = [], refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`, {
        headers: {
          authorization: `Bearar ${token}`
        }
      });
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
