<!-- 漫游页面 -->
<template>
    <div class="RoamingPage">
        <div class="RoamingPageContainer">
            <div class="placeholder-section">
                <p class="placeholder-text">该模块为扩展预留</p>
                <p class="placeholder-sub">This section is reserved for future features.</p>
            </div>
            <BottomNav/>
        </div>
    </div>
</template>

<script setup>
import BottomNav from '@/components/HomePage/elements/BottomNav.vue'
</script>

<style lang="less" scoped>
.RoamingPageContainer {
    padding: 2rem;
    min-height: 100vh;
    box-sizing: border-box;
}
.placeholder-section {
    padding: 4rem 2rem;
    text-align: center;
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
    border-radius: 0.8rem;
    margin-top: 1rem;
    .placeholder-text {
        font-size: 1.5rem;
        color: #666;
        margin: 0 0 0.6rem 0;
    }
    .placeholder-sub {
        font-size: 1.2rem;
        color: #999;
        margin: 0;
    }
}
</style>