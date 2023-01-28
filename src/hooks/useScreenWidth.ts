import { computed, onMounted, onUnmounted, ref } from 'vue';

export const useScreenWidth = () => {

  const windowWidth = ref<number>(window.innerWidth);

  const onWidthChange = () => windowWidth.value = window.innerWidth;

  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));
  
  const device = computed(() => {

    if (windowWidth.value < 850) return DeviceEnum.Mobile;
    if (windowWidth.value >= 850 && windowWidth.value < 1200) return DeviceEnum.Tablet;
    if (windowWidth.value >= 1200) return DeviceEnum.Desktop;
    return null;

  })

  const width = computed(() => windowWidth.value)

  return { width, device };
}

export enum DeviceEnum{
    Desktop = 'Desktop',
    Tablet = 'Tablet',
    Mobile = 'Mobile'
}

export default useScreenWidth;