import dayjs from 'dayjs';

export function formatTimeRemaning(endTime){
    const now = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(now);
    if(diff <=0) return "Auction ended";

    const duration = dayjs.duration(diff);
    return `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
    
}