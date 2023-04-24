<template>
  <div class="avatar-uploader">[avatar-uploader]</div>
</template>

<script>
export default {
  name: 'AvatarUploader'
}
</script>

<style lang="stylus" scoped>
.avatar-uploader {
  border: 1px solid var(--scp-border-colour);
  border-radius: var(--scp-base-unit--half);
  color: var(--scp-text-colour--subtler);
  display: flex;
  justify-content: center;
  padding: var(--scp-base-unit--2);
}
</style>